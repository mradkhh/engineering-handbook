// Protocol to'plami: soxta kartalar papkasi kiradi, xatolar yoki Markdown chiqadi.
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { cardFlow, loadProtocol, toMarkdown } from "../src/protocol.js";

const chapters = [{ n: "5" }, { n: "8" }];

const royxat = [
   { kod: "UM", nom: "Umumiy qoidalar", guruh: "umumiy" },
   { kod: "PR", nom: "PR ochish", guruh: "ish-oqimi" },
   { kod: "XAVF", nom: "Xavfli o'zgarish", guruh: "chiqarish" },
];

const umumiy = () => ({
   kod: "UM",
   bandlar: [{ id: "UM-01", daraja: "majburiy", tekshiruvchi: "reviewer", matn: "Chetlanish yoziladi." }],
});

const pr = () => ({
   kod: "PR",
   belgilar: ["Tiket kodi push qilingan", "PR ochish kerak"],
   ijrochi: "Muallif",
   shart: ["PUSH tugagan"],
   bandlar: [
      { id: "PR-01", daraja: "majburiy", tekshiruvchi: "hook", matn: "Sarlavha commit shaklida.", manba: ["08#1"] },
      { id: "PR-02", daraja: "tavsiya", tekshiruvchi: "reviewer", matn: "PR 400 qatordan oshmaydi." },
      { id: "PR-T1", daraja: "taqiq", tekshiruvchi: "reviewer", matn: "`Closes` yozilmaydi." },
   ],
   qarorlar: [{ keyin: "PR-01", savol: "Xavfli o'zgarish bormi?", ha: "XAVF", yoq: null }],
   tugash: ["PR ochiq"],
   murojaat: "Release owner",
   handbook: ["8"],
});

const inventory = [
   { kalit: "08#1", daraja: "MUST", matn: "PR sarlavhasi." },
   { kalit: "08#2", daraja: "MUST", matn: "Closes." },
];

function fixture({ cards = [umumiy(), pr()], list = royxat, olib = {}, toliq = false, inv = inventory } = {}) {
   const dir = mkdtempSync(join(tmpdir(), "protocol-"));
   writeFileSync(
      join(dir, "royxat.js"),
      `export const protokollar = ${JSON.stringify(list)};\nexport const olibTashlandi = ${JSON.stringify(olib)};\nexport const kochishToliq = ${toliq};\n`,
   );
   writeFileSync(join(dir, "v1-qoidalar.json"), JSON.stringify(inv));
   for (const c of cards) writeFileSync(join(dir, `${c.kod.toLowerCase()}.js`), `export default ${JSON.stringify(c)};\n`);
   return dir;
}

// Ko'chish to'liq bo'lganda ro'yxatdagi har protocol yozilgan bo'lishi shart.
const xavf = () => ({ ...pr(), kod: "XAVF", qarorlar: [], bandlar: [{ id: "XAVF-01", daraja: "majburiy", tekshiruvchi: "reviewer", matn: "Risk label." }] });
const toliqCards = () => [umumiy(), pr(), xavf()];

const load = (opts) => loadProtocol(fixture(opts), { chapters });
const hasError = (errors, ...parts) =>
   assert.ok(
      errors.some((e) => parts.every((p) => e.includes(p))),
      `kutilgan xato yo'q: ${parts.join(" … ")}\nbor xatolar:\n${errors.join("\n")}`,
   );

test("to'g'ri to'plam xatosiz o'tadi va saralash jadvali belgilardan yig'iladi", async () => {
   const { errors, protocol } = await load();
   assert.deepEqual(errors, []);
   assert.deepEqual(
      protocol.saralash.map((r) => [r.belgi, r.kod]),
      [
         ["Tiket kodi push qilingan", "PR"],
         ["PR ochish kerak", "PR"],
      ],
   );
});

test("takror band raqami xato beradi", async () => {
   const c = pr();
   c.bandlar.push({ ...c.bandlar[0] });
   hasError((await load({ cards: [umumiy(), c] })).errors, "PR", "PR-01", "takror");
});

test("o'chirilgan raqamni qayta ishlatish xato beradi", async () => {
   const c = pr();
   c.ochirilgan = ["PR-02"];
   hasError((await load({ cards: [umumiy(), c] })).errors, "PR-02", "o'chirilgan");
});

test("darajasiz, tekshiruvchisiz yoki noma'lum tekshiruvchili band xato beradi", async () => {
   const c = pr();
   delete c.bandlar[0].daraja;
   delete c.bandlar[1].tekshiruvchi;
   c.bandlar[2].tekshiruvchi = "kimdir";
   const { errors } = await load({ cards: [umumiy(), c] });
   hasError(errors, "PR-01", "daraja");
   hasError(errors, "PR-02", "tekshiruvchi");
   hasError(errors, "PR-T1", "kimdir");
});

test("noto'g'ri turdagi qism, meros kalit, 00 raqam va bo'sh band xato beradi (yiqilmaydi)", async () => {
   const c = pr();
   c.belgilar = "bitta qator";
   c.ijrochi = ["Muallif"];
   c.handbook = "8";
   c.bandlar[0].daraja = "constructor";
   c.bandlar[1].id = "PR-00";
   c.bandlar.push(null);
   const { errors } = await load({ cards: [umumiy(), c] });
   hasError(errors, "PR", "saralash");
   hasError(errors, "PR", "ijrochi");
   hasError(errors, "PR", "handbook");
   hasError(errors, "PR-01", "constructor");
   hasError(errors, "PR-00", "PR-NN");
   hasError(errors, "4-band", "obyekt");
});

test("ko'chish to'liq bo'lganda kartasi yozilmagan protocol xato beradi", async () => {
   hasError((await load({ toliq: true, olib: { "08#2": "Takror" } , list: [...royxat, { kod: "BETA", nom: "Beta qizil", guruh: "favqulodda" }] })).errors, "BETA", "yozilmagan");
});

test("taqiq raqami va darajasi bir-biriga mos bo'lishi shart", async () => {
   const c = pr();
   c.bandlar[0].daraja = "taqiq";
   c.bandlar[2].daraja = "majburiy";
   const { errors } = await load({ cards: [umumiy(), c] });
   hasError(errors, "PR-01", "taqiq");
   hasError(errors, "PR-T1", "taqiq");
});

test("band raqami protocol kodi bilan boshlanadi", async () => {
   const c = pr();
   c.bandlar[1].id = "XAVF-02";
   hasError((await load({ cards: [umumiy(), c] })).errors, "XAVF-02", "PR-NN");
});

test("qaror nuqtasi ro'yxatda yo'q protocol'ga olib borsa xato, rejalashtirilganiga borsa xato emas", async () => {
   assert.deepEqual((await load()).errors, []);
   const c = pr();
   c.qarorlar[0].ha = "YOQ";
   c.qarorlar.push({ keyin: "PR-09", savol: "?", ha: "UM", yoq: null });
   const { errors } = await load({ cards: [umumiy(), c] });
   hasError(errors, "YOQ", "ro'yxatda yo'q");
   hasError(errors, "PR-09", "keyin");
});

test("belgisi yo'q protocol saralash jadvaliga tushmaydi — xato", async () => {
   const c = pr();
   c.belgilar = [];
   hasError((await load({ cards: [umumiy(), c] })).errors, "PR", "saralash");
});

test("ro'yxatda yo'q kodli karta va majburiy qismi yo'q karta xato beradi", async () => {
   const c = pr();
   delete c.tugash;
   const extra = { ...pr(), kod: "BOSHQA", bandlar: [] };
   const { errors } = await load({ cards: [umumiy(), c, extra] });
   hasError(errors, "BOSHQA", "ro'yxatda yo'q");
   hasError(errors, "PR", "tugash");
});

test("handbook bobi mavjud bo'lishi shart", async () => {
   const c = pr();
   c.handbook = ["8", "99"];
   hasError((await load({ cards: [umumiy(), c] })).errors, "PR", "99");
});

test("ko'chish xaritasi: noma'lum v1 kaliti va to'liq bo'lmagan xarita xato beradi", async () => {
   const c = pr();
   c.bandlar[1].manba = ["09#4"];
   hasError((await load({ cards: [umumiy(), c] })).errors, "PR-02", "09#4");

   hasError((await load({ toliq: true, cards: toliqCards() })).errors, "08#2", "ko'chmagan");
   assert.deepEqual((await load({ toliq: true, cards: toliqCards(), olib: { "08#2": "Takror" } })).errors, []);
   hasError((await load({ olib: { "08#1": "sabab" } })).errors, "08#1", "ham");
});

test("Markdown: har band, daraja, tekshiruvchi va qaror nuqtasi chiqadi; README'da saralash jadvali", async () => {
   const { protocol, errors } = await load();
   assert.deepEqual(errors, []);
   const files = toMarkdown(protocol, { version: "v9.9.9" });
   assert.deepEqual([...files.keys()].sort(), ["PR.md", "README.md", "UM.md"]);
   const md = files.get("PR.md");
   for (const s of ["PR-01", "PR-02", "PR-T1", "majburiy", "tavsiya", "taqiq", "hook (avtomat)", "reviewer (odam)"])
      assert.ok(md.includes(s), `PR.md'da yo'q: ${s}`);
   assert.ok(md.includes("Xavfli o'zgarish bormi?") && md.includes("XAVF"), "qaror nuqtasi chiqmagan");
   assert.ok(md.includes("PR-T1") && /## Taqiqlar[\s\S]*PR-T1/.test(md), "taqiq alohida bo'limda emas");
   assert.ok(!/## Qadamlar[\s\S]*PR-T1[\s\S]*## Qaror/.test(md), "taqiq qadamlar ichida");
   const readme = files.get("README.md");
   assert.ok(readme.includes("v9.9.9"));
   assert.ok(readme.includes("| Tiket kodi push qilingan | [PR — PR ochish](PR.md) |"), readme);
   assert.ok(readme.includes("XAVF") && readme.includes("yoziladi"), "rejalashtirilgan protocol ko'rinmaydi");
});

test("sxema tavsifi: boshlash → bandlar tartibida → qaror nuqtasi o'z bandidan keyin → tugash; taqiq sxemada yo'q", async () => {
   const { protocol } = await load();
   const card = protocol.cards.find((c) => c.kod === "PR");
   const flow = cardFlow(protocol, card);
   assert.deepEqual(
      flow.map((s) => (s.tur === "band" ? s.id : s.tur)),
      ["boshlash", "PR-01", "qaror", "PR-02", "tugash"],
   );
   assert.deepEqual(flow[0].matnlar, card.shart);
   assert.deepEqual(flow.at(-1).matnlar, card.tugash);
   const q = flow[2];
   assert.equal(q.savol, "Xavfli o'zgarish bormi?");
   assert.deepEqual(q.ha, { kod: "XAVF", nom: "Xavfli o'zgarish", yozilgan: false });
   assert.equal(q.yoq, null);
   assert.equal(flow[1].daraja, "majburiy");
});

test("sxema kartadan yasaladi: band yoki qaror nuqtasi qo'shilsa, sxema o'zi o'zgaradi", async () => {
   const c = pr();
   c.bandlar.splice(1, 0, { id: "PR-03", daraja: "majburiy", tekshiruvchi: "muallif", matn: "Yangi qadam." });
   c.qarorlar.push({ keyin: "PR-03", savol: "Umumiyga?", ha: null, yoq: "PR" });
   const { protocol, errors } = await load({ cards: [umumiy(), c] });
   assert.deepEqual(errors, []);
   const flow = cardFlow(protocol, protocol.cards.find((x) => x.kod === "PR"));
   assert.deepEqual(
      flow.map((s) => (s.tur === "band" ? s.id : s.tur)),
      ["boshlash", "PR-01", "qaror", "PR-03", "qaror", "PR-02", "tugash"],
   );
   assert.deepEqual(flow[4].yoq, { kod: "PR", nom: "PR ochish", yozilgan: true });
});

test("qaror nuqtasi taqiq bandidan keyin yoki ikkala javobi boshqa protocol'ga olib borsa xato", async () => {
   const c = pr();
   c.qarorlar.push({ keyin: "PR-T1", savol: "?", ha: "XAVF", yoq: null });
   c.qarorlar.push({ keyin: "PR-02", savol: "??", ha: "XAVF", yoq: "UM" });
   const { errors } = await load({ cards: [umumiy(), c] });
   hasError(errors, "PR-T1", "taqiq");
   hasError(errors, "PR-02", "ikkala");
});

test("haqiqiy «PR ochish» sxemasida kartaning har bandi (taqiqsiz) va har qaror nuqtasi bor", async () => {
   const { protocol } = await loadProtocol(new URL("../protocol/", import.meta.url).pathname);
   const card = protocol.cards.find((c) => c.kod === "PR");
   const flow = cardFlow(protocol, card);
   assert.deepEqual(
      flow.filter((s) => s.tur === "band").map((s) => s.id),
      card.bandlar.filter((b) => b.daraja !== "taqiq").map((b) => b.id),
   );
   assert.deepEqual(
      flow.filter((s) => s.tur === "qaror").map((s) => s.savol),
      card.qarorlar.map((q) => q.savol),
   );
   assert.equal(flow[0].tur, "boshlash");
   assert.equal(flow.at(-1).tur, "tugash");
});

test("haqiqiy protocol tekshiruvdan o'tadi", async () => {
   const { errors } = await loadProtocol(new URL("../protocol/", import.meta.url).pathname);
   assert.deepEqual(errors, []);
});

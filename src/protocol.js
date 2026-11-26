// Protocol to'plami — protocol fayllarini o'qiydigan yagona joy.
// `loadProtocol` kartalarni o'qib tekshiradi; kitob, sxema va Markdown nusxa faqat uning natijasidan yasaladi.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { chapters as bookChapters } from "./book.config.js";

export const GURUHLAR = [
   { id: "umumiy", nom: "Umumiy" },
   { id: "ish-oqimi", nom: "Ish oqimi" },
   { id: "chiqarish", nom: "Chiqarish" },
   { id: "favqulodda", nom: "Favqulodda" },
   { id: "boshqaruv", nom: "Boshqaruv" },
];

export const DARAJALAR = {
   taqiq: "hech kim, hech qachon buzmaydi; faqat protocol'ni o'zgartiradigan PR olib tashlaydi",
   majburiy: "bajariladi; chetga chiqish faqat oldindan yozilgan chetlanish va release owner roziligi bilan",
   tavsiya: "odatda bajariladi; sababsiz o'tkazib yuborish mumkin",
};

// Kim yoki nima tekshiradi. Aniq hook, CI job yoki skript nomi repo profilida.
export const TEKSHIRUVCHILAR = {
   hook: "avtomat",
   ci: "avtomat",
   skript: "avtomat",
   muallif: "odam",
   "reviewer": "odam",
   "release owner": "odam",
};

const KOD_RE = /^[A-Z]{2,8}$/;
// Matndagi band havolasi (`XAVF-08`, `PR-T1`); oldida harf yoki `-` bo'lsa — lokal band (`CRM-PR-01`), o'tkaziladi.
const BAND_REF = /(?<![A-Za-z0-9-])([A-Z]{2,8})-(T?\d+)\b/g;
// Qavsdagi protocol kodi: `(BETA)`.
const CARD_REF = /\(([A-Z]{2,8})\)/g;
// Karta qismlari va ularning turi. Umumiy kartada faqat bandlar.
const KARTA_QISMLARI = {
   belgilar: "list",
   ijrochi: "text",
   shart: "list",
   bandlar: "bands",
   tugash: "list",
   murojaat: "text",
   handbook: "list",
};

const isUmumiy = (c) => c.guruh === "umumiy";
const has = (obj, key) => typeof key === "string" && Object.hasOwn(obj, key);
const nonEmptyList = (v) => Array.isArray(v) && v.length > 0 && v.every((x) => typeof x === "string" && x.trim());
const nonEmptyText = (v) => typeof v === "string" && v.trim().length > 0;

const importFile = (file) => import(pathToFileURL(file).href);

/**
 * Protocol papkasini o'qiydi va tekshiradi.
 * @returns {Promise<{ protocol: object, errors: string[] }>} xato bo'lsa ham to'plam qaytadi (qisman).
 */
export async function loadProtocol(dir, { chapters = bookChapters } = {}) {
   const errors = [];
   const royxat = await importFile(join(dir, "royxat.js"));
   const inventory = JSON.parse(readFileSync(join(dir, "v1-qoidalar.json"), "utf8"));
   const invKeys = new Set(inventory.map((r) => r.kalit));
   const chapterNs = new Set(chapters.map((c) => c.n));
   const guruhIds = new Set(GURUHLAR.map((g) => g.id));

   const registry = new Map();
   for (const p of royxat.protokollar) {
      if (!KOD_RE.test(p.kod)) errors.push(`ro'yxat: «${p.kod}» kodi 2–8 ta katta lotin harfidan iborat bo'lishi shart`);
      if (registry.has(p.kod)) errors.push(`ro'yxat: ${p.kod} kodi takror`);
      if (!guruhIds.has(p.guruh)) errors.push(`ro'yxat: ${p.kod} — noma'lum guruh «${p.guruh}»`);
      registry.set(p.kod, p);
   }

   const cards = [];
   const files = readdirSync(dir).filter((f) => f.endsWith(".js") && f !== "royxat.js").sort();
   for (const f of files) {
      const card = (await importFile(join(dir, f))).default;
      const kod = card?.kod;
      const reg = registry.get(kod);
      if (!reg) {
         errors.push(`${f}: ${kod ?? "?"} kodi protocol ro'yxatda yo'q`);
         continue;
      }
      if (f !== `${kod.toLowerCase()}.js`) errors.push(`${f}: ${kod} kartasi ${kod.toLowerCase()}.js faylida bo'lishi shart`);
      cards.push({ ...card, nom: reg.nom, guruh: reg.guruh, fayl: f });
   }

   const allIds = new Map();
   for (const c of cards) {
      const at = c.kod;
      const required = isUmumiy(c) ? ["bandlar"] : Object.keys(KARTA_QISMLARI);
      for (const k of required) {
         const v = c[k];
         const kind = KARTA_QISMLARI[k];
         const ok =
            kind === "bands" ? Array.isArray(v) && v.length > 0 : kind === "text" ? nonEmptyText(v) : nonEmptyList(v);
         if (!ok) {
            errors.push(
               k === "belgilar"
                  ? `${at}: belgilar yo'q — protocol saralash jadvaliga tushmaydi`
                  : `${at}: «${k}» qismi bo'sh yoki yo'q`,
            );
         }
      }
      for (const ch of Array.isArray(c.handbook) ? c.handbook : []) {
         if (!chapterNs.has(String(ch))) errors.push(`${at}: handbook'da ${ch}-bob yo'q`);
      }

      const retired = new Set(c.ochirilgan ?? []);
      const idRe = new RegExp(`^${c.kod}-(?:(T)[1-9]\\d*|0[1-9]|[1-9]\\d)$`);
      for (const [i, b] of (Array.isArray(c.bandlar) ? c.bandlar : []).entries()) {
         if (!b || typeof b !== "object") {
            errors.push(`${at}: ${i + 1}-band — band obyekt emas`);
            continue;
         }
         const id = typeof b.id === "string" ? b.id : `${i + 1}-band`;
         const where = `${at}: ${id}`;
         const m = idRe.exec(id);
         if (!m) errors.push(`${where} — band raqami ${c.kod}-NN yoki ${c.kod}-TN shaklida bo'lishi shart`);
         else if (allIds.has(id)) errors.push(`${where} — band raqami takror`);
         else allIds.set(id, c.kod);
         if (retired.has(id)) errors.push(`${where} — o'chirilgan raqam qayta ishlatilgan`);
         if (!b.daraja) errors.push(`${where} — daraja yo'q`);
         else if (!has(DARAJALAR, b.daraja)) errors.push(`${where} — noma'lum daraja «${b.daraja}»`);
         else if (m && (m[1] === "T") !== (b.daraja === "taqiq")) {
            errors.push(`${where} — taqiq bandi ${c.kod}-TN raqamini oladi, boshqa band ${c.kod}-NN`);
         }
         if (!b.tekshiruvchi) errors.push(`${where} — tekshiruvchi yo'q`);
         else if (!has(TEKSHIRUVCHILAR, b.tekshiruvchi)) errors.push(`${where} — noma'lum tekshiruvchi «${b.tekshiruvchi}»`);
         if (!nonEmptyText(b.matn)) errors.push(`${where} — matn yo'q`);
         for (const k of Array.isArray(b.manba) ? b.manba : []) {
            if (!invKeys.has(k)) errors.push(`${where} — manba ${k} v1.0.0 qoidalari ro'yxatida yo'q`);
         }
      }

      const bandOf = new Map((Array.isArray(c.bandlar) ? c.bandlar : []).map((b) => [b?.id, b]));
      for (const [i, q] of (Array.isArray(c.qarorlar) ? c.qarorlar : []).entries()) {
         const where = `${at}: ${i + 1}-qaror nuqtasi (${q.keyin ?? "?"} dan keyin)`;
         if (!nonEmptyText(q.savol)) errors.push(`${where} — savol yo'q`);
         const after = bandOf.get(q.keyin);
         if (!after) errors.push(`${where} — «keyin» ${q.keyin ?? "?"} bu protocol'ning bandi emas`);
         else if (after.daraja === "taqiq") errors.push(`${where} — taqiq bandi qadam emas, qaror nuqtasi undan keyin turmaydi`);
         for (const side of ["ha", "yoq"]) {
            const t = q[side];
            if (t != null && !registry.has(t)) errors.push(`${where} — ${t} protocol ro'yxatda yo'q`);
         }
         if (q.ha == null && q.yoq == null) errors.push(`${where} — hech qaysi javob boshqa protocol'ga olib bormaydi`);
         if (q.ha != null && q.yoq != null) {
            errors.push(`${where} — ikkala javob ham boshqa protocol'ga olib boradi: keyingi bandlarga yetib bo'lmaydi`);
         }
      }
   }

   // Matndagi havolalar: band (`XAVF-08`) kartasi yozilgan bo'lsa mavjud bo'lishi shart; qavsdagi kod (`(BETA)`) ro'yxatda bo'lishi shart.
   const written = new Set(cards.map((c) => c.kod));
   const texts = (c) => [
      ...(Array.isArray(c.bandlar) ? c.bandlar.map((b) => [b?.id ?? "?", b?.matn]) : []),
      ...["belgilar", "shart", "tugash"].flatMap((k) => (Array.isArray(c[k]) ? c[k].map((t) => [k, t]) : [])),
      ...["ijrochi", "murojaat"].map((k) => [k, c[k]]),
      ...(Array.isArray(c.qarorlar) ? c.qarorlar.map((q) => [`qaror (${q?.keyin ?? "?"})`, q?.savol]) : []),
   ];
   for (const c of cards) {
      for (const [where, text] of texts(c)) {
         if (typeof text !== "string") continue;
         for (const [ref, kod] of text.matchAll(BAND_REF)) {
            if (written.has(kod) && !allIds.has(ref)) errors.push(`${c.kod}: ${where} — havola ${ref}: ${kod} kartasida bunday band yo'q`);
         }
         for (const [, kod] of text.matchAll(CARD_REF)) {
            if (!registry.has(kod)) errors.push(`${c.kod}: ${where} — havola (${kod}): bunday protocol ro'yxatda yo'q`);
         }
      }
   }

   // Ko'chish xaritasi: v1.0.0 qoidasi → bandlar yoki olib tashlash sababi.
   const mapped = new Map();
   for (const c of cards) {
      for (const b of Array.isArray(c.bandlar) ? c.bandlar : []) {
         for (const k of Array.isArray(b?.manba) ? b.manba : []) mapped.set(k, [...(mapped.get(k) ?? []), b.id]);
      }
   }
   const olib = royxat.olibTashlandi ?? {};
   for (const [k, sabab] of Object.entries(olib)) {
      if (!invKeys.has(k)) errors.push(`ko'chish: ${k} v1.0.0 qoidalari ro'yxatida yo'q`);
      if (mapped.has(k)) errors.push(`ko'chish: ${k} ham bandga ko'chgan (${mapped.get(k).join(", ")}), ham olib tashlangan`);
      if (!nonEmptyText(sabab)) errors.push(`ko'chish: ${k} olib tashlangan, lekin sababi yozilmagan`);
   }
   const kochish = inventory.map((r) => ({
      ...r,
      bandlar: mapped.get(r.kalit) ?? [],
      olibTashlandi: olib[r.kalit] ?? null,
   }));
   // Ko'chish tugaganda (v2.0.0 oldidan) har protocol yozilgan bo'lishi ham shart.
   if (royxat.kochishToliq) {
      for (const p of registry.values()) {
         if (!cards.some((c) => c.kod === p.kod)) errors.push(`${p.kod}: protocol ro'yxatda bor, lekin kartasi yozilmagan`);
      }
      for (const r of kochish) {
         if (!r.bandlar.length && !r.olibTashlandi) errors.push(`ko'chish: ${r.kalit} (${r.daraja}) ko'chmagan: «${r.matn}»`);
      }
   }

   const order = (c) => royxat.protokollar.findIndex((p) => p.kod === c.kod);
   cards.sort((a, b) => order(a) - order(b));
   const saralash = cards
      .filter((c) => !isUmumiy(c))
      .flatMap((c) => (Array.isArray(c.belgilar) ? c.belgilar : []).map((belgi) => ({ belgi, kod: c.kod })));

   return {
      errors,
      protocol: { royxat: royxat.protokollar, cards, saralash, kochish, kochishToliq: Boolean(royxat.kochishToliq) },
   };
}

// ---------- Handbook bilan bog'lanish ----------

/** Band raqami bo'yicha band, kartasi bilan. */
export function findBand(protocol, id) {
   for (const card of protocol.cards) {
      const band = card.bandlar.find((b) => b.id === id);
      if (band) return { card, band };
   }
   return null;
}

/**
 * Handbook boblari protocol'ga faqat havola qiladi: o'z matnli qoida qutisi (`<Rule>`) qolmagan,
 * har `<Band id="…" />` mavjud bandga ishora qiladi.
 * @param {{ file: string, text: string }[]} sources
 */
export function checkHandbook(sources, protocol) {
   const errors = [];
   const written = new Set(protocol.cards.map((c) => c.kod));
   for (const { file, text: raw } of sources) {
      // Kod bloklari misol: ular tekshirilmaydi (qator raqamlari saqlanishi uchun bo'sh qatorga almashtiriladi).
      const text = raw.replace(/```[\s\S]*?```/g, (block) => block.replace(/[^\n]/g, ""));
      const line = (i) => text.slice(0, i).split("\n").length;
      // `<Band id="…" />` pastda alohida tekshiriladi; oddiy havolalar qidiruvida u bo'sh joyga almashtiriladi.
      const prose = text.replace(/<Band\b[^>]*>/g, (tag) => " ".repeat(tag.length));
      for (const m of prose.matchAll(BAND_REF)) {
         if (written.has(m[1]) && !findBand(protocol, m[0])) {
            errors.push(`${file}:${line(m.index)} — havola ${m[0]}: protocol'da bunday band yo'q`);
         }
      }
      for (const m of text.matchAll(/<Rule\b/g)) {
         errors.push(`${file}:${line(m.index)} — o'z matnli <Rule> qutisi: qoida protocol'da, bu yerda <Band id="…" /> bo'ladi`);
      }
      for (const m of text.matchAll(/<Band\s+id="([^"]*)"/g)) {
         if (!findBand(protocol, m[1])) errors.push(`${file}:${line(m.index)} — <Band id="${m[1]}">: protocol'da bunday band yo'q`);
      }
   }
   return errors;
}

// ---------- Sxema tavsifi ----------

/** Qaror nuqtasi olib boradigan protocol: kodi, nomi va kartasi yozilganmi. */
export function protocolRef(protocol, kod) {
   if (kod == null) return null;
   const reg = protocol.royxat.find((p) => p.kod === kod);
   return { kod, nom: reg?.nom ?? "?", yozilgan: protocol.cards.some((c) => c.kod === kod) };
}

/**
 * Kartaning sxemasi uchun qadamlar ketma-ketligi: boshlash sharti, bandlar (taqiqsiz) kartadagi tartibda,
 * har qaror nuqtasi o'z `keyin` bandidan so'ng, oxirida tugash mezoni. Sxema faqat shundan chiziladi.
 */
export function cardFlow(protocol, card) {
   const flow = [{ tur: "boshlash", matnlar: card.shart ?? [] }];
   for (const b of card.bandlar) {
      if (b.daraja === "taqiq") continue;
      flow.push({ tur: "band", id: b.id, daraja: b.daraja, tekshiruvchi: b.tekshiruvchi, matn: b.matn });
      for (const q of (card.qarorlar ?? []).filter((x) => x.keyin === b.id)) {
         flow.push({ tur: "qaror", keyin: b.id, savol: q.savol, ha: protocolRef(protocol, q.ha), yoq: protocolRef(protocol, q.yoq) });
      }
   }
   flow.push({ tur: "tugash", matnlar: card.tugash ?? [] });
   return flow;
}

// ---------- Markdown nusxa ----------

const cell = (s) => String(s).replace(/\|/g, "\\|").replace(/\n+/g, " ");
const tekshiruvchi = (t) => `${t} (${TEKSHIRUVCHILAR[t]})`;

function protocolLink(protocol, kod) {
   const ref = protocolRef(protocol, kod);
   const label = `${ref.kod} — ${ref.nom}`;
   return ref.yozilgan ? `[${label}](${kod}.md)` : `${label} (yoziladi)`;
}

function bandTable(bandlar) {
   const rows = bandlar.map((b) => `| ${b.id} | ${b.daraja} | ${tekshiruvchi(b.tekshiruvchi)} | ${cell(b.matn)} |`);
   return ["| Band | Daraja | Tekshiruvchi | Nima qilinadi |", "|---|---|---|---|", ...rows].join("\n");
}

function cardMarkdown(protocol, c, version) {
   const out = [`# ${c.kod} — ${c.nom}`, ""];
   const guruh = GURUHLAR.find((g) => g.id === c.guruh)?.nom;
   out.push(`Protocol ${version} · Guruh: ${guruh}`, "");
   if (!isUmumiy(c)) {
      out.push("## Qachon", "", ...c.belgilar.map((s) => `- ${s}`), "");
      out.push("## Kim", "", c.ijrochi, "");
      out.push("## Boshlash sharti", "", ...c.shart.map((s) => `- ${s}`), "");
   }
   const steps = c.bandlar.filter((b) => b.daraja !== "taqiq");
   const bans = c.bandlar.filter((b) => b.daraja === "taqiq");
   if (steps.length) out.push(isUmumiy(c) ? "## Bandlar" : "## Qadamlar", "", bandTable(steps), "");
   if (c.qarorlar?.length) {
      const target = (t) => (t == null ? "davom etiladi" : `→ ${protocolLink(protocol, t)}`);
      out.push(
         "## Qaror nuqtalari",
         "",
         "| Qayerda | Savol | Ha | Yo'q |",
         "|---|---|---|---|",
         ...c.qarorlar.map((q) => `| ${q.keyin} dan keyin | ${cell(q.savol)} | ${target(q.ha)} | ${target(q.yoq)} |`),
         "",
      );
   }
   if (!isUmumiy(c)) out.push("## Tugash mezoni", "", ...c.tugash.map((s) => `- ${s}`), "");
   if (bans.length) out.push("## Taqiqlar", "", bandTable(bans), "");
   if (!isUmumiy(c)) {
      out.push("## Murojaat", "", c.murojaat, "");
      out.push("## Sabab", "", `Engineering Handbook: ${c.handbook.map((n) => `${n}-bob`).join(", ")}.`, "");
   }
   return `${out.join("\n").trimEnd()}\n`;
}

function readme(protocol, version) {
   const out = [`# Engineering Protocol`, "", `Versiya: ${version}`, ""];
   out.push(
      "Protocol nimani, qachon, qanday qilish va kim tekshirishini belgilaydi. Sababi Engineering Handbook'da.",
      "Protocol'da yo'q narsa qoida emas. Ishni boshlashdan oldin saralash jadvalidan protocol'ni toping;",
      "hech biri mos kelmasa, to'xtab release owner'dan so'rang.",
      "",
      "## Darajalar",
      "",
      "| Daraja | Ma'nosi |",
      "|---|---|",
      ...Object.entries(DARAJALAR).map(([k, v]) => `| ${k} | ${v} |`),
      "",
      "## Tekshiruvchilar",
      "",
      "| Tekshiruvchi | Turi |",
      "|---|---|",
      ...Object.entries(TEKSHIRUVCHILAR).map(([k, v]) => `| ${k} | ${v} |`),
      "",
      "## Saralash jadvali",
      "",
      "| Belgi | Protocol |",
      "|---|---|",
      ...protocol.saralash.map((r) => `| ${cell(r.belgi)} | ${protocolLink(protocol, r.kod)} |`),
      "",
      "## Protocol'lar",
      "",
   );
   for (const g of GURUHLAR) {
      const items = protocol.royxat.filter((p) => p.guruh === g.id);
      if (!items.length) continue;
      out.push(`### ${g.nom}`, "", ...items.map((p) => `- ${protocolLink(protocol, p.kod)}`), "");
   }
   return `${out.join("\n").trimEnd()}\n`;
}

/** Har protocol uchun alohida Markdown fayl va README (saralash jadvali). Fayl nomi → matn. */
export function toMarkdown(protocol, { version }) {
   const files = new Map([["README.md", readme(protocol, version)]]);
   for (const c of protocol.cards) files.set(`${c.kod}.md`, cardMarkdown(protocol, c, version));
   return files;
}

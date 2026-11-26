// Release fayllarini dist/release/ ga yig'adi: ikkala kitob (PDF, HTML), protocol Markdown to'plami va Release matni.
// Avval `pnpm build`, `pnpm pdf`, `pnpm protocol` (yoki `pnpm release:assets` hammasini yuritadi).
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { book } from "../src/book.config.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(ROOT, "dist");
const out = join(dist, "release");
const v = book.version;

for (const f of ["handbook.pdf", "handbook.html", "protocol.pdf", "protocol.html", "protocol/README.md"]) {
   if (!existsSync(join(dist, f))) throw new Error(`dist/${f} yo'q: avval pnpm build, pnpm pdf va pnpm protocol`);
}
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = [];
for (const [src, name] of [
   ["handbook.pdf", `engineering-handbook-${v}.pdf`],
   ["handbook.html", `engineering-handbook-${v}.html`],
   ["protocol.pdf", `engineering-protocol-${v}.pdf`],
   ["protocol.html", `engineering-protocol-${v}.html`],
]) {
   copyFileSync(join(dist, src), join(out, name));
   files.push(name);
}
const tarName = `engineering-protocol-${v}-md.tar.gz`;
execFileSync("tar", ["-czf", join(out, tarName), "-C", dist, "--transform", `s,^protocol,engineering-protocol-${v},`, "protocol"]);
files.push(tarName);

const changelog = readFileSync(join(ROOT, "CHANGELOG.md"), "utf8");
const section = changelog.split(/^## /m).find((s) => s.startsWith(v)) ?? "";
const notes = `${section.replace(/^[^\n]*\n/, "").trim()}

### Repo'lar uchun

1. Protocol nusxasini repo'ga oling: \`${tarName}\`ni oching va ichidagi Markdown fayllarni repo'dagi protocol papkasiga qo'ying (joyi va yangilash buyrug'i — repo profilining §12 bo'limida). Nusxa qo'lda tahrirlanmaydi.
2. Repo profilini yangilang (Ilova A): yuqorida kitob va protocol versiyasi ${v}; §6 label'lar (risk label, \`ready-for-*\`, \`spec\`, \`beta-ok\`, \`chetlanish\`); §12 Protocol — nusxa, yangilash buyrug'i, lokal bandlar (\`<REPO>-<KOD>-NN\`); §13 Kuzatish.
3. Repo'ning agent yo'riqnomasiga qo'shing: ish boshlashdan oldin saralash jadvalidan protocol tanlanadi va nomi aytiladi, mos kelmasa to'xtab so'raladi (UM-01, UM-02); skill yoki shablon protocol'ga zid bo'lsa, protocol bajariladi (UM-06).
4. PR shablonida: \`Tiket:\`/\`Spec:\` qatorlari, \`Closes\` yo'q, odam tekshiradigan bandlar cheklisti va \`Chetlanish:\` qatori uchun joy.

Fayllar: ${files.map((f) => `\`${f}\``).join(", ")}.
`;
writeFileSync(join(out, "NOTES.md"), notes);
console.log(`dist/release/: ${files.join(", ")}, NOTES.md`);

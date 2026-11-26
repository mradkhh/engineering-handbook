// Protocol'ni tekshiradi va har protocol uchun Markdown nusxa yozadi: dist/protocol/<KOD>.md
// `--check` — faqat tekshiradi, fayl yozmaydi.
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { book } from "../src/book.config.js";
import { loadProtocol, toMarkdown } from "../src/protocol.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

const { protocol, errors } = await loadProtocol(join(ROOT, "protocol"));
if (errors.length) {
   console.error(`Protocol tekshiruvi: ${errors.length} ta xato\n${errors.map((e) => `  ✕ ${e}`).join("\n")}`);
   process.exit(1);
}
const bands = protocol.cards.reduce((n, c) => n + c.bandlar.length, 0);
const moved = protocol.kochish.filter((r) => r.bandlar.length || r.olibTashlandi).length;
const summary = `${protocol.cards.length}/${protocol.royxat.length} protocol, ${bands} band, v1.0.0 qoidalaridan ${moved}/${protocol.kochish.length} ko'chgan`;
if (checkOnly) {
   console.log(`Protocol tekshiruvi o'tdi: ${summary}`);
} else {
   const out = join(ROOT, "dist/protocol");
   rmSync(out, { recursive: true, force: true });
   mkdirSync(out, { recursive: true });
   for (const [name, text] of toMarkdown(protocol, { version: book.protocolVersion })) writeFileSync(join(out, name), text);
   console.log(`dist/protocol/: ${summary}`);
}

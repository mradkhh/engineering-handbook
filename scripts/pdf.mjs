// dist/handbook.html va dist/protocol.html'ni Paged.js rejimida ochadi, sahifalash tugashini kutadi va PDF qiladi.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BOOKS = ["handbook", "protocol"];

function findChrome() {
   if (process.env.CHROME) return process.env.CHROME;
   for (const bin of ["google-chrome-stable", "google-chrome", "chromium", "chromium-browser"]) {
      try {
         return execFileSync("which", [bin], { encoding: "utf8" }).trim();
      } catch {}
   }
   throw new Error("Chrome topilmadi: CHROME o'zgaruvchisida yo'lini bering");
}

for (const b of BOOKS) {
   if (!existsSync(join(ROOT, `dist/${b}.html`))) throw new Error(`dist/${b}.html yo'q: avval \`pnpm build\` ni bajaring`);
}

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
try {
   for (const b of BOOKS) {
      const page = await browser.newPage();
      page.on("pageerror", (err) => console.error("Sahifa xatosi:", err.message));
      await page.goto(`file://${join(ROOT, `dist/${b}.html`)}?print`, { waitUntil: "networkidle0", timeout: 120_000 });
      await page.waitForFunction(() => document.documentElement.dataset.paged === "done", {
         timeout: 180_000,
      });
      const pages = await page.$$eval(".pagedjs_page", (els) => els.length);
      await page.pdf({ path: join(ROOT, `dist/${b}.pdf`), preferCSSPageSize: true, printBackground: true });
      console.log(`dist/${b}.pdf tayyor: ${pages} sahifa`);
      await page.close();
   }
} finally {
   await browser.close();
}

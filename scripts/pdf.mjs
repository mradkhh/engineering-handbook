// dist/handbook.html'ni Paged.js rejimida ochadi, sahifalash tugashini kutadi va dist/handbook.pdf qiladi.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = join(ROOT, "dist/handbook.html");
const pdf = join(ROOT, "dist/handbook.pdf");

function findChrome() {
   if (process.env.CHROME) return process.env.CHROME;
   for (const bin of ["google-chrome-stable", "google-chrome", "chromium", "chromium-browser"]) {
      try {
         return execFileSync("which", [bin], { encoding: "utf8" }).trim();
      } catch {}
   }
   throw new Error("Chrome topilmadi: CHROME o'zgaruvchisida yo'lini bering");
}

if (!existsSync(html)) throw new Error("Avval `pnpm build` ni bajaring");

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
try {
   const page = await browser.newPage();
   page.on("pageerror", (err) => console.error("Sahifa xatosi:", err.message));
   await page.goto(`file://${html}?print`, { waitUntil: "networkidle0", timeout: 120_000 });
   await page.waitForFunction(() => document.documentElement.dataset.paged === "done", {
      timeout: 180_000,
   });
   const pages = await page.$$eval(".pagedjs_page", (els) => els.length);
   await page.pdf({ path: pdf, preferCSSPageSize: true, printBackground: true });
   console.log(`dist/handbook.pdf tayyor: ${pages} sahifa`);
} finally {
   await browser.close();
}

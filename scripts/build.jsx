// Ikki kitobni yig'adi: dist/handbook.html (MDX boblar) va dist/protocol.html (protocol kartalari).
// Ekranda o'qish rejimi; "?print" bilan Paged.js A4 sahifalarga bo'ladi.
import { existsSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { book, chapters } from "../src/book.config.js";
import * as components from "../src/components/index.jsx";
import * as diagrams from "../src/components/diagrams.jsx";
import { BandRef, cardAnchor, guruhNomi, ProtocolCard, ProtocolFront } from "../src/components/protocol.jsx";
import { GURUHLAR, loadProtocol } from "../src/protocol.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGED_JS = "https://unpkg.com/pagedjs@0.4.3/dist/paged.polyfill.js";
const FONTS =
   "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap";

const baseComponents = {
   ...components,
   ...diagrams,
   table: (props) => (
      <div className="table-wrap">
         <table {...props} />
      </div>
   ),
};

const esc = (s) =>
   s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const decode = (s) =>
   s
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, ""));

// Boblar `<Band id="…" />` bilan protocol bandiga havola qiladi; matn protocol'dan olinadi.
const mdxComponents = (protocol) => ({
   ...baseComponents,
   Band: ({ id }) => <BandRef protocol={protocol} id={id} protocolHref="protocol.html" />,
});

async function renderChapter(ch, protocol) {
   const source = readFileSync(join(ROOT, "content", ch.file), "utf8");
   const { default: Content } = await evaluate(source, {
      ...runtime,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
   });
   let html = renderToStaticMarkup(<Content components={mdxComponents(protocol)} />);

   // Boblararo id to'qnashmasligi uchun har bir id bob prefiksini oladi.
   const prefix = `ch${ch.n}-`;
   html = html.replace(/ id="([^"]+)"/g, ` id="${prefix}$1"`);
   html = html.replace(/ href="#([^"]+)"/g, ` href="#${prefix}$1"`);

   // Bo'limlarga raqam: 7.1, 7.2, ...
   const sections = [];
   html = html.replace(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g, (_, id, inner) => {
      const n = `${ch.n}.${sections.length + 1}`;
      sections.push({ id, n, title: stripTags(inner) });
      return `<h2 id="${id}"><span class="secnum">${n}</span>${inner}</h2>`;
   });

   return {
      sections,
      html: `<section class="chapter" id="ch-${ch.n}">
<div class="chapter__kicker">${/^[0-9]+$/.test(ch.n) ? `${ch.n}-bob` : `Ilova ${ch.n}`}</div>
${html}
</section>`,
   };
}

function coverArt() {
   return `<svg class="cover__art" viewBox="0 0 400 300" aria-hidden="true">
<path class="ca-line" d="M40 230 C 80 230, 80 90, 130 90 L 250 90"/>
<path class="ca-line" d="M10 230 L 390 230"/>
<path class="ca-line ca-line--accent" d="M180 230 C 220 230, 220 160, 262 160 L 384 160"/>
${[40, 110, 180, 250, 320, 370].map((x) => `<circle class="ca-dot" cx="${x}" cy="230" r="11"/>`).join("")}
${[130, 190, 250].map((x) => `<circle class="ca-dot" cx="${x}" cy="90" r="11"/>`).join("")}
${[262, 322, 384].map((x) => `<circle class="ca-dot ca-dot--accent" cx="${x}" cy="160" r="11"/>`).join("")}
</svg>`;
}

function cover(meta) {
   return `<header class="cover">
${coverArt()}
<div class="cover__kicker">${esc(meta.kicker)}</div>
<div class="cover__badge">${esc(meta.edition)}</div>
<h1 class="cover__title">${esc(meta.title)}</h1>
<p class="cover__subtitle">${esc(meta.subtitle)}</p>
<dl class="cover__meta">
<dt>Versiya</dt><dd>${esc(meta.version)}</dd>
<dt>Sana</dt><dd>${esc(book.date)}</dd>
<dt>Muallif</dt><dd>${esc(book.author)}</dd>
<dt>Litsenziya</dt><dd>${esc(book.license)}</dd>
</dl>
</header>`;
}

// items: { n, title, href | null (yoziladi), subs: [{ n, title, href }] }
function toc(items) {
   const lis = items.map((it) => {
      if (!it.href) {
         return `<li class="toc__item toc__item--pending"><span class="toc__n">${esc(it.n)}</span><span class="toc__name">${esc(it.title)}</span><span class="toc__status">yoziladi</span></li>`;
      }
      const subs = it.subs
         .map(
            (s) =>
               `<li><a class="toc__link" href="${s.href}"><span class="toc__subn">${esc(s.n)}</span>${esc(s.title)}</a></li>`,
         )
         .join("");
      return `<li class="toc__item"><span class="toc__n">${esc(it.n)}</span><span class="toc__name"><a class="toc__link" href="${it.href}">${esc(it.title)}</a></span><span></span><ul class="toc__sub">${subs}</ul></li>`;
   });
   return `<nav class="toc" aria-label="Mundarija">
<h2 class="toc__title">Mundarija</h2>
<ol class="toc__list">${lis.join("\n")}</ol>
</nav>`;
}

const modeScript = `
(function () {
  var printMode = new URLSearchParams(location.search).has("print");
  if (!printMode) {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-print-mode]");
      if (b) location.search = "?print";
    });
    return;
  }
  document.documentElement.classList.add("print");
  window.PagedConfig = {
    auto: true,
    after: function (flow) {
      var wrap = document.createElement("div");
      wrap.className = "print-fab-wrap";
      wrap.innerHTML =
        '<span class="print-status">' + flow.total + ' sahifa · A4</span>' +
        '<a class="btn btn--ghost" style="background:#fff" href="' + location.pathname + '">O\\'qish rejimi</a>' +
        '<button class="btn" type="button">Chop etish / PDF</button>';
      wrap.querySelector("button").addEventListener("click", function () { window.print(); });
      document.body.appendChild(wrap);
      document.documentElement.dataset.paged = "done";
    }
  };
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toolbar, .print-tip").forEach(function (el) { el.remove(); });
    var s = document.createElement("script");
    s.src = ${JSON.stringify(PAGED_JS)};
    document.head.appendChild(s);
  });
})();
`;

function page(meta, body) {
   const css = readFileSync(join(ROOT, "src/styles/book.css"), "utf8");
   return `<!doctype html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.subtitle)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>
${css}
</style>
<script>${modeScript}</script>
</head>
<body>
<div class="toolbar">
<span class="toolbar__title">${esc(meta.title)}</span>
<span class="toolbar__version">${esc(meta.version)}</span>
${meta.other ? `<a class="btn btn--ghost" href="${meta.other.href}">${esc(meta.other.label)}</a>` : ""}
<button class="btn" type="button" data-print-mode>Chop etish ko'rinishi</button>
</div>
<main class="book book--${meta.id}">
<p class="print-tip">PDF uchun sahifaning yuqorisidagi «Chop etish ko'rinishi» tugmasini bosing: unda sahifa raqamlari va mundarija sahifalari to'g'ri chiqadi.</p>
${cover(meta)}
${body}
</main>
</body>
</html>
`;
}

const handbookMeta = {
   id: "handbook",
   kicker: "Reglament · qo'llanma",
   title: book.title,
   subtitle: book.subtitle,
   edition: book.edition,
   version: book.version,
   other: { href: "protocol.html", label: "Protocol" },
};

const protocolMeta = {
   id: "protocol",
   kicker: "Protocol · vaziyat bo'yicha qoidalar",
   title: "Engineering Protocol",
   subtitle: "Nimani, qachon, qanday qilish va kim tekshiradi",
   edition: "Qoralama",
   version: book.protocolVersion,
   other: { href: "handbook.html", label: "Handbook" },
};

async function buildHandbook(protocol) {
   const rendered = new Map();
   for (const ch of chapters.filter((c) => c.file && existsSync(join(ROOT, "content", c.file)))) {
      rendered.set(ch.n, await renderChapter(ch, protocol));
   }
   const items = chapters.map((ch) => {
      const r = rendered.get(ch.n);
      return r
         ? { n: ch.n, title: ch.title, href: `#ch-${ch.n}`, subs: r.sections.map((s) => ({ ...s, href: `#${s.id}` })) }
         : { n: ch.n, title: ch.title, href: null, subs: [] };
   });
   const body = [toc(items), ...[...rendered.values()].map((r) => r.html)].join("\n");
   writeFileSync(join(ROOT, "dist/handbook.html"), page(handbookMeta, body));
   const sectionCount = [...rendered.values()].reduce((n, r) => n + r.sections.length, 0);
   console.log(`dist/handbook.html: ${rendered.size} bob, ${sectionCount} bo'lim`);
}

async function buildProtocol(protocol) {
   const section = (id, kicker, inner) =>
      `<section class="chapter protocol" id="${id}">
<div class="chapter__kicker">${esc(kicker)}</div>
${renderToStaticMarkup(inner)}
</section>`;
   const sections = [section("p-saralash", "Kirish", <ProtocolFront protocol={protocol} />)];
   const items = [
      {
         n: "—",
         title: "Saralash jadvali",
         href: "#p-saralash",
         subs: [
            { n: "", title: "Darajalar", href: "#p-darajalar" },
            { n: "", title: "Tekshiruvchilar", href: "#p-tekshiruvchilar" },
            { n: "", title: "Protocol'lar", href: "#p-royxat" },
         ],
      },
   ];
   for (const g of GURUHLAR) {
      for (const p of protocol.royxat.filter((x) => x.guruh === g.id)) {
         const card = protocol.cards.find((c) => c.kod === p.kod);
         if (!card) {
            items.push({ n: p.kod, title: p.nom, href: null, subs: [] });
            continue;
         }
         sections.push(
            section(
               cardAnchor(p.kod),
               guruhNomi(g.id),
               <ProtocolCard protocol={protocol} card={card} handbookHref="handbook.html" />,
            ),
         );
         items.push({ n: p.kod, title: p.nom, href: `#${cardAnchor(p.kod)}`, subs: [] });
      }
   }
   writeFileSync(join(ROOT, "dist/protocol.html"), page(protocolMeta, [toc(items), ...sections].join("\n")));
   console.log(`dist/protocol.html: ${protocol.cards.length}/${protocol.royxat.length} protocol`);
}

async function main() {
   mkdirSync(join(ROOT, "dist"), { recursive: true });
   const { protocol, errors } = await loadProtocol(join(ROOT, "protocol"));
   if (errors.length) throw new Error(`Protocol tekshiruvi o'tmadi (pnpm check):\n${errors.join("\n")}`);
   await buildHandbook(protocol);
   await buildProtocol(protocol);
}

main().catch((err) => {
   console.error(err);
   process.exit(1);
});

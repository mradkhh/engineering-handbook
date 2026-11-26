# Engineering Handbook va Engineering Protocol

Ikki kitob, bitta versiya. **Protocol** — jamoaning barcha repo'lari uchun yagona qoida manbai: har vaziyat uchun karta (qachon, kim, qadamlar, qaror nuqtalari, tugash mezoni). **Handbook** — qoidalarning sababi, atamalar va misollar. Har repo o'z aniq qiymatlari va lokal bandlarini «repo profili»da yozadi (Ilova A).

**PDF va Markdown:** [Releases](../../releases) sahifasida har versiyaning ikkala PDF'i va protocol'ning Markdown to'plami bor.

## Tuzilma

- `protocol/` — Engineering Protocol: vaziyat bo'yicha qoida kartalari (`royxat.js` — kodlar va guruhlar, `<kod>.js` — karta, `v1-qoidalar.json` — v1.0.0 qoidalari, ko'chish xaritasi uchun). Hamma majburiy qoida shu yerda; boblar sababini tushuntiradi.
- `src/protocol.js` — protocol fayllarini o'qiydigan yagona modul: tekshiradi, Markdown nusxa va sxema tavsifini yasaydi.
- `src/components/protocol.jsx` — Protocol kitobi: karta sahifasi va kartadan chiziladigan sxema.
- `content/*.mdx` — boblar (o'zbekcha, git atamalari inglizcha).
- `src/terms.js` — lug'at: 13-bob va matndagi atamalar shu yerdan olinadi.
- `src/components/` — kitob komponentlari: Rule, Note, Warning, DoDont, Steps, Terminal, Diagram, Term, Phrase, Glossary.
- `src/styles/book.css` — ekran (yorug'/qorong'i) va chop etish (A4) uslublari.

## Yig'ish

```bash
pnpm install
pnpm build   # dist/handbook.html va dist/protocol.html — o'qish rejimi; ?print bilan A4 sahifalar
pnpm pdf     # dist/handbook.pdf va dist/protocol.pdf — Chrome kerak (CHROME o'zgaruvchisi bilan yo'lini berish mumkin)
pnpm protocol  # dist/protocol/*.md — har protocol alohida fayl, README.md'da saralash jadvali
pnpm check   # testlar va protocol tekshiruvi
pnpm release:assets  # dist/release/: ikkala PDF va HTML, protocol Markdown to'plami, Release matni (NOTES.md)
```

Brauzerda PDF: `dist/handbook.html` → «Chop etish ko'rinishi» → «Chop etish / PDF» («Background graphics» yoqilgan bo'lsin).

## Hissa qo'shish

Xato yoki bo'shliq topsangiz — issue yoki PR. Kitob PR orqali o'zgaradi; merge'ni release owner qiladi. Har bir versiya `CHANGELOG.md`ga yoziladi.

## Litsenziya

[CC BY 4.0](LICENSE)

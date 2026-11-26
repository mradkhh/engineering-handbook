# Engineering Handbook

Git, ish oqimi va atamalar reglamenti. Jamoaning barcha repo'lari uchun umumiy qoidalar; har bir repo o'z aniq qiymatlarini «repo profili»da yozadi (Ilova A).

**PDF:** [Releases](../../releases) sahifasida har bir versiyaning PDF'i bor.

## Tuzilma

- `protocol/` — Engineering Protocol: vaziyat bo'yicha qoida kartalari (`royxat.js` — kodlar va guruhlar, `<kod>.js` — karta, `v1-qoidalar.json` — v1.0.0 qoidalari, ko'chish xaritasi uchun). Hamma majburiy qoida shu yerda; boblar sababini tushuntiradi.
- `src/protocol.js` — protocol fayllarini o'qiydigan yagona modul: tekshiradi va Markdown nusxa yasaydi.
- `content/*.mdx` — boblar (o'zbekcha, git atamalari inglizcha).
- `src/terms.js` — lug'at: 13-bob va matndagi atamalar shu yerdan olinadi.
- `src/components/` — kitob komponentlari: Rule, Note, Warning, DoDont, Steps, Terminal, Diagram, Term, Phrase, Glossary.
- `src/styles/book.css` — ekran (yorug'/qorong'i) va chop etish (A4) uslublari.

## Yig'ish

```bash
pnpm install
pnpm build   # dist/handbook.html — o'qish rejimi; ?print bilan A4 sahifalar
pnpm pdf     # dist/handbook.pdf — Chrome kerak (CHROME o'zgaruvchisi bilan yo'lini berish mumkin)
pnpm protocol  # dist/protocol/*.md — har protocol alohida fayl, README.md'da saralash jadvali
pnpm check   # testlar va protocol tekshiruvi
```

Brauzerda PDF: `dist/handbook.html` → «Chop etish ko'rinishi» → «Chop etish / PDF» («Background graphics» yoqilgan bo'lsin).

## Hissa qo'shish

Xato yoki bo'shliq topsangiz — issue yoki PR. Kitob PR orqali o'zgaradi; merge'ni release owner qiladi. Har bir versiya `CHANGELOG.md`ga yoziladi.

## Litsenziya

[CC BY 4.0](LICENSE)

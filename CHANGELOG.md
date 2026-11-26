# Changelog

Versiyalar semver bo'yicha: birinchi raqam — qoidaning ma'nosi o'zgardi, o'rta raqam — yangi qoida yoki bob, oxirgi raqam — xato tuzatish.

## v2.0.0 — qoralama (chiqmagan)

Engineering Protocol — ikkinchi kitob, yagona qoida manbai (blago-vsem/crm#208). Hali chiqmagan; v1.0.0 amalda.

- `protocol/`: vaziyat bo'yicha kartalar, `pnpm check` va `pnpm protocol`. Yozilgan: Umumiy qoidalar, PR ochish, Xavfli o'zgarish, Promote, Release, Beta qizil, Prod buzildi, Revert, Sir oshkor bo'ldi, Lokal git xatosi.
- Tekshiruv matndagi havolalarni ham tekshiradi: band (`XAVF-08`) va qavsdagi protocol kodi (`(BETA)`); lokal band (`CRM-PR-01`) o'tkaziladi.
- Protocol kitobi (`dist/protocol.html`, PDF): saralash jadvali, darajalar, har karta va uning kartadan chizilgan sxemasi.
- Ma'nosi o'zgaradigan qoidalar (chiqishda major sababi):
  - Darajalar uchta: taqiq, majburiy, tavsiya. MAY yo'q; tavsiya sababsiz o'tkazib yuborilishi mumkin (v1.0.0 SHOULD: «jiddiy sabab bo'lsa»).
  - PR matnida `Closes #N` o'rniga `Tiket:` va `Spec:` qatorlari; issue'ni yopadigan kalit so'z taqiq (05#3, 08#8).
  - Release owner'ning o'z ishi ham PR orqali.
  - Xavf belgili PR «yolg'iz» emas, o'z spec'ining riskli tiketlari bilan bitta guruhda promote qilinadi (11#5).
  - Issue faqat prodga chiqqach yopiladi; reliz milestone, `vYYYY.MM.DD` tag va GitHub Release bilan yoziladi.

## v1.0.0 — 2026-11-24

Birinchi nashr.

- 15 bob va Ilova A: kitobni o'qish, git asoslari, `dev → beta → main` modeli, rollar, ish oqimi, agent bilan ishlash oqimi, kundalik git amallari, commit/branch/PR qoidalari, review, tekshiruvlar, xavfli o'zgarishlar, muammo bo'lganda, lug'at, suhbat namunalari, bir sahifalik eslatma, repo profili shabloni.
- Qoida darajalari: RFC 2119 (MUST, MUST NOT, SHOULD, MAY).
- Lug'at: ~90 atama, 7 toifa, to'g'ri va noto'g'ri qo'llanish misollari bilan.
- Chop etish: A4, sahifa raqamlari, mundarijada sahifa raqamlari (Paged.js).

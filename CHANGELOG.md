# Changelog

Versiyalar semver bo'yicha: birinchi raqam — qoidaning ma'nosi o'zgardi, o'rta raqam — yangi qoida yoki bob, oxirgi raqam — xato tuzatish.

## v2.0.0 — 2026-11-26

Ikkinchi nashr: **Engineering Protocol** qo'shildi va yagona qoida manbai bo'ldi (blago-vsem/crm#208). Kitob endi darslik: qoidaning sababini tushuntiradi, qoidaning o'zi — protocol bandi.

### Qo'shildi

- **Protocol** — 22 ta vaziyat kartasi, 5 guruh: Umumiy; ish oqimi (Yangi ish, Spec va tiketlar, Tiketni boshlash, Kod va commit, Agent bilan ishlash, Dev bilan moslash, Push, PR ochish, Review, Review'ga javob, Dev'ga merge, Tozalash); chiqarish (Xavfli o'zgarish, Promote, Release); favqulodda (Beta qizil, Prod buzildi, Revert, Sir oshkor bo'ldi, Lokal git xatosi); boshqaruv (Protocol yoki profilni o'zgartirish). 140 band, har birida o'zgarmas raqam, daraja va tekshiruvchi.
- Saralash jadvali («belgi → protocol»), har karta uchun kartadan avtomat chizilgan sxema; protocol kitobi (HTML, PDF) va har protocol alohida Markdown fayl (`pnpm protocol`) — repo'lar shu nusxani oladi.
- `pnpm check`: protocol tekshiruvi (band raqamlari, daraja, tekshiruvchi, qaror nuqtalari, saralash, matndagi havolalar, to'liq ko'chish xaritasi) va handbook tekshiruvi (o'z matnli qoida qutisi yo'q, har band havolasi mavjud bandga).
- Lug'atda «Protocol» toifasi: protocol, band, saralash jadvali, chetlanish, tekshiruvchi, qaror nuqtasi, tugash mezoni, ko'chish xaritasi, lokal band.
- Ilova A profil shablonida §12 Protocol (versiya, nusxa, lokal bandlar) va §13 Kuzatish (kanban, bosqichlar, label'lar).

### O'zgardi — qoida ma'nosi (major sababi)

- Darajalar uchta: taqiq (hech kim, hech qachon), majburiy (chetga chiqish — yozma `Chetlanish:` va release owner roziligi), tavsiya (sababsiz o'tkazib yuborish mumkin). RFC 2119 so'zlari ishlatilmaydi.
- Protocol'da yo'q narsa qoida emas (UM-03).
- PR matnida va commit xabarida `Closes`/`Fixes`/`Resolves` taqiq; o'rniga `Tiket: #N — …` va `Spec: #P — …` qatorlari (PR-04, PR-T1). Issue faqat kod prodga chiqqanda yopiladi (RELIZ-11).
- Hamma ish PR orqali, release owner'ning o'z ishi ham (PR-01).
- Review qarori: approve tugmasi; jamoada muallifdan boshqa odam bo'lmasa — PR'ga yozilgan mustaqil agent review natijasi (MERGE-01). O'z PR'iga approve — taqiq (MERGE-T1).
- Xavfli PR yolg'iz emas, o'z spec'ining riskli tiketlari bilan bitta guruhda promote qilinadi; riskli PR `dev`ga kutib turgan ish promote qilingach merge qilinadi (PROMOTE-02, PROMOTE-03).
- Release yozuvi: milestone «Reliz YYYY-MM-DD», `vYYYY.MM.DD` tag va GitHub Release, `beta-ok`'siz tiketlar va chetlanishlar ro'yxati (RELIZ-04, RELIZ-06, RELIZ-10).
- Issue tasdig'i — release owner izohi va faqat u qo'yadigan `ready-for-*` label'i; spec qisqa nomi, `<Spec nomi>: …` sarlavha, faqat ikki daraja (YANGI-03, SPEC-01, SPEC-02).
- Revert asl tiket raqami bilan; tiket «Tayyor»ga qaytadi, tuzatish — yangi tiket (REVERT-01 … REVERT-05).
- Tozalashda `git branch -d`; squash'dan keyin `-D` ni faqat odam, PR head tekshirilgach; agent `-D` qilmaydi (TOZA-01, TOZA-03, TOZA-T1). `git reset --hard` o'rniga zaxira branch va `git branch -f` (GIT-01, GIT-02).
- Darajasi o'zgargan v1.0.0 qoidalari: 09#9 MUST → taqiq (JAVOB-T1); 14#3 SHOULD → majburiy (UM-13, gapda raqam doim nom bilan); 04#2/08#12 → MERGE-01 va MERGE-T1.

### Olib tashlandi

- `Rule` komponenti va kitobdagi o'z matnli qoida qutilari: v1.0.0 dagi 101 qutining hammasi protocol bandiga ko'chdi (ko'chish xaritasi — `protocol/v1-qoidalar.json` va bandlarning `manba` maydoni).
- 10#4 (MAY: hujjat push'ida `--no-verify`) — protocol'da «ixtiyoriy» daraja yo'q; hujjat push'i tartibi repo profilida.

## v1.0.0 — 2026-11-24

Birinchi nashr.

- 15 bob va Ilova A: kitobni o'qish, git asoslari, `dev → beta → main` modeli, rollar, ish oqimi, agent bilan ishlash oqimi, kundalik git amallari, commit/branch/PR qoidalari, review, tekshiruvlar, xavfli o'zgarishlar, muammo bo'lganda, lug'at, suhbat namunalari, bir sahifalik eslatma, repo profili shabloni.
- Qoida darajalari: RFC 2119 (MUST, MUST NOT, SHOULD, MAY).
- Lug'at: ~90 atama, 7 toifa, to'g'ri va noto'g'ri qo'llanish misollari bilan.
- Chop etish: A4, sahifa raqamlari, mundarijada sahifa raqamlari (Paged.js).

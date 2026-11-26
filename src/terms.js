// Lug'at — yagona manba. `Term` komponenti ta'rifni oladi, 13-bob (`Glossary`) hammasini chiqaradi.
// cat: toifa; def: ta'rif (80% STE); ok/bad: suhbatda to'g'ri va noto'g'ri qo'llanish.

export const categories = [
   "Git asoslari",
   "Branch va tarix",
   "Sinxronlash",
   "Ish oqimi va muhitlar",
   "PR va review",
   "Tekshiruv va deploy",
   "Agent oqimi",
   "Protocol",
];

export const terms = {
   // Git asoslari
   repo: {
      cat: "Git asoslari",
      def: "Loyihaning barcha fayllari va ularning to'liq tarixi. Bizda har bir mahsulot o'z repo'sida.",
   },
   clone: {
      cat: "Git asoslari",
      def: "Remote repo'ning to'liq nusxasini kompyuterga olish. Bir marta bajariladi.",
      ok: "Repo'ni clone qildim.",
      bad: "Repo'ni yuklab oldim.",
   },
   commit: {
      cat: "Git asoslari",
      def: "Repodagi o'zgarishlarning bitta saqlangan holati: muallif, vaqt, xabar va hash bilan.",
      ok: "O'zgarishni commit qildim.",
      bad: "Kommitladim.",
   },
   hash: {
      cat: "Git asoslari",
      def: "Commit'ning noyob identifikatori (SHA), masalan `32141932`. Commit o'zgarsa, hash ham o'zgaradi.",
   },
   "working tree": {
      cat: "Git asoslari",
      def: "Diskdagi fayllaringizning hozirgi holati. Commit qilinmagan o'zgarishlar shu yerda.",
   },
   "staging area": {
      cat: "Git asoslari",
      def: "Keyingi commit'ga kiradigan o'zgarishlar ro'yxati. `git add` shu yerga qo'shadi. Boshqa nomi: index.",
   },
   HEAD: {
      cat: "Git asoslari",
      def: "Hozir ishlayotgan commit'ingizga ko'rsatkich. Odatda joriy branch'ning uchi.",
   },
   "detached HEAD": {
      cat: "Git asoslari",
      def: "HEAD branch'ga emas, to'g'ridan-to'g'ri commit'ga ko'rsatgan holat. Bu holatdagi yangi commit'lar branch'siz qoladi.",
   },
   remote: {
      cat: "Git asoslari",
      def: "Reponing boshqa joydagi nusxasi. Bizda asosiy remote — GitHub'dagi `origin`.",
   },
   ".gitignore": {
      cat: "Git asoslari",
      def: "Git kuzatmaydigan fayllar ro'yxati: `node_modules`, `.env`, build natijalari.",
   },
   diff: {
      cat: "Git asoslari",
      def: "Ikki holat orasidagi qatorma-qator farq. PR'da review qilinadigan narsa — diff.",
   },

   // Branch va tarix
   branch: {
      cat: "Branch va tarix",
      def: "Commit'lar zanjirining nomlangan uchi. Yangi commit qilinsa, branch shu commit'ga suriladi.",
      ok: "Tiket uchun yangi branch ochdim.",
      bad: "Yangi vetka qildim.",
   },
   "feature branch": {
      cat: "Branch va tarix",
      def: "Bitta tiket uchun ochilgan qisqa muddatli branch. Nomi `<tiket raqami>-<qisqa-nom>`.",
   },
   "integration branch": {
      cat: "Branch va tarix",
      def: "Tayyor ishlar yig'iladigan branch. Bizda — `dev`.",
   },
   "merge commit": {
      cat: "Branch va tarix",
      def: "Ikki ota-onasi bor commit. Ikki ajralgan tarixni birlashtiradi.",
   },
   "fast-forward": {
      cat: "Branch va tarix",
      def: "Branch'ni yangi commit yaratmasdan oldinga surish. Faqat tarix ajralmagan bo'lsa mumkin.",
      ok: "Beta'ni dev'ga fast-forward qildim.",
   },
   rebase: {
      cat: "Branch va tarix",
      def: "Sizning commit'laringizni boshqa asos commit ustiga qayta yozadi. Commit'lar yangi hash oladi.",
      ok: "Branch'ni dev'ga rebase qildim.",
      bad: "Rebase oldim.",
   },
   merge: {
      cat: "Branch va tarix",
      def: "Ikki tarixni qo'shadi. Tarix ajralgan bo'lsa, merge commit yaratadi.",
      ok: "PR'ni dev'ga merge qildim.",
      bad: "Qo'shib yubordim.",
   },
   "squash-merge": {
      cat: "Branch va tarix",
      def: "PR'ning barcha commit'larini bitta commit qilib maqsad branch'ga qo'shadi. Commit sarlavhasi PR sarlavhasidan olinadi.",
      ok: "PR'ni squash-merge qildim.",
   },
   "cherry-pick": {
      cat: "Branch va tarix",
      def: "Boshqa branch'dagi bitta commit'ni joriy branch'ga nusxa qilish. Nusxa yangi hash oladi.",
   },
   revert: {
      cat: "Branch va tarix",
      def: "Eski commit'ning teskarisini yangi commit sifatida qo'shadi. Tarix qayta yozilmaydi.",
      ok: "Xato commit'ni revert qildim.",
      bad: "Commit'ni o'chirib tashladim.",
   },
   amend: {
      cat: "Branch va tarix",
      def: "Oxirgi commit'ni o'zgartirish (`git commit --amend`). Commit yangi hash oladi.",
   },
   conflict: {
      cat: "Branch va tarix",
      def: "Ikki o'zgarish bitta joyga tegadi va git natijani o'zi tanlay olmaydi.",
      ok: "Rebase'da conflict chiqdi, hal qildim.",
      bad: "Konflikt berdi.",
   },
   rerere: {
      cat: "Branch va tarix",
      def: "«Reuse recorded resolution»: bir marta hal qilingan conflict'ni keyingi safar o'zi hal qiladi.",
   },
   tag: {
      cat: "Branch va tarix",
      def: "Commit'ga qo'yilgan doimiy nom, masalan `v1.0.0`. Branch'dan farqi: tag surilmaydi.",
   },
   reflog: {
      cat: "Branch va tarix",
      def: "HEAD va branch'lar qayerda bo'lganining local tarixi. Yo'qolgan commit'ni topishga yordam beradi.",
   },

   // Sinxronlash
   "remote-tracking branch": {
      cat: "Sinxronlash",
      def: "Remote'dagi branch'ning local'dagi oxirgi ko'rinishi, masalan `origin/dev`. Faqat `fetch` uni yangilaydi.",
   },
   upstream: {
      cat: "Sinxronlash",
      def: "Branch push va pull qiladigan remote branch. `git status` shunga nisbatan «ahead/behind» ko'rsatadi.",
   },
   fetch: {
      cat: "Sinxronlash",
      def: "Remote'dagi yangi commit'larni oladi. Sizning branch'ingiz va fayllaringiz o'zgarmaydi.",
      ok: "Fetch qildim, dev'ga 3 ta commit kelibdi.",
      bad: "Dev'ni yangiladim.",
   },
   pull: {
      cat: "Sinxronlash",
      def: "`fetch` va undan keyin joriy branch'ni upstream bilan tenglash. Bizda faqat fast-forward bilan.",
      ok: "Local dev'ni pull qildim.",
      bad: "Pull oldim.",
   },
   push: {
      cat: "Sinxronlash",
      def: "Local commit'larni remote branch'ga yuborish.",
      ok: "Branch'ni push qildim.",
      bad: "Pushladim.",
   },
   "force-push": {
      cat: "Sinxronlash",
      def: "Remote branch tarixini local tarix bilan almashtiradigan push. Faqat `--force-with-lease` bilan va faqat o'z feature branch'ingizda.",
   },
   "force-with-lease": {
      cat: "Sinxronlash",
      def: "Remote branch siz oxirgi ko'rgan holatda bo'lsagina uni qayta yozadigan xavfsiz force-push.",
   },
   stash: {
      cat: "Sinxronlash",
      def: "Commit qilinmagan o'zgarishlarni vaqtincha chetga olib qo'yadi.",
   },
   worktree: {
      cat: "Sinxronlash",
      def: "Bitta repoga ulangan qo'shimcha ish papkasi. Har bir worktree'da o'z branch'i bo'ladi.",
   },

   // Ish oqimi va muhitlar
   environment: {
      cat: "Ish oqimi va muhitlar",
      def: "Kod ishlaydigan joy: local, beta, prod. O'zbekchada «muhit».",
   },
   beta: {
      cat: "Ish oqimi va muhitlar",
      def: "Prod nusxasidagi sinov muhiti va shu nomdagi branch. Faqat dasturchilar ishlatadi.",
   },
   prod: {
      cat: "Ish oqimi va muhitlar",
      def: "Xodimlar va mijozlar ishlatadigan haqiqiy muhit. Branch'i — `main`.",
   },
   promote: {
      cat: "Ish oqimi va muhitlar",
      def: "Sinalgan kodni keyingi muhitga o'tkazish: `beta`ni `dev`ga fast-forward qilib push qilish. Natijada beta'ga deploy boshlanadi.",
      ok: "Dev'ni beta'ga promote qildim.",
      bad: "Beta'ga ship qildim.",
   },
   release: {
      cat: "Ish oqimi va muhitlar",
      def: "`beta`dagi kodni release PR orqali `main`ga, ya'ni prod'ga chiqarish. Release window'da bajariladi.",
      ok: "Seshanba kuni release qilamiz.",
   },
   deploy: {
      cat: "Ish oqimi va muhitlar",
      def: "Yig'ilgan kodni muhitdagi serverga o'rnatish. Bizda CI o'zi bajaradi.",
   },
   hotfix: {
      cat: "Ish oqimi va muhitlar",
      def: "Prod'dagi shoshilinch xatoni oddiy release window'ni kutmasdan tuzatish.",
   },
   rollback: {
      cat: "Ish oqimi va muhitlar",
      def: "Muhitni oldingi ishlagan versiyaga qaytarish. Kod tarixini o'zgartirmaydi.",
   },
   "release owner": {
      cat: "Ish oqimi va muhitlar",
      def: "Promote, release va himoyalangan branch'larga push qiladigan yagona odam.",
   },
   "feature flag": {
      cat: "Ish oqimi va muhitlar",
      def: "Tayyor bo'lmagan funksiyani prod'da o'chiq tutadigan sozlama: env kaliti yoki tashkilot sozlamasi.",
   },
   "trunk-based": {
      cat: "Ish oqimi va muhitlar",
      def: "Hamma qisqa branch'larni kuniga bir necha marta bitta asosiy branch'ga qo'shadigan model.",
   },
   GitFlow: {
      cat: "Ish oqimi va muhitlar",
      def: "`develop`, `release/*`, `hotfix/*` branch'lari bor uzoq muddatli model. Bizda ishlatilmaydi.",
   },
   "GitHub Flow": {
      cat: "Ish oqimi va muhitlar",
      def: "`main` va undan ochiladigan feature branch'lar, PR merge bo'lishi bilan deploy.",
   },

   // PR va review
   PR: {
      cat: "PR va review",
      def: "Pull request: branch'ni boshqa branch'ga qo'shish taklifi. Review shu yerda bo'ladi.",
      ok: "PR ochdim, review qilib bering.",
      bad: "Merj reqvest tashladim.",
   },
   review: {
      cat: "PR va review",
      def: "Boshqa dasturchining PR'ini o'qib, izoh yozish va qaror berish.",
      ok: "PR'ingizni review qildim.",
      bad: "Kodingizni ko'rib chiqdim, hammasi zo'r.",
   },
   reviewer: {
      cat: "PR va review",
      def: "PR'ni review qiladigan odam. Approve berish yoki o'zgarish so'rash huquqi bor.",
   },
   approve: {
      cat: "PR va review",
      def: "Reviewer PR'ni merge qilishga ruxsat beradigan rasmiy qaror. GitHub'dagi «Approve» tugmasi.",
      ok: "PR'ga approve berdim.",
      bad: "LGTM deb yozib qo'ydim, bo'ldi.",
   },
   "request changes": {
      cat: "PR va review",
      def: "Reviewer'ning «o'zgarish kerak» degan rasmiy qarori. Tuzatilmaguncha merge qilinmaydi.",
   },
   LGTM: {
      cat: "PR va review",
      def: "«Looks good to me» — menga ma'qul. Approve'ning o'rnini bosmaydi.",
   },
   PTAL: {
      cat: "PR va review",
      def: "«Please take a look» — iltimos, ko'rib chiqing. Review so'rash yoki tuzatishdan keyin qayta so'rash.",
   },
   nit: {
      cat: "PR va review",
      def: "Mayda, majburiy bo'lmagan izoh: nom, bo'sh joy, uslub. Merge'ni to'xtatmaydi.",
   },
   blocking: {
      cat: "PR va review",
      def: "Tuzatilmaguncha merge qilib bo'lmaydigan izoh.",
   },

   // Tekshiruv va deploy
   hook: {
      cat: "Tekshiruv va deploy",
      def: "Git amalidan oldin yoki keyin o'zi ishlaydigan skript: `pre-commit`, `commit-msg`, `pre-push`.",
   },
   CI: {
      cat: "Tekshiruv va deploy",
      def: "Continuous Integration: push'dan keyin serverda o'zi ishlaydigan tekshiruv va build. Bizda GitHub Actions.",
   },
   gate: {
      cat: "Tekshiruv va deploy",
      def: "Shart bajarilmaguncha keyingi qadamni to'xtatadigan tekshiruv, masalan release-gate.",
   },
   migration: {
      cat: "Tekshiruv va deploy",
      def: "Baza tuzilmasini o'zgartiradigan skript. Oldingi release kodi bilan ham ishlashi shart.",
   },
   "expand/contract": {
      cat: "Tekshiruv va deploy",
      def: "Xavfsiz migratsiya tartibi: avval yangisini qo'shish, keyin ma'lumotni ko'chirish, oxirida eskisini olib tashlash.",
   },
   rehearsal: {
      cat: "Tekshiruv va deploy",
      def: "Release'dan oldin migratsiyalarni prod ma'lumotining nusxasida sinab ko'rish.",
   },

   // Agent oqimi
   issue: {
      cat: "Agent oqimi",
      def: "GitHub'dagi ish yozuvi: muammo, spec yoki tiket.",
   },
   spec: {
      cat: "Agent oqimi",
      def: "Katta ishning to'liq tavsifi: muammo, yechim, user story'lar, qarorlar, testlar. `/to-spec` yozadi.",
   },
   ticket: {
      cat: "Agent oqimi",
      def: "Spec'ning bitta PR'da bajariladigan bo'lagi. O'zbekchada «tiket». Bitta tiket — bitta commit.",
   },
   "acceptance criteria": {
      cat: "Agent oqimi",
      def: "Tiket bajarilgan hisoblanishi uchun tekshiriladigan shartlar ro'yxati. O'zbekchada «qabul mezonlari».",
   },
   ADR: {
      cat: "Agent oqimi",
      def: "Architecture Decision Record: qaytarish qiyin, sababi tushunarsiz bo'lishi mumkin bo'lgan qarorning qisqa yozuvi.",
   },
   glossary: {
      cat: "Agent oqimi",
      def: "Mahsulotning biznes atamalari ro'yxati (`GLOSSARY.md`). Git atamalari unga kirmaydi.",
   },
   triage: {
      cat: "Agent oqimi",
      def: "Yangi issue'ni baholab, belgi qo'yish: kim bajaradi va nima yetishmaydi.",
   },
   "AFK agent": {
      cat: "Agent oqimi",
      def: "Odam kuzatmasdan, mustaqil ishlaydigan agent. `ready-for-agent` belgili tiketni oladi.",
   },
   skill: {
      cat: "Agent oqimi",
      def: "Agent uchun yozilgan tayyor yo'riqnoma, masalan `/to-spec`. `/` bilan chaqiriladi.",
   },
   // Qo'shimcha atamalar (8–14-boblar)
   "draft PR": {
      cat: "PR va review",
      def: "Tayyor bo'lmagan PR: fikr olish uchun ochiladi, merge qilinmaydi.",
      ok: "Draft PR ochdim, yo'nalishni ko'rib bering.",
   },
   "self-review": {
      cat: "PR va review",
      def: "Muallif review so'rashdan oldin o'z PR'ini o'zi o'qishi.",
   },
   thread: {
      cat: "PR va review",
      def: "PR'dagi bitta izoh va unga berilgan javoblar zanjiri.",
   },
   "Conventional Commits": {
      cat: "PR va review",
      def: "Commit sarlavhasi uchun `type(scope): sarlavha` shaklidagi kelishuv.",
   },
   "risk label": {
      cat: "PR va review",
      def: "Xavfli PR'ga qo'yiladigan belgi. Bunday PR'ni release owner merge qiladi va yolg'iz promote qiladi. Nomi repo profilida.",
   },
   WIP: {
      cat: "PR va review",
      def: "«Work in progress»: ish tugamagan, review qilish erta.",
   },
   blocker: {
      cat: "PR va review",
      def: "Ishni to'xtatib turgan narsa. Review prefiksi `blocking:` bilan adashtirmang.",
   },
   trailer: {
      cat: "Git asoslari",
      def: "Commit tanasining oxiridagi `Kalit: qiymat` qatori, masalan `Co-Authored-By: ...`.",
   },
   ORIG_HEAD: {
      cat: "Branch va tarix",
      def: "Rebase, merge yoki reset'dan oldingi HEAD'ni saqlaydigan ko'rsatkich.",
   },
   "commit status": {
      cat: "Tekshiruv va deploy",
      def: "CI commit'ga yozadigan natija belgisi: muvaffaqiyatli, xato yoki kutilmoqda.",
   },
   "--no-verify": {
      cat: "Tekshiruv va deploy",
      def: "Hook'larni o'tkazib yuboradigan bayroq. Faqat hujjat push'ida va repo profili ruxsat bersa.",
   },
   backfill: {
      cat: "Tekshiruv va deploy",
      def: "Mavjud qatorlardagi ma'lumotni yangi ustun yoki tuzilmaga ko'chirish.",
   },
   incident: {
      cat: "Tekshiruv va deploy",
      def: "Foydalanuvchiga ta'sir qiladigan muammo, odatda prod'da.",
   },
   // Protocol
   protocol: {
      cat: "Protocol",
      def: "Bitta vaziyat uchun qoida kartasi: qachon qo'llanadi, kim bajaradi, qadamlar, qaror nuqtalari va tugash mezoni. Hamma majburiy qoida protocol'da; kitob sababini tushuntiradi.",
      ok: "PR protocol'i bo'yicha ishlayman.",
   },
   band: {
      cat: "Protocol",
      def: "Protocol'ning bitta qoidasi: o'zgarmas raqam (`PR-03`, taqiq `PR-T1`), daraja, tekshiruvchi va matn. Raqam qayta ishlatilmaydi.",
      ok: "blocking: PR-04 bajarilmagan — `Tiket:` qatori yo'q.",
   },
   "saralash jadvali": {
      cat: "Protocol",
      def: "«Belgi → protocol» jadvali. Ishni boshlashdan oldin qaysi protocol bo'yicha ishlashni shu jadvaldan topasiz.",
   },
   chetlanish: {
      cat: "Protocol",
      def: "Majburiy banddan oldindan yozilgan chetga chiqish: `Chetlanish: <band> — <sabab>` qatori va release owner roziligi. Taqiq bandidan chetlanish yo'q.",
      ok: "Chetlanish: PR-08 — migratsiya fayli katta, bo'lib bo'lmaydi.",
   },
   tekshiruvchi: {
      cat: "Protocol",
      def: "Bandning bajarilganini tekshiradigan narsa yoki odam: avtomat (hook, CI, skript) yoki odam (muallif, reviewer, release owner).",
   },
   "qaror nuqtasi": {
      cat: "Protocol",
      def: "Protocol kartasidagi savol: javobga qarab ish shu protocol'da davom etadi yoki boshqa protocol'ga o'tadi.",
   },
   "tugash mezoni": {
      cat: "Protocol",
      def: "Protocol bajarilgan hisoblanishi uchun tekshirsa bo'ladigan shartlar.",
   },
   "ko'chish xaritasi": {
      cat: "Protocol",
      def: "v1.0.0 kitobidagi har qoida qaysi bandga ko'chgani yoki nega olib tashlangani ro'yxati.",
   },
   "lokal band": {
      cat: "Protocol",
      def: "Faqat bitta repo'ga tegishli band. Repo profilida `<REPO>-<KOD>-NN` raqami bilan yoziladi va protocol'ni faqat qattiqlashtiradi.",
      ok: "CRM-PROMOTE-01: avval kutayotgan ishlar, keyin xavfli PR yolg'iz.",
   },
   freeze: {
      cat: "Ish oqimi va muhitlar",
      def: "Release boshlangandan keyingi holat: `dev`ga faqat joriy release tuzatishlari kiradi.",
      ok: "Dev hozir freeze'da.",
   },
   "release window": {
      cat: "Ish oqimi va muhitlar",
      def: "Release qilinadigan belgilangan kun va soat. Repo profilida yoziladi.",
   },
};

export function termDef(t) {
   const entry = terms[t];
   if (!entry) throw new Error(`Lug'atda yo'q atama: ${t}`);
   return entry.def;
}

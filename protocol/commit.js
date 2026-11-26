// Kod va commit: tiket branch'ida o'zgarish commit qilinadi.
export default {
   kod: "COMMIT",
   belgilar: ["Tiket branch'ida o'zgarishni commit qilish kerak"],
   ijrochi: "Dasturchi yoki agent",
   shart: ["Tiket branch'i ochilgan (BOSH)"],
   bandlar: [
      {
         id: "COMMIT-01",
         daraja: "majburiy",
         tekshiruvchi: "hook",
         matn: "Commit sarlavhasi `type(scope): sarlavha (#N)`; `type` kitobdagi ro'yxatdan, `N` — tiket raqami. Istisno: `git revert` yaratgan `Revert \"…\"` sarlavhasi (REVERT-02).",
         manba: ["08#4"],
      },
      {
         id: "COMMIT-02",
         daraja: "tavsiya",
         tekshiruvchi: "reviewer",
         matn: "Sababi koddan ko'rinmaydigan commit'ga tana yoziladi: qaysi muammo bor edi, qaysi variant tanlandi, nima uchun.",
         manba: ["08#5"],
      },
      {
         id: "COMMIT-03",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Kodni yoki uning sezilarli qismini agent yozgan bo'lsa, commit'da `Co-Authored-By` trailer'i bor.",
         manba: ["06#6", "08#6"],
      },
      {
         id: "COMMIT-04",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Kompyuterga xos fayllar (muharrir sozlamalari, shaxsiy skriptlar) repo'dagi `.gitignore`ga emas, `.git/info/exclude`ga yoziladi.",
         manba: ["02#2"],
      },
      {
         id: "COMMIT-T1",
         daraja: "taqiq",
         tekshiruvchi: "hook",
         matn: "Himoyalangan branch'da commit qilinmaydi; commit faqat tiket branch'ida.",
         manba: ["07#3"],
      },
      {
         id: "COMMIT-T2",
         daraja: "taqiq",
         tekshiruvchi: "reviewer",
         matn: "Sir (kalit, parol, token), `.env` fayl va mijozning shaxsiy ma'lumoti commit qilinmaydi; `git add -f` bilan ham. Env fayllar `.gitignore`da.",
         manba: ["02#1", "07#4", "11#10"],
      },
   ],
   qarorlar: [
      {
         keyin: "COMMIT-03",
         savol: "Commit'ga sir tushdimi va u push qilinganmi yoki boshqa joyda ko'ringanmi?",
         ha: "SIR",
         yoq: null,
      },
   ],
   tugash: ["O'zgarish tiket branch'ida commit qilingan, sarlavhasi COMMIT-01 shaklida"],
   murojaat: "Release owner",
   handbook: ["2", "7", "8"],
};

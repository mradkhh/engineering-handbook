// Tiketni boshlash: tasdiqlangan tiket bo'yicha ish branch'i ochiladi.
export default {
   kod: "BOSH",
   belgilar: ["Tasdiqlangan tiket bo'yicha ishni boshlash kerak"],
   ijrochi: "Dasturchi yoki agent",
   shart: ["Tiket tasdiqlangan (YANGI-03)"],
   bandlar: [
      {
         id: "BOSH-01",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Bitta tiket — bitta branch. Bir branch'da bir nechta tiket bajarilmaydi.",
         manba: ["01#1", "08#2"],
      },
      {
         id: "BOSH-02",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Branch integration branch'ning remote holatidan ochiladi (`git fetch origin`, `git switch -c <N>-<slug> --no-track origin/dev`). Nomi `<N>-<slug>`: `N` — tiket raqami, `slug` — inglizcha, kebab-case, 2–5 so'z.",
         manba: ["07#2", "08#1"],
      },
      {
         id: "BOSH-03",
         daraja: "tavsiya",
         tekshiruvchi: "reviewer",
         matn: "Ish boshlangach tiketga ishlayotgan odam assignee qilib biriktiriladi.",
      },
      {
         id: "BOSH-T1",
         daraja: "taqiq",
         tekshiruvchi: "reviewer",
         matn: "`<N>-<slug>` shaklida bo'lmagan branch push qilinmaydi.",
         manba: ["08#3"],
      },
   ],
   qarorlar: [
      {
         keyin: "BOSH-02",
         savol: "Tiketda XAVF-01 dagi xavfli turlardan biri bormi?",
         ha: "XAVF",
         yoq: null,
      },
   ],
   tugash: ["Tiket branch'i BOSH-02 bo'yicha ochilgan"],
   murojaat: "Release owner",
   handbook: ["5", "7", "8"],
};

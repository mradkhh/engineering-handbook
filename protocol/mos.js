// Dev bilan moslash: tiket branch'i integration branch'ning yangi holatiga olib kelinadi.
export default {
   kod: "MOS",
   belgilar: ["`dev`ga yangi commit'lar kirgan va tiket branch'ini yangilash kerak", "PR'da conflict bor"],
   ijrochi: "Tiket branch'i muallifi",
   shart: ["Ish papkasi toza: o'zgarishlar commit qilingan"],
   bandlar: [
      {
         id: "MOS-01",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Tiket branch'i faqat `git fetch origin` va `git rebase origin/dev` bilan yangilanadi; integration branch tiket branch'iga merge qilinmaydi.",
         manba: ["07#5"],
      },
      {
         id: "MOS-02",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Conflict hal qilingach, push'dan oldin testlar qayta yuritiladi.",
         manba: ["07#7"],
      },
      {
         id: "MOS-03",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Bir soatdan uzoq turadigan ish stash'da saqlanmaydi: u commit qilinadi yoki boshqa ish alohida worktree'da ochiladi.",
         manba: ["07#10"],
      },
      {
         id: "MOS-T1",
         daraja: "taqiq",
         tekshiruvchi: "reviewer",
         matn: "Boshqa odam ishlayotgan branch rebase qilinmaydi.",
         manba: ["07#6"],
      },
   ],
   qarorlar: [
      {
         keyin: "MOS-02",
         savol: "Rebase chalkashdimi yoki commit yo'qoldimi?",
         ha: "GIT",
         yoq: null,
      },
   ],
   tugash: ["Tiket branch'i `origin/dev` ustida; push qilingan bo'lsa, GIT-06 bo'yicha push qilingan"],
   murojaat: "Release owner",
   handbook: ["7", "12"],
};

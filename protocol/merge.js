// Dev'ga merge: tasdiqlangan PR integration branch'ga qo'shiladi.
export default {
   kod: "MERGE",
   belgilar: ["PR review qarorini olgan va `dev`ga qo'shish kerak"],
   ijrochi: "PR muallifi; risk label'li PR'ni — release owner",
   shart: ["PR'da `blocking:` thread'lar yopiq (JAVOB-T1)"],
   bandlar: [
      {
         id: "MERGE-01",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "PR merge'dan oldin muallifdan boshqa reviewer'ning qarori bor: approve tugmasi (REVIEW-07). Jamoada muallifdan boshqa odam bo'lmasa, qaror — mustaqil agent review'ining natijasi PR'ga izoh bo'lib yozilgani va undagi har `blocking:` yopilgani.",
         manba: ["04#2", "08#12"],
      },
      {
         id: "MERGE-02",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Feature PR `dev`ga «Squash and merge» bilan qo'shiladi; commit sarlavhasi PR sarlavhasi (PR-03).",
      },
      {
         id: "MERGE-03",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Risk label'li PR XAVF-03 va PROMOTE-03 bo'yicha merge qilinadi.",
      },
      {
         id: "MERGE-T1",
         daraja: "taqiq",
         tekshiruvchi: "ci",
         matn: "Muallif o'z PR'iga approve bermaydi.",
         manba: ["08#12"],
      },
   ],
   qarorlar: [
      {
         keyin: "MERGE-03",
         savol: "PR risk label'li va `dev`da promote kutayotgan ish bormi?",
         ha: "PROMOTE",
         yoq: null,
      },
   ],
   tugash: ["PR merge qilingan, `dev`da tiketning bitta commit'i", "Tiket ochiq qoladi: u prodga chiqqanda yopiladi (RELIZ-11)"],
   murojaat: "Release owner",
   handbook: ["4", "8"],
};

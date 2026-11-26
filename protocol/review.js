// Review: reviewer PR'ni o'qiydi va qaror beradi.
export default {
   kod: "REVIEW",
   belgilar: ["PR'ga review so'raldi", "PR'ga yangi commit qo'shildi va qayta review so'raldi"],
   ijrochi: "Reviewer (muallif emas)",
   shart: ["PR ochiq, draft emas (PR)"],
   bandlar: [
      {
         id: "REVIEW-01",
         daraja: "tavsiya",
         tekshiruvchi: "release owner",
         matn: "Reviewer so'rovdan keyin bir ish kuni ichida javob beradi: approve, request changes yoki izohlar.",
         manba: ["09#4"],
      },
      {
         id: "REVIEW-02",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Tiketning har qabul mezoni PR'dagi kod yoki test bilan solishtiriladi. Agent yozgan PR odam yozgani kabi to'liq ko'riladi.",
         manba: ["09#2", "09#3"],
      },
      {
         id: "REVIEW-03",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "PR sarlavhasi va matni PR protocol'iga mos (PR-03 … PR-06, PR-T1). Evidence'da tekshiruv o'tgani yozilmagan PR'ga approve berilmaydi.",
         manba: ["10#7"],
      },
      {
         id: "REVIEW-04",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "PR'da `Chetlanish:` qatori bo'lsa, release owner roziligi borligi tekshiriladi (UM-04); rozilik yo'q bo'lsa — `blocking:`.",
      },
      {
         id: "REVIEW-05",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Har izoh `blocking:`, `nit:`, `question:` yoki `suggestion:` prefiksi bilan boshlanadi. Protocol bandi buzilgan bo'lsa, izohda band raqami yoziladi: «blocking: PR-04 — `Tiket:` qatori yo'q».",
         manba: ["09#5"],
      },
      {
         id: "REVIEW-06",
         daraja: "tavsiya",
         tekshiruvchi: "reviewer",
         matn: "`blocking:` izohida muammo va kutilgan natija, iloji bo'lsa tuzatish yo'li yoziladi.",
         manba: ["09#6"],
      },
      {
         id: "REVIEW-07",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Qaror GitHub'dagi «Approve» yoki «Request changes» tugmasi bilan beriladi; «LGTM» kabi izoh qaror hisoblanmaydi.",
         manba: ["09#10", "14#4"],
      },
   ],
   qarorlar: [
      {
         keyin: "REVIEW-02",
         savol: "PR'da XAVF-01 dagi xavfli tur bormi?",
         ha: "XAVF",
         yoq: null,
      },
   ],
   tugash: ["PR'da reviewer qarori tugma bilan berilgan", "Har `blocking:` izohi muallifga yetgan (JAVOB)"],
   murojaat: "Release owner",
   handbook: ["9", "10", "14"],
};

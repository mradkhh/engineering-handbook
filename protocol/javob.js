// Review'ga javob: muallif reviewer izohlariga javob beradi.
export default {
   kod: "JAVOB",
   belgilar: ["PR'ga review izohlari yoki «Request changes» keldi"],
   ijrochi: "PR muallifi",
   shart: ["Review berilgan (REVIEW)"],
   bandlar: [
      {
         id: "JAVOB-01",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Muallif har izohga javob yozadi; tuzatgan bo'lsa, tuzatish commit'ini ko'rsatadi.",
         manba: ["09#7"],
      },
      {
         id: "JAVOB-02",
         daraja: "tavsiya",
         tekshiruvchi: "reviewer",
         matn: "Review boshlangach tuzatishlar yangi commit bilan qo'shiladi; `--amend` va interaktiv rebase ishlatilmaydi.",
         manba: ["09#8"],
      },
      {
         id: "JAVOB-03",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Og'zaki kelishilgan har qaror PR'ga yoziladi.",
         manba: ["09#11"],
      },
      {
         id: "JAVOB-T1",
         daraja: "taqiq",
         tekshiruvchi: "reviewer",
         matn: "`blocking:` thread'ini muallif yopmaydi; uni faqat reviewer yopadi.",
         manba: ["09#9"],
      },
   ],
   qarorlar: [],
   tugash: ["Har izohga javob bor, `blocking:` thread'lar reviewer tomonidan yopilgan", "Qayta review so'ralgan yoki approve berilgan (REVIEW)"],
   murojaat: "Reviewer; kelisha olinmasa — release owner",
   handbook: ["9"],
};

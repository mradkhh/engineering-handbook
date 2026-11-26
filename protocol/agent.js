// Agent bilan ishlash: AI agent tiket ustida ishlaydi.
export default {
   kod: "AGENT",
   belgilar: ["Tiketni AI agentga topshirish kerak", "Agent ishlayotgan sessiyada push, merge, promote yoki release kerak bo'ldi"],
   ijrochi: "Agentni ishlatayotgan dasturchi; agent",
   shart: [
      "Tasdiqlangan tiket bor (YANGI-03)",
      "Agent qaysi protocol bo'yicha ishlayotganini aytgan (UM-01, UM-02)",
   ],
   bandlar: [
      {
         id: "AGENT-01",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Agentga bitta topshiriqda bitta tiket beriladi.",
         manba: ["06#7"],
      },
      {
         id: "AGENT-02",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Agent ishlatayotgan dasturchi har push, merge, promote va release uchun o'sha safar alohida buyruq beradi va buyruqni berishdan oldin natijani ko'radi.",
      },
      {
         id: "AGENT-T1",
         daraja: "taqiq",
         tekshiruvchi: "muallif",
         matn: "Agent odamning shu safargi aniq buyrug'isiz push, merge, promote yoki release qilmaydi; oldingi ruxsat keyingi safarga o'tmaydi.",
         manba: ["04#3", "04#4", "06#3", "06#4"],
      },
   ],
   qarorlar: [],
   tugash: [
      "Agentning ishi tiket branch'ida (COMMIT-T1), diff dasturchi tomonidan o'qilgan (PR-07)",
      "Har push, merge, promote va release o'sha safardagi buyruq bilan qilingan",
   ],
   murojaat: "Agentni ishlatayotgan dasturchi; u — release owner",
   handbook: ["4", "6"],
};

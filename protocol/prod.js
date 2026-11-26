// Prod buzildi: foydalanuvchiga ta'sir qiladigan muammo prod'da.
export default {
   kod: "PROD",
   belgilar: [
      "Prod'da xato: foydalanuvchi ishlay olmayapti yoki noto'g'ri natija ko'ryapti",
      "Prod deploy yiqildi yoki release'dan keyingi smoke o'tmadi",
   ],
   ijrochi: "Muammoni ko'rgan har kim (xabar); qolgan qadamlar — release owner",
   shart: ["Muammo prod'da ekani ko'rilgan"],
   bandlar: [
      {
         id: "PROD-01",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Muammoni ko'rgan odam UM-11 bo'yicha release owner'ga darhol yozadi va qachondan buzilganini qo'shadi.",
      },
      {
         id: "PROD-02",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Release owner foydalanuvchini himoya qiladi: kerak bo'lsa oldingi ishlagan release'ga rollback qiladi (tartibi repo profilida).",
      },
      {
         id: "PROD-03",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Tuzatish yo'lini faqat release owner tanlaydi. Oddiy yo'l mumkin bo'lsa, u ishlatiladi: tuzatish PR'i → `dev` → promote → beta yashil → release (RELIZ-07 dagi hotfix).",
         manba: ["12#5"],
      },
      {
         id: "PROD-04",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Favqulodda hotfix (beta'dan o'tmasdan): tuzatish `main`ga PR orqali, deploy repo profilidagi favqulodda tartib bilan. Bu gate'dan (RELIZ-08) yagona ruxsat etilgan chetlanish; uni faqat release owner yuritadi.",
      },
      {
         id: "PROD-05",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Favqulodda hotfix'dan keyin `main` darhol `dev`ga PR orqali (merge commit bilan) qo'shiladi va promote qilinadi.",
      },
      {
         id: "PROD-06",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Hotfix ham release kabi yoziladi: tag va GitHub Release (RELIZ-10), prod'ga chiqqan tiket yopiladi (RELIZ-11).",
      },
   ],
   qarorlar: [
      {
         keyin: "PROD-03",
         savol: "Oddiy yo'lni kutish mumkinmi (beta orqali)?",
         ha: "RELIZ",
         yoq: null,
      },
   ],
   tugash: [
      "Prod ishlayapti: rollback yoki tuzatish deploy qilingan, prod deploy statusi yashil",
      "Favqulodda hotfix bo'lsa, `main` `dev`ga qo'shilgan va promote qilingan",
      "Qisqa tahlil yozilgan (UM-08)",
   ],
   murojaat: "Release owner",
   handbook: ["3", "12"],
};

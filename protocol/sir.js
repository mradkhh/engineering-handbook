// Sir oshkor bo'ldi: kalit, parol yoki token commit'ga tushdi.
export default {
   kod: "SIR",
   belgilar: ["Kalit, parol yoki token commit'ga tushdi", "Sir PR, log yoki boshqa ochiq joyda ko'rindi"],
   ijrochi: "Sirni ko'rgan yoki commit qilgan odam; serverlar — release owner",
   shart: ["Qaysi sir va u qayerda ko'ringani ma'lum"],
   bandlar: [
      {
         id: "SIR-01",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         manba: ["07#4"],
         matn: "Sir push qilingan yoki boshqa joyda ko'ringan bo'lsa, u oshkor hisoblanadi va tarixdan to'liq o'chirib bo'lmaydi: birinchi qadam — kalitni xizmatning o'zida bekor qilish va yangisini yaratish.",
      },
      {
         id: "SIR-02",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Release owner'ga UM-11 bo'yicha aytiladi: qaysi kalit, qayerda ko'ringan, bekor qilinganmi.",
      },
      {
         id: "SIR-03",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Yangi kalit serverlarga qo'yiladi; ilova yangi kalit bilan ishlashi tekshiriladi.",
      },
      {
         id: "SIR-04",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Sir koddan oddiy PR bilan olib tashlanadi va env kalitiga o'tkaziladi (XAVF-08); tarix qayta yozilmaydi.",
      },
      {
         id: "SIR-05",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Sir faqat push qilinmagan o'z commit'ingizda bo'lsa, commit o'z feature branch'ingizda tuzatiladi va kalitni almashtirish shart emas.",
      },
   ],
   qarorlar: [],
   tugash: [
      "Eski kalit bekor qilingan, yangisi serverlarda ishlayapti",
      "Sir kodda yo'q",
      "Qisqa tahlil yozilgan (UM-08)",
   ],
   murojaat: "Release owner",
   handbook: ["11", "12"],
};

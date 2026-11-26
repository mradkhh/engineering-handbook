// Yangi ish: g'oya, so'rov yoki xato xabari tiketga aylanadi.
export default {
   kod: "YANGI",
   belgilar: [
      "Yangi g'oya, so'rov yoki foydalanuvchidan xato xabari keldi",
      "Kod yozish kerak, lekin qabul mezonli issue yo'q",
   ],
   ijrochi: "Issue yozuvchi (har kim); tasdiq — release owner",
   shart: ["Ish nima uchun kerakligi bir-ikki gapda aytiladi"],
   bandlar: [
      {
         id: "YANGI-01",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Kod yozish issue'dan boshlanadi; issue'da qabul mezonlari bor — tekshirsa bo'ladigan shartlar ro'yxati.",
         manba: ["05#1"],
      },
      {
         id: "YANGI-02",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Yozishdan oldin ochiq issue'lar qidiriladi. Foydalanuvchining xato xabari dublikat bo'lmaydi: xabarning o'zi tiket yoki spec bo'ladi, mavjud issue bo'lsa unga izoh bo'lib qo'shiladi.",
      },
      {
         id: "YANGI-03",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Release owner yozmagan issue avval triage'da turadi. Tasdiq — release owner'ning izohi va tasdiq label'i (`ready-for-*`, nomlari repo profilida); label'ni faqat release owner qo'yadi. Tasdiqsiz issue bo'yicha kod yozilmaydi.",
         manba: ["04#5"],
      },
      {
         id: "YANGI-04",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Qarorni odam qabul qiladi: agent faktni o'zi topadi, lekin qarorni so'raydi.",
         manba: ["06#1"],
      },
      {
         id: "YANGI-05",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Qaror savollari mantiq darajasida qoladi (nima va nega); qanday yozilishi — keyin.",
         manba: ["06#2"],
      },
   ],
   qarorlar: [
      {
         keyin: "YANGI-05",
         savol: "Ish bitta PR'ga sig'maydimi (PR-08) yoki bir nechta mustaqil qadamdanmi?",
         ha: "SPEC",
         yoq: null,
      },
   ],
   tugash: ["Qabul mezonli issue bor, `ready-for-*` label'i bilan", "Katta ish bo'lsa spec va tiketlar yozilgan (SPEC)"],
   murojaat: "Release owner",
   handbook: ["4", "5", "6"],
};

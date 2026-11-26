// Protocol yoki profilni o'zgartirish: qoida qo'shiladi, o'zgaradi yoki olib tashlanadi.
export default {
   kod: "QOIDA",
   belgilar: [
      "Yozilmagan qoida sezildi yoki band ishlamayapti (UM-03, UM-09)",
      "Favqulodda protocol'dan keyingi tahlil o'zgarish taklif qildi (UM-08)",
      "Repo profili qiymati yoki lokal bandi o'zgarishi kerak",
   ],
   ijrochi: "Taklif — har kim; merge — release owner",
   shart: ["O'zgarish issue'si bor: protocol uchun kitob repo'sida, profil uchun loyiha repo'sida (YANGI)"],
   bandlar: [
      {
         id: "QOIDA-01",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Protocol, kitob va repo profili faqat PR bilan o'zgaradi; kitob PR'ini release owner merge qiladi.",
      },
      {
         id: "QOIDA-02",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Versiya semver bo'yicha: band ma'nosi o'zgarsa yoki band olib tashlansa — major, yangi band yoki karta — minor, matn tuzatish — patch. Har o'zgarish CHANGELOG'ga yoziladi.",
      },
      {
         id: "QOIDA-03",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "O'zgarish PR'ida tekshiriladi: yozilmagan qoidadan kelgan band issue'ga havola qiladi (UM-03); ikkinchi chetlanishdan kelgan o'zgarish o'sha issue'ni yopadi (UM-09); profil bandlari UM-07 shaklida; band raqamlari UM-10 bo'yicha.",
      },
      {
         id: "QOIDA-04",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Profilning yuqorisida u mos keladigan kitob versiyasi yoziladi; kitobda qoida o'zgarsa, profil shu PR'da yoki darhol keyingi PR'da yangilanadi.",
         manba: ["A#4", "A#5"],
      },
      {
         id: "QOIDA-05",
         daraja: "tavsiya",
         tekshiruvchi: "reviewer",
         matn: "Profilning asosiy fayli repo ildizidagi agent yo'riqnomasidan bitta havola bilan topiladi.",
         manba: ["A#3"],
      },
   ],
   qarorlar: [],
   tugash: ["O'zgarish PR bilan merge qilingan, CHANGELOG va versiya yangilangan", "Bog'liq repo profillari mos versiyaga o'tkazilgan yoki issue'si ochilgan"],
   murojaat: "Release owner",
   handbook: ["1", "A"],
};

// Protocol ro'yxati: har protocol'ning o'zgarmas kodi, nomi va guruhi.
// Karta `<kod kichik harfda>.js` faylida. Fayli yo'q protocol — rejalashtirilgan («yoziladi»).
// Kod hech qachon o'zgartirilmaydi va qayta ishlatilmaydi: band raqamlari shu koddan boshlanadi.

export const protokollar = [
   { kod: "UM", nom: "Umumiy qoidalar", guruh: "umumiy" },

   { kod: "YANGI", nom: "Yangi ish", guruh: "ish-oqimi" },
   { kod: "SPEC", nom: "Spec va tiketlar", guruh: "ish-oqimi" },
   { kod: "BOSH", nom: "Tiketni boshlash", guruh: "ish-oqimi" },
   { kod: "COMMIT", nom: "Kod va commit", guruh: "ish-oqimi" },
   { kod: "AGENT", nom: "Agent bilan ishlash", guruh: "ish-oqimi" },
   { kod: "MOS", nom: "Dev bilan moslash", guruh: "ish-oqimi" },
   { kod: "PUSH", nom: "Push", guruh: "ish-oqimi" },
   { kod: "PR", nom: "PR ochish", guruh: "ish-oqimi" },
   { kod: "REVIEW", nom: "Review", guruh: "ish-oqimi" },
   { kod: "JAVOB", nom: "Review'ga javob", guruh: "ish-oqimi" },
   { kod: "MERGE", nom: "Dev'ga merge", guruh: "ish-oqimi" },
   { kod: "TOZA", nom: "Tozalash", guruh: "ish-oqimi" },

   { kod: "XAVF", nom: "Xavfli o'zgarish", guruh: "chiqarish" },
   { kod: "PROMOTE", nom: "Promote", guruh: "chiqarish" },
   { kod: "RELIZ", nom: "Release", guruh: "chiqarish" },

   { kod: "BETA", nom: "Beta qizil", guruh: "favqulodda" },
   { kod: "PROD", nom: "Prod buzildi", guruh: "favqulodda" },
   { kod: "REVERT", nom: "Revert", guruh: "favqulodda" },
   { kod: "SIR", nom: "Sir oshkor bo'ldi", guruh: "favqulodda" },
   { kod: "GIT", nom: "Lokal git xatosi", guruh: "favqulodda" },

   { kod: "QOIDA", nom: "Protocol yoki profilni o'zgartirish", guruh: "boshqaruv" },
];

// v1.0.0 qoidasi (`v1-qoidalar.json` kaliti) → protocol'ga ko'chmagani sababi.
export const olibTashlandi = {
   "10#4": "Protocol'da «ixtiyoriy» daraja yo'q. Faqat hujjat o'zgargan push PUSH-T2 ga kirmaydi; uning tartibini repo profili yozadi.",
};

// true bo'lganda v1.0.0 dagi har qoida bandga ko'chgan yoki shu yerda sababi bilan yozilgan bo'lishi shart.
export const kochishToliq = false;

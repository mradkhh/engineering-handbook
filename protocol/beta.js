// Beta qizil: promote'dan keyin beta'ning CI yoki deploy'i muvaffaqiyatsiz tugadi.
export default {
   kod: "BETA",
   belgilar: ["Beta deploy statusi qizil (promote'dan keyin CI yoki deploy yiqildi)", "Beta serverda promote'dan keyin ish buzildi"],
   ijrochi: "Release owner; tuzatishni sababchi tiket muallifi yozadi",
   shart: ["Qizil commit va oxirgi promote qadami ma'lum (PROMOTE)"],
   bandlar: [
      {
         id: "BETA-01",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Qizil beta o'sha kuni yashil bo'ladi: tuzatish yoki revert bilan. Qizil beta yashil bo'lguncha keyingi promote va release yo'q.",
         manba: ["05#5", "10#8", "12#3"],
      },
      {
         id: "BETA-02",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "CI log'idan yiqilgan qadam va sababchi commit topiladi; UM-11 bo'yicha xabar beriladi va sababchi tiket muallifiga aytiladi.",
      },
      {
         id: "BETA-03",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Tuzatish bir soatdan kam vaqt olsa, tuzatish tiketi (REVERT-05 dagi kabi: o'sha spec ostida yoki `Bog'liq: #N`) va PR ochiladi; aks holda sababchi commit revert qilinadi.",
      },
      {
         id: "BETA-04",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Tuzatish ham, revert ham oddiy yo'ldan yuradi: PR, `dev`ga merge, promote; `beta`ga to'g'ridan-to'g'ri tuzatish taqiq (PROMOTE-T1).",
      },
   ],
   qarorlar: [
      {
         keyin: "BETA-03",
         savol: "Tuzatish bir soatdan ko'p vaqt oladimi?",
         ha: "REVERT",
         yoq: null,
      },
   ],
   tugash: ["Beta deploy statusi yashil", "Qisqa tahlil yozilgan (UM-08)"],
   murojaat: "Release owner",
   handbook: ["10", "12"],
};

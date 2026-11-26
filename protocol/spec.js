// Spec va tiketlar: bitta PR'ga sig'maydigan ish nomlangan spec va tiketlarga bo'linadi.
export default {
   kod: "SPEC",
   belgilar: ["Ish bitta PR'ga sig'maydi yoki bir nechta mustaqil qadamdan iborat"],
   ijrochi: "Spec muallifi (odam yoki agent); tasdiq — release owner",
   shart: ["Ish qarorlari kelishilgan (YANGI-04)"],
   bandlar: [
      {
         id: "SPEC-01",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Faqat ikki daraja: spec (ota issue, spec label'i — nomi repo profilida) va uning tiketlari. Bitta PR'ga sig'adigan ish (PR-08) — spec'siz yakka tiket.",
      },
      {
         id: "SPEC-02",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Spec 1–3 so'zli qisqa nom oladi; sarlavha `<Spec nomi>: <nima qilinadi>`. Tiket sarlavhasi `<Spec nomi>: …`, yakka tiketniki `<Soha>: …`. Sarlavhada raqam va `3/6` kabi tartib yo'q.",
      },
      {
         id: "SPEC-03",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Har tiket spec'ning sub-issue'si; tiketlar orasidagi bog'liqlik «blocked by» bog'lanishi bilan.",
      },
   ],
   qarorlar: [],
   tugash: ["Spec label'i va qisqa nomi bilan, tiketlari uning sub-issue'lari", "Spec va tiketlar tasdiqlangan (YANGI-03)"],
   murojaat: "Release owner",
   handbook: ["5", "6"],
};

// Push: tiket branch'i remote'ga yuboriladi.
export default {
   kod: "PUSH",
   belgilar: ["Tiket branch'idagi commit'larni remote'ga push qilish kerak"],
   ijrochi: "Tiket branch'i muallifi (agent — AGENT-T1 bo'yicha buyruq bilan)",
   shart: ["O'zgarishlar tiket branch'ida commit qilingan (COMMIT)"],
   bandlar: [
      {
         id: "PUSH-01",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Ish paytida faqat o'zgargan qismning testlari yuritiladi; to'liq tekshiruv push'da.",
         manba: ["10#2"],
      },
      {
         id: "PUSH-02",
         daraja: "majburiy",
         tekshiruvchi: "hook",
         matn: "Push'dan oldin lokal tekshiruv o'tadi: lint, typecheck va testlar (pre-push hook'i; buyrug'i repo profilida).",
         manba: ["05#2"],
      },
      {
         id: "PUSH-03",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Tekshiruv yiqilsa, xato tuzatiladi va yangi commit bilan qayta push qilinadi.",
      },
      {
         id: "PUSH-T1",
         daraja: "taqiq",
         tekshiruvchi: "reviewer",
         matn: "Hook o'chirilmaydi va uning skripti lokal o'zgartirilmaydi; hook'dagi xato alohida PR bilan tuzatiladi.",
         manba: ["10#1"],
      },
      {
         id: "PUSH-T2",
         daraja: "taqiq",
         tekshiruvchi: "reviewer",
         matn: "Kod o'zgargan commit yoki push'da `--no-verify` ishlatilmaydi.",
         manba: ["10#3"],
      },
   ],
   qarorlar: [
      {
         keyin: "PUSH-03",
         savol: "Push «non-fast-forward» bilan rad etildimi yoki tarix chalkashdimi?",
         ha: "GIT",
         yoq: null,
      },
   ],
   tugash: ["Branch push qilingan, pre-push tekshiruvi o'tgan", "PR yo'q bo'lsa — PR ochiladi (PR)"],
   murojaat: "Release owner",
   handbook: ["5", "10"],
};

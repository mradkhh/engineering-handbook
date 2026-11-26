// Promote: `dev`da yig'ilgan ish `beta`ga (sinov serveri) chiqariladi.
export default {
   kod: "PROMOTE",
   belgilar: [
      "`dev`da `beta`da yo'q commit'lar bor va ularni sinov serveriga chiqarish vaqti keldi",
      "Risk label'li PR `dev`ga merge qilinishi kerak",
   ],
   ijrochi: "Release owner",
   shart: ["`beta`ning oxirgi deploy'i yashil yoki qizil sababi ma'lum (BETA)", "Freeze yo'q yoki commit'lar joriy release'ning tuzatishi (RELIZ-02)"],
   bandlar: [
      {
         id: "PROMOTE-01",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Promote'dan oldin navbat ko'riladi: `dev`dagi har commit qaysi tiket va spec'ga tegishli, qaysisida risk bor (buyruq repo profilida). Tiketsiz commit navbatda alohida ko'rinadi.",
      },
      {
         id: "PROMOTE-02",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Navbat qadamlarga bo'linadi: risksiz tiketlar bitta qadamda; bitta spec'ning riskli tiketlari — o'z qadami, unga boshqa spec yoki oddiy tiket qo'shilmaydi; spec'siz riskli tiket — yolg'iz. Risk label'i yo'q, lekin navbat risk topgan commit ham riskli hisoblanadi.",
         manba: ["11#5"],
      },
      {
         id: "PROMOTE-03",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Risk label'li PR `dev`ga merge qilinishidan oldin `dev`da kutib turgan ish promote qilinadi; keyin PR (yoki spec'ning riskli PR'lari ketma-ket) merge qilinib, darhol promote qilinadi. Shunda riskli guruh orasiga boshqa ish tushmaydi.",
      },
      {
         id: "PROMOTE-04",
         daraja: "majburiy",
         tekshiruvchi: "hook",
         matn: "`beta` qadamning oxirgi commit'iga fast-forward qilinadi (`git merge --ff-only <commit>`) va push qilinadi. Bitta qadam — bitta push, bitta deploy.",
      },
      {
         id: "PROMOTE-05",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Keyingi qadam oldingisining beta deploy statusi yashil bo'lgach qilinadi (status nomi repo profilida).",
      },
      {
         id: "PROMOTE-06",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Riskli qadamdan keyin release owner o'zgarishni beta'da o'zi tekshiradi.",
      },
      {
         id: "PROMOTE-07",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Har tiket muallifi o'z ishini beta'da tekshiradi va tiketga `beta-ok` label'ini qo'yadi.",
      },
      {
         id: "PROMOTE-08",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Promote jamoaga e'lon qilinadi: spec nomi va tiket raqamlari bilan («<Spec nomi> #P: #N, #M»), faqat raqam emas.",
      },
      {
         id: "PROMOTE-T1",
         daraja: "taqiq",
         tekshiruvchi: "hook",
         matn: "`dev`da yo'q commit `beta`ga kirmaydi: `beta`ga to'g'ridan-to'g'ri commit qilinmaydi, beta'ning tuzatishi ham `dev` va promote orqali boradi.",
         manba: ["10#9", "12#4"],
      },
      {
         id: "PROMOTE-T2",
         daraja: "taqiq",
         tekshiruvchi: "release owner",
         matn: "CI run qo'lda bekor qilinmaydi.",
         manba: ["10#5"],
      },
   ],
   qarorlar: [
      {
         keyin: "PROMOTE-05",
         savol: "Beta deploy statusi qizil bo'ldimi?",
         ha: "BETA",
         yoq: null,
      },
   ],
   tugash: [
      "Navbatdagi har qadam push qilingan va oxirgi commit'da beta deploy statusi yashil",
      "Promote e'lon qilingan",
   ],
   murojaat: "Release owner",
   handbook: ["3", "11"],
};

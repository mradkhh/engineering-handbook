// Lokal git xatosi: commit noto'g'ri branch'da, ish yo'qoldi, pull rad etildi yoki xato push.
export default {
   kod: "GIT",
   belgilar: [
      "Commit noto'g'ri branch'da (local `dev` yoki boshqa tiketning branch'i)",
      "Rebase buzildi yoki commit yo'qoldi",
      "`git pull` «Not possible to fast-forward» bilan to'xtadi",
      "`dev`, `beta` yoki `main`ga tasodifan push qilindi",
   ],
   ijrochi: "Xatoga yo'l qo'ygan dasturchi yoki agent",
   shart: ["`git status` ko'rilgan: commit qilinmagan o'zgarish qayerda ekani ma'lum"],
   bandlar: [
      {
         id: "GIT-01",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Branch tarixini o'zgartiradigan har qadamdan oldin hozirgi holat yangi branch'ga saqlanadi : `git branch rescue-<tiket raqami> <hash>`.",
      },
      {
         id: "GIT-02",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Push qilinmagan commit noto'g'ri branch'da: undan to'g'ri tiket branch'i ochiladi (`git switch -c <N>-<slug>`); boshqa tiket branch'iga tushgan commit to'g'ri branch'ga cherry-pick qilinib, noto'g'ri branch'dan olib tashlanadi (push qilingan bo'lsa — GIT-06). Local `dev` remote holatiga `dev`da turmagan holda qaytariladi: `git branch -f dev origin/dev`. Remote'dagi himoyalangan branch'ga tegilmaydi.",
      },
      {
         id: "GIT-03",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Rebase tugamagan bo'lsa `git rebase --abort`; tugagan yoki commit yo'qolgan bo'lsa `git reflog`dan eski commit topilib, GIT-01 bo'yicha saqlanadi, `git log` bilan tekshiriladi va ish shu branch'dan davom etadi (`git switch rescue-<tiket raqami>`).",
      },
      {
         id: "GIT-04",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Pull rad etildi: feature branch'da `git fetch origin` va `git rebase origin/dev`; local `dev` yoki `beta`da — GIT-02.",
      },
      {
         id: "GIT-05",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Himoyalangan branch'ga xato push: boshqa hech narsa qilinmaydi, UM-11 bo'yicha xabar beriladi; commit qoladimi yoki revert qilinadimi — u qaror qiladi.",
      },
      {
         id: "GIT-06",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Push qilingan feature branch'ning tarixi o'zgargan bo'lsa, keyingi push faqat `--force-with-lease --force-if-includes` bilan; `git push -f` va `--force` ishlatilmaydi.",
         manba: ["07#8", "07#9"],
      },
   ],
   qarorlar: [
      {
         keyin: "GIT-05",
         savol: "Release owner commit'ni qaytarishga qaror qildimi?",
         ha: "REVERT",
         yoq: null,
      },
   ],
   tugash: [
      "Ish to'g'ri branch'da, hech narsa yo'qolmagan",
      "Local `dev` va `beta` remote bilan bir xil",
      "Qisqa tahlil yozilgan (UM-08)",
   ],
   murojaat: "Release owner",
   handbook: ["7", "12"],
};

// Revert: himoyalangan branch'ga kirgan xato commit qaytariladi.
export default {
   kod: "REVERT",
   belgilar: [
      "`dev`, `beta` yoki `main`ga xato commit kirgan va uni qaytarish kerak",
      "Beta qizil va tuzatish bir soatdan ko'p vaqt oladi (BETA)",
   ],
   ijrochi: "Sababchi tiket muallifi yoki release owner",
   shart: ["Xato commit hash'i va u tegishli tiket ma'lum", "Release owner'ga aytilgan (UM-11)"],
   bandlar: [
      {
         id: "REVERT-01",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Himoyalangan branch'dagi xato faqat revert bilan qaytariladi (UM-T2). Revert asl tiket bilan: integration branch'dan `<N>-revert-<qisqa-nom>` branch, `N` — xato commit'ning tiket raqami.",
      },
      {
         id: "REVERT-02",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Commit `git revert <hash>` bilan yaratiladi (squash-merge bo'lgan PR — bitta revert). PR sarlavhasi PR-03 shaklida, turi `revert`: `revert(<scope>): <asl sarlavha> (#N)`.",
      },
      {
         id: "REVERT-03",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Revert PR orqali `dev`ga boradi (PR protocol'i); matnida `Tiket: #N` va revert sababi. Keyin promote qilinadi.",
      },
      {
         id: "REVERT-04",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Revert merge bo'lgach asl tiket ochiq turadi (yopilgan bo'lsa, izoh bilan qayta ochiladi), «Tayyor» bosqichiga qaytadi va `beta-ok` label'i olinadi.",
      },
      {
         id: "REVERT-05",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Xatoning tuzatishi yangi tiket: spec bo'lsa o'sha spec ostida, yakka tiket bo'lsa yangi yakka tiket matnida `Bog'liq: #N`.",
      },
   ],
   qarorlar: [],
   tugash: [
      "Revert `dev`da va promote qilingan; beta deploy statusi yashil",
      "Asl tiket «Tayyor»da, `beta-ok`siz; tuzatish tiketi ochilgan",
      "Qisqa tahlil yozilgan (UM-08)",
   ],
   murojaat: "Release owner",
   handbook: ["12"],
};

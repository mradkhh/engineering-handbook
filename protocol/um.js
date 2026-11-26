// Umumiy qoidalar: har protocol bilan birga amal qiladi.
export default {
   kod: "UM",
   bandlar: [
      {
         id: "UM-01",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Ishni boshlashdan oldin saralash jadvalidan protocol topiladi. Ijrochi (odam yoki agent) qaysi protocol bo'yicha ishlayotganini aytadi: «PR protocol'i bo'yicha ishlayman».",
      },
      {
         id: "UM-02",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Hech bir protocol mos kelmasa, ish to'xtatiladi va release owner'dan so'raladi.",
      },
      {
         id: "UM-03",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Protocol'da yo'q narsa qoida emas: uni hech kimdan talab qilib bo'lmaydi, u faqat maslahat. Sezilgan yozilmagan qoida protocol repo'sida issue bo'ladi va band bo'lib qo'shiladi.",
      },
      {
         id: "UM-04",
         daraja: "majburiy",
         tekshiruvchi: "reviewer",
         matn: "Majburiy banddan chetga chiqishdan oldin tiket yoki PR matniga `Chetlanish: <band> — <sabab>` qatori yoziladi va release owner izoh bilan rozilik beradi. Release owner'ning o'z chetlanishi ham shu qator bilan yoziladi.",
      },
      {
         id: "UM-05",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Tavsiya bandi sababsiz o'tkazib yuborilishi mumkin. Sabab muhim bo'lsa, PR matnida bir qator bilan yoziladi.",
      },
      {
         id: "UM-T1",
         daraja: "taqiq",
         tekshiruvchi: "reviewer",
         matn: "Taqiq bandidan chetlanish yo'q: release owner uchun ham, favqulodda holatda ham. Taqiqni faqat protocol'ni o'zgartiradigan PR olib tashlaydi.",
      },
      {
         id: "UM-T2",
         daraja: "taqiq",
         tekshiruvchi: "hook",
         matn: "Himoyalangan branch'lar (`dev`, `beta`, `main`; ro'yxati repo profilida) rebase yoki force-push qilinmaydi va ulardagi commit `git reset` bilan o'chirilmaydi. Ularga faqat release owner push qiladi.",
         manba: ["03#1", "03#2"],
      },
      {
         id: "UM-06",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Skill, shablon yoki boshqa ko'rsatma protocol bandiga zid bo'lsa, protocol bandi bajariladi va ziddiyat aytiladi.",
      },
      {
         id: "UM-07",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Har repo'da profil bor va repo'ning agent yo'riqnomasi unga havola qiladi. Profil protocol bandiga qiymat beradi yoki uni qattiqlashtiradi; bandni bo'shashtirmaydi. Profilning o'z bandlari `<REPO>-<KOD>-NN` raqamini oladi.",
         manba: ["01#3", "A#1", "A#2"],
      },
      {
         id: "UM-08",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Favqulodda guruhdagi protocol bajarilgach, qisqa tahlil yoziladi: protocol'ga o'zgarish taklifi yoki «o'zgarish kerak emas».",
      },
      {
         id: "UM-09",
         daraja: "majburiy",
         tekshiruvchi: "release owner",
         matn: "Bir band bo'yicha ikkinchi chetlanish yozilganda, shu band uchun protocol repo'sida issue ochiladi.",
      },
      {
         id: "UM-10",
         daraja: "majburiy",
         tekshiruvchi: "skript",
         matn: "Band raqami o'zgarmaydi va qayta ishlatilmaydi. Olib tashlangan band raqami kartaning o'chirilganlar ro'yxatiga yoziladi.",
      },
   ],
};

// Kitob tuzilmasi: boblar tartibi va holati. `file` bo'lmagan bob hali yozilmagan.
export const book = {
   title: "Engineering Handbook",
   subtitle: "Git, ish oqimi va atamalar reglamenti",
   version: "v2.0.0",
   edition: "Ikkinchi nashr",
   date: "2026-11-26",
   author: "mradkhh",
   license: "CC BY 4.0",
   // Protocol (ikkinchi kitob) kitob bilan bitta versiyani oladi.
   protocolVersion: "v2.0.0",
   protocolEdition: "Birinchi nashr",
};

export const chapters = [
   { n: "1", slug: "oqish", title: "Kitobni qanday o'qish kerak", file: "01-kitobni-oqish.mdx" },
   { n: "2", slug: "git-asoslari", title: "Git asoslari", file: "02-git-asoslari.mdx" },
   { n: "3", slug: "branch-modeli", title: "Branch modeli va muhitlar", file: "03-branch-modeli.mdx" },
   { n: "4", slug: "rollar", title: "Rollar", file: "04-rollar.mdx" },
   { n: "5", slug: "ish-oqimi", title: "Ish oqimi: issue'dan release'gacha", file: "05-ish-oqimi.mdx" },
   { n: "6", slug: "agent-oqimi", title: "Agent bilan ishlash oqimi", file: "06-agent-oqimi.mdx" },
   {
      n: "7",
      slug: "kundalik",
      title: "Kundalik git amallari",
      file: "07-kundalik-git-amallari.mdx",
   },
   { n: "8", slug: "qoidalar", title: "Commit, branch va PR qoidalari", file: "08-commit-branch-pr.mdx" },
   { n: "9", slug: "review", title: "Review qoidalari", file: "09-review.mdx" },
   { n: "10", slug: "tekshiruvlar", title: "Tekshiruvlar: hook'lar va CI", file: "10-tekshiruvlar.mdx" },
   { n: "11", slug: "xavfli", title: "Xavfli o'zgarishlar", file: "11-xavfli-ozgarishlar.mdx" },
   { n: "12", slug: "muammo", title: "Muammo bo'lganda", file: "12-muammo-bolganda.mdx" },
   { n: "13", slug: "lugat", title: "Lug'at", file: "13-lugat.mdx" },
   { n: "14", slug: "suhbat", title: "Suhbat namunalari", file: "14-suhbat-namunalari.mdx" },
   { n: "15", slug: "eslatma", title: "Bir sahifalik eslatma", file: "15-eslatma.mdx" },
   { n: "A", slug: "ilova-a", title: "Repo profili shabloni", file: "A-repo-profili.mdx" },
];

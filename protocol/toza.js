// Tozalash: merge'dan keyin lokal branch va worktree o'chiriladi.
export default {
   kod: "TOZA",
   belgilar: ["PR `dev`ga merge bo'ldi, lokal branch yoki worktree qoldi"],
   ijrochi: "PR muallifi",
   shart: ["PR merge bo'lgan (MERGE)"],
   bandlar: [
      {
         id: "TOZA-01",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "O'chirishdan oldin tekshiriladi: PR GitHub'da merge qilingan va uning oxirgi commit'i lokal branch uchi bilan bir xil (`gh pr view <PR> --json state,headRefOid` va `git rev-parse <branch>`).",
      },
      {
         id: "TOZA-02",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Worktree `git worktree remove <papka>` bilan o'chiriladi, `--force`siz; commit qilinmagan o'zgarish bo'lsa, u avval saqlanadi.",
      },
      {
         id: "TOZA-03",
         daraja: "majburiy",
         tekshiruvchi: "muallif",
         matn: "Lokal branch `git branch -d <N>-<slug>` bilan o'chiriladi. Squash-merge'dan keyin `-d` rad etsa va TOZA-01 o'tgan bo'lsa, odam uni `git branch -D` bilan o'chiradi.",
      },
      {
         id: "TOZA-04",
         daraja: "tavsiya",
         tekshiruvchi: "muallif",
         matn: "Remote branch'ning lokal izi `git fetch --prune` (yoki `fetch.prune`) bilan o'chadi.",
      },
      {
         id: "TOZA-T1",
         daraja: "taqiq",
         tekshiruvchi: "hook",
         matn: "Agent branch'ni `git branch -D` bilan o'chirmaydi; buni odam qiladi.",
      },
   ],
   qarorlar: [],
   tugash: ["Merge bo'lgan tiketning lokal branch'i va worktree'si yo'q"],
   murojaat: "Release owner",
   handbook: ["5", "7"],
};

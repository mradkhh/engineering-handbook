// Diagrammalar SVG'da. Ranglar CSS o'zgaruvchilaridan olinadi: yorug', qorong'i va chop etishda ishlaydi.

function Node({ x, y, label, kind = "dev", ghost = false }) {
   return (
      <g className={`dg-node dg-node--${kind}${ghost ? " dg-node--ghost" : ""}`}>
         <circle cx={x} cy={y} r="15" />
         <text x={x} y={y + 4.5} textAnchor="middle">
            {label}
         </text>
      </g>
   );
}

function Edge({ x1, y1, x2, y2, kind = "dev", dashed = false }) {
   return (
      <line
         className={`dg-edge dg-edge--${kind}${dashed ? " dg-edge--dashed" : ""}`}
         x1={x1}
         y1={y1}
         x2={x2}
         y2={y2}
      />
   );
}

function Ref({ x, y, children, kind = "dev", anchor = "start" }) {
   return (
      <text className={`dg-ref dg-ref--${kind}`} x={x} y={y} textAnchor={anchor}>
         {children}
      </text>
   );
}

export function RebaseDiagram() {
   return (
      <svg viewBox="0 0 640 300" role="img" aria-label="Rebase'dan oldin va keyin commit'lar">
         <text className="dg-panel" x="20" y="26">
            Oldin
         </text>
         <Edge x1={60} y1={70} x2={300} y2={70} />
         <Edge x1={140} y1={70} x2={220} y2={128} kind="mine" />
         <Edge x1={220} y1={128} x2={300} y2={128} kind="mine" />
         <Node x={60} y={70} label="A" />
         <Node x={140} y={70} label="B" />
         <Node x={220} y={70} label="C" />
         <Node x={300} y={70} label="D" />
         <Node x={220} y={128} label="X" kind="mine" />
         <Node x={300} y={128} label="Y" kind="mine" />
         <Ref x={326} y={75}>
            origin/dev
         </Ref>
         <Ref x={326} y={133} kind="mine">
            172-notification-recipients
         </Ref>

         <line className="dg-divider" x1="20" y1="158" x2="620" y2="158" />

         <text className="dg-panel" x="20" y="186">
            Keyin: git rebase origin/dev
         </text>
         <Edge x1={60} y1={232} x2={300} y2={232} />
         <Edge x1={300} y1={232} x2={460} y2={232} kind="mine" />
         <Node x={60} y={232} label="A" />
         <Node x={140} y={232} label="B" />
         <Node x={220} y={232} label="C" />
         <Node x={300} y={232} label="D" />
         <Node x={380} y={232} label="X′" kind="mine" />
         <Node x={460} y={232} label="Y′" kind="mine" />
         <Ref x={300} y={268} anchor="middle">
            origin/dev
         </Ref>
         <Ref x={460} y={268} anchor="middle" kind="mine">
            172-notification-recipients
         </Ref>
      </svg>
   );
}

function Box({ x, y, w, h, title, lines, kind = "neutral" }) {
   return (
      <g className={`dg-box dg-box--${kind}`}>
         <rect x={x} y={y} width={w} height={h} rx="10" />
         <text className="dg-box__title" x={x + w / 2} y={y + 26} textAnchor="middle">
            {title}
         </text>
         {lines.map((l, i) => (
            <text
               key={l}
               className="dg-box__line"
               x={x + w / 2}
               y={y + 52 + i * 20}
               textAnchor="middle"
            >
               {l}
            </text>
         ))}
      </g>
   );
}

function Arrow({ x1, y, x2, label }) {
   return (
      <g className="dg-arrow">
         <line x1={x1} y1={y} x2={x2 - 8} y2={y} />
         <path d={`M ${x2 - 10} ${y - 6} L ${x2} ${y} L ${x2 - 10} ${y + 6} Z`} />
         <text x={(x1 + x2) / 2} y={y - 10} textAnchor="middle">
            {label}
         </text>
      </g>
   );
}

export function FetchPullDiagram() {
   return (
      <svg viewBox="0 0 640 230" role="img" aria-label="fetch va pull farqi">
         <Box x={10} y={20} w={170} h={100} title="GitHub" lines={["dev", "(remote'da)"]} />
         <Box
            x={235}
            y={20}
            w={170}
            h={100}
            title="Kompyuteringiz"
            lines={["origin/dev", "(remote-tracking)"]}
            kind="track"
         />
         <Box
            x={460}
            y={20}
            w={170}
            h={100}
            title="Kompyuteringiz"
            lines={["dev", "(local branch)"]}
            kind="mine"
         />
         <Arrow x1={180} x2={235} y={70} label="fetch" />
         <Arrow x1={405} x2={460} y={70} label="ff" />
         <g className="dg-brace">
            <path d="M 180 150 L 180 160 L 460 160 L 460 150" />
            <text x="320" y="186" textAnchor="middle">
               pull = fetch + fast-forward
            </text>
            <text className="dg-brace__sub" x="320" y="208" textAnchor="middle">
               (pull.ff=only: tarix ajralgan bo'lsa, pull to'xtaydi)
            </text>
         </g>
      </svg>
   );
}

export function WorktreeDiagram() {
   const rows = [
      { y: 30, path: "crm/", branch: "dev" },
      { y: 95, path: "worktrees/172-notification-recipients/", branch: "172-notification-recipients" },
      { y: 160, path: "worktrees/175-handoff-recipients/", branch: "175-handoff-recipients" },
   ];
   return (
      <svg viewBox="0 0 640 215" role="img" aria-label="Bitta repo, uchta worktree">
         <Box x={10} y={65} w={150} h={80} title=".git" lines={["bitta repo"]} kind="track" />
         {rows.map((r) => (
            <g key={r.path}>
               <path className="dg-link" d={`M 160 105 C 200 105, 200 ${r.y + 25}, 240 ${r.y + 25}`} />
               <g className="dg-box dg-box--mine">
                  <rect x="240" y={r.y} width="390" height="50" rx="8" />
                  <text className="dg-box__mono" x="256" y={r.y + 21}>
                     {r.path}
                  </text>
                  <text className="dg-box__line dg-box__line--left" x="256" y={r.y + 40}>
                     branch: {r.branch}
                  </text>
               </g>
            </g>
         ))}
      </svg>
   );
}

// 3-bob: muhitlar va branch'lar, yuqoridan pastga.
export function EnvironmentsDiagram() {
   const rows = [
      { y: 14, branch: "<N>-<slug>", env: "local · feature branch", ci: "CI yo'q", kind: "mine" },
      { y: 122, branch: "dev", env: "integratsiya", ci: "CI yo'q", kind: "neutral" },
      { y: 230, branch: "beta", env: "sinov muhiti · dasturchilar", ci: "CI + deploy", kind: "track" },
      { y: 338, branch: "main", env: "prod · xodimlar va mijozlar", ci: "gate + deploy", kind: "prod" },
   ];
   const arrows = [
      { y: 84, label: "PR → squash-merge", who: "muallif, approve'dan keyin" },
      { y: 192, label: "promote: fast-forward + push", who: "release owner, odatda kuniga bir marta" },
      { y: 300, label: "release PR → merge commit", who: "release owner, release window'da" },
   ];
   return (
      <svg viewBox="0 0 640 410" role="img" aria-label="feature branch, dev, beta va main">
         {rows.map((r) => (
            <g key={r.branch} className={`dg-box dg-box--${r.kind}`}>
               <rect x="16" y={r.y} width="300" height="62" rx="10" />
               <text className="dg-box__mono" x="34" y={r.y + 26}>
                  {r.branch}
               </text>
               <text className="dg-box__line dg-box__line--left" x="34" y={r.y + 47}>
                  {r.env}
               </text>
               <text className="dg-env-ci" x="300" y={r.y + 26} textAnchor="end">
                  {r.ci}
               </text>
            </g>
         ))}
         {arrows.map((a) => (
            <g key={a.label} className="dg-arrow">
               <line x1="166" y1={a.y - 8} x2="166" y2={a.y + 28} />
               <path d={`M 160 ${a.y + 26} L 166 ${a.y + 36} L 172 ${a.y + 26} Z`} />
               <text className="dg-arrow__label" x="190" y={a.y + 12}>
                  {a.label}
               </text>
               <text className="dg-arrow__who" x="190" y={a.y + 30}>
                  {a.who}
               </text>
            </g>
         ))}
      </svg>
   );
}

// 5-bob: issue'dan release'gacha, ikki qator.
export function WorkflowDiagram() {
   const top = [
      ["issue", "dasturchi"],
      ["spec", "agent + odam"],
      ["tiketlar", "agent"],
      ["branch", "dasturchi"],
      ["commit", "agent / dasturchi"],
   ];
   const bottom = [
      ["PR", "dasturchi"],
      ["review", "reviewer"],
      ["merge → dev", "muallif"],
      ["promote → beta", "release owner"],
      ["release → main", "release owner"],
   ];
   const W = 112;
   const G = 19;
   const pill = (items, y, kindOf) =>
      items.map(([name, who], i) => {
         const x = 8 + i * (W + G);
         return (
            <g key={name} className={`dg-box dg-box--${kindOf(i)}`}>
               <rect x={x} y={y} width={W} height="44" rx="22" />
               <text className="dg-box__title" x={x + W / 2} y={y + 27} textAnchor="middle">
                  {name}
               </text>
               <text className="dg-arrow__who" x={x + W / 2} y={y + 64} textAnchor="middle">
                  {who}
               </text>
               {i < items.length - 1 ? (
                  <g className="dg-arrow">
                     <line x1={x + W + 2} y1={y + 22} x2={x + W + G - 6} y2={y + 22} />
                     <path
                        d={`M ${x + W + G - 8} ${y + 17} L ${x + W + G - 1} ${y + 22} L ${x + W + G - 8} ${y + 27} Z`}
                     />
                  </g>
               ) : null}
            </g>
         );
      });
   const lastX = 8 + 4 * (W + G) + W / 2;
   const firstX = 8 + W / 2;
   return (
      <svg viewBox="0 0 640 220" role="img" aria-label="Ish oqimi: issue'dan release'gacha">
         {pill(top, 12, (i) => (i < 3 ? "neutral" : "mine"))}
         <path
            className="dg-link"
            d={`M ${lastX} 84 C ${lastX} 112, ${lastX} 112, ${lastX - 30} 112 L ${firstX + 30} 112 C ${firstX} 112, ${firstX} 112, ${firstX} 134`}
         />
         {pill(bottom, 138, (i) => (i < 3 ? "mine" : "track"))}
      </svg>
   );
}

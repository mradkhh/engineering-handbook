// Protocol kitobi: karta sahifasi va kartadan chiziladigan sxema.
// Ma'lumot faqat `src/protocol.js` to'plamidan keladi; bu yerda hech narsa protocol faylini o'qimaydi.
import { cardFlow, DARAJALAR, GURUHLAR, protocolRef, TEKSHIRUVCHILAR } from "../protocol.js";
import { inlineCode } from "./index.jsx";

// ---------- sxema ----------

const W = 640;
const MAIN = { x: 16, w: 404 };
const SIDE = { x: 468, w: 156 };
const LINE = 16;
const GAP = 22;

const plain = (s) => s.replace(/`/g, "");

/** Matnni so'z bo'yicha qatorlarga bo'ladi; `max` qatordan oshsa oxirgisi «…» bilan tugaydi. */
function wrap(text, width, max) {
   const lines = [];
   let cur = "";
   for (const word of plain(text).split(/\s+/)) {
      if (cur && cur.length + 1 + word.length > width) {
         lines.push(cur);
         cur = word;
      } else cur = cur ? `${cur} ${word}` : word;
   }
   if (cur) lines.push(cur);
   if (lines.length <= max) return lines;
   const cut = lines.slice(0, max);
   cut[max - 1] = `${cut[max - 1].replace(/[\s,.;:—-]+$/, "")} …`;
   return cut;
}

/** Protocol kartasining kitobdagi manzili (`id`). */
export const cardAnchor = (kod) => `p-${kod}`;
const cardHref = (ref) => (ref.yozilgan ? `#${cardAnchor(ref.kod)}` : undefined);

function layout(flow) {
   let y = 8;
   return flow.map((s) => {
      let lines;
      let h;
      if (s.tur === "boshlash" || s.tur === "tugash") {
         lines = s.matnlar.map((m) => wrap(`• ${m}`, 60, 1)[0]);
         h = 34 + LINE * lines.length;
      } else if (s.tur === "band") {
         // Sxemada matnning boshi; to'liq matn «Qadamlar» jadvalida.
         lines = wrap(s.matn, 60, 1);
         h = 30 + LINE * lines.length;
      } else {
         lines = wrap(s.savol, 48, 2);
         h = 22 + LINE * lines.length;
      }
      const box = { ...s, lines, y, h };
      y += h + GAP;
      return box;
   });
}

function Arrow({ x1, y1, x2, y2, label, labelX, labelY }) {
   const horizontal = y1 === y2;
   const head = horizontal
      ? `M ${x2} ${y2} l -8 -5 l 0 10 z`
      : `M ${x2} ${y2} l -5 -8 l 10 0 z`;
   return (
      <g className="pg-arrow">
         <line x1={x1} y1={y1} x2={horizontal ? x2 - 8 : x2} y2={horizontal ? y2 : y2 - 8} />
         <path d={head} />
         {label ? (
            <text x={labelX} y={labelY}>
               {label}
            </text>
         ) : null}
      </g>
   );
}

function Lines({ x, y, lines, className, anchor = "start" }) {
   return lines.map((l, i) => (
      <text key={i} className={className} x={x} y={y + i * LINE} textAnchor={anchor}>
         {l}
      </text>
   ));
}

function Target({ target: ref, y, label }) {
   const lines = wrap(ref.nom, 20, 2);
   const h = 30 + LINE * lines.length;
   const top = y - h / 2;
   const body = (
      <g className={`pg-target${ref.yozilgan ? "" : " pg-target--pending"}`}>
         <rect x={SIDE.x} y={top} width={SIDE.w} height={h} rx="8" />
         <text className="pg-target__kod" x={SIDE.x + 12} y={top + 20}>
            → {ref.kod}
         </text>
         <Lines x={SIDE.x + 12} y={top + 38} lines={lines} className="pg-target__nom" />
         {ref.yozilgan ? null : (
            <text className="pg-target__status" x={SIDE.x + SIDE.w - 10} y={top + 20} textAnchor="end">
               yoziladi
            </text>
         )}
      </g>
   );
   return (
      <>
         <Arrow x1={MAIN.x + MAIN.w - 14} y1={y} x2={SIDE.x} y2={y} label={label} labelX={MAIN.x + MAIN.w + 2} labelY={y - 7} />
         {ref.yozilgan ? <a href={cardHref(ref)}>{body}</a> : body}
      </>
   );
}

/** Kartaning sxemasi. Bandlar va qaror nuqtalaridan chiziladi; qo'lda chizilgan protocol sxemasi yo'q. */
export function ProtocolDiagram({ protocol, card }) {
   const boxes = layout(cardFlow(protocol, card));
   const last = boxes.at(-1);
   const height = last.y + last.h + 8;
   const cx = MAIN.x + MAIN.w / 2;
   return (
      <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label={`${card.kod} protocol'ining sxemasi`}>
         {boxes.map((b, i) => {
            const next = boxes[i + 1];
            let continueLabel = null;
            if (b.tur === "qaror") continueLabel = b.ha ? "Yo'q" : "Ha";
            return next ? (
               <Arrow
                  key={`a${i}`}
                  x1={cx}
                  y1={b.y + b.h}
                  x2={cx}
                  y2={next.y}
                  label={continueLabel}
                  labelX={cx + 10}
                  labelY={b.y + b.h + 19}
               />
            ) : null;
         })}
         {boxes.map((b, i) => {
            if (b.tur === "boshlash" || b.tur === "tugash") {
               return (
                  <g key={i} className={`pg-edge pg-edge--${b.tur}`}>
                     <rect x={MAIN.x} y={b.y} width={MAIN.w} height={b.h} rx="18" />
                     <text className="pg-edge__title" x={MAIN.x + 18} y={b.y + 22}>
                        {b.tur === "boshlash" ? "Boshlash sharti" : "Tugash mezoni"}
                     </text>
                     <Lines x={MAIN.x + 18} y={b.y + 42} lines={b.lines} className="pg-edge__line" />
                  </g>
               );
            }
            if (b.tur === "band") {
               return (
                  <a key={i} href={`#${b.id}`}>
                     <g className={`pg-band pg-band--${b.daraja}`}>
                        <rect x={MAIN.x} y={b.y} width={MAIN.w} height={b.h} rx="8" />
                        <text className="pg-band__id" x={MAIN.x + 14} y={b.y + 21}>
                           {b.id}
                        </text>
                        <text className="pg-band__meta" x={MAIN.x + MAIN.w - 12} y={b.y + 21} textAnchor="end">
                           {b.daraja} · {b.tekshiruvchi}
                        </text>
                        <Lines x={MAIN.x + 14} y={b.y + 40} lines={b.lines} className="pg-band__line" />
                     </g>
                  </a>
               );
            }
            const mid = b.y + b.h / 2;
            const inset = 16;
            const pts = [
               [MAIN.x + inset, b.y],
               [MAIN.x + MAIN.w - inset, b.y],
               [MAIN.x + MAIN.w, mid],
               [MAIN.x + MAIN.w - inset, b.y + b.h],
               [MAIN.x + inset, b.y + b.h],
               [MAIN.x, mid],
            ];
            // Tekshiruv bo'yicha aynan bitta javob boshqa protocol'ga olib boradi; ikkinchisi davom etadi.
            const branch = b.ha ? { ref: b.ha, label: "Ha" } : { ref: b.yoq, label: "Yo'q" };
            return (
               <g key={i} className="pg-decision">
                  <polygon points={pts.map((p) => p.join(",")).join(" ")} />
                  <Lines x={cx} y={b.y + 22} lines={b.lines} className="pg-decision__line" anchor="middle" />
                  <Target target={branch.ref} y={mid} label={branch.label} />
               </g>
            );
         })}
      </svg>
   );
}

// ---------- karta sahifasi ----------

export const guruhNomi = (id) => GURUHLAR.find((g) => g.id === id)?.nom;

function RefLink({ protocol, kod }) {
   const ref = protocolRef(protocol, kod);
   const label = `${ref.kod} — ${ref.nom}`;
   return ref.yozilgan ? <a href={`#${cardAnchor(ref.kod)}`}>{label}</a> : <span className="p-pending">{label} (yoziladi)</span>;
}

function Bans({ card, bans }) {
   return bans.length ? (
      <>
         <h2 id={`${card.kod}-taqiqlar`}>Taqiqlar</h2>
         <BandTable bandlar={bans} />
      </>
   ) : null;
}

function BandTable({ bandlar }) {
   return (
      <div className="table-wrap">
         <table className="p-bands">
            <thead>
               <tr>
                  <th>Band</th>
                  <th>Daraja</th>
                  <th>Tekshiruvchi</th>
                  <th>Nima qilinadi</th>
               </tr>
            </thead>
            <tbody>
               {bandlar.map((b) => (
                  <tr key={b.id} id={b.id} className={`p-band p-band--${b.daraja}`}>
                     <td className="p-band__id">
                        <a href={`#${b.id}`}>{b.id}</a>
                     </td>
                     <td>
                        <span className={`p-level p-level--${b.daraja}`}>{b.daraja}</span>
                     </td>
                     <td>
                        {b.tekshiruvchi} <span className="p-muted">({TEKSHIRUVCHILAR[b.tekshiruvchi]})</span>
                     </td>
                     <td>{inlineCode(b.matn)}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

const List = ({ items }) => (
   <ul>
      {items.map((s) => (
         <li key={s}>{inlineCode(s)}</li>
      ))}
   </ul>
);

/** Bitta protocol kartasi: qachon, kim, shart, sxema, qadamlar, qarorlar, tugash, taqiqlar, murojaat, sabab. */
export function ProtocolCard({ protocol, card, handbookHref }) {
   const steps = card.bandlar.filter((b) => b.daraja !== "taqiq");
   const bans = card.bandlar.filter((b) => b.daraja === "taqiq");
   if (card.guruh === "umumiy") {
      return (
         <>
            <h1>
               {card.kod} — {card.nom}
            </h1>
            <p className="p-lead">Bu bandlar har protocol bilan birga amal qiladi.</p>
            <BandTable bandlar={steps} />
            <Bans card={card} bans={bans} />
         </>
      );
   }
   return (
      <>
         <h1>
            {card.kod} — {card.nom}
         </h1>
         <dl className="p-meta">
            <dt>Kim</dt>
            <dd>{inlineCode(card.ijrochi)}</dd>
            <dt>Murojaat</dt>
            <dd>{inlineCode(card.murojaat)}</dd>
            <dt>Sabab</dt>
            <dd>
               Engineering Handbook:{" "}
               {card.handbook.map((n, i) => (
                  <span key={n}>
                     {i ? ", " : ""}
                     <a href={`${handbookHref}#ch-${n}`}>{n}-bob</a>
                  </span>
               ))}
            </dd>
         </dl>
         <h2 id={`${card.kod}-qachon`}>Qachon</h2>
         <List items={card.belgilar} />
         <h2 id={`${card.kod}-shart`}>Boshlash sharti</h2>
         <List items={card.shart} />
         <figure className="diagram p-diagram">
            <div className="diagram__art">
               <ProtocolDiagram protocol={protocol} card={card} />
            </div>
         </figure>
         <h2 id={`${card.kod}-qadamlar`}>Qadamlar</h2>
         <BandTable bandlar={steps} />
         {card.qarorlar?.length ? (
            <>
               <h2 id={`${card.kod}-qarorlar`}>Qaror nuqtalari</h2>
               <div className="table-wrap">
                  <table>
                     <thead>
                        <tr>
                           <th>Qayerda</th>
                           <th>Savol</th>
                           <th>Ha</th>
                           <th>Yo'q</th>
                        </tr>
                     </thead>
                     <tbody>
                        {card.qarorlar.map((q) => (
                           <tr key={q.savol}>
                              <td>
                                 <a href={`#${q.keyin}`}>{q.keyin}</a> dan keyin
                              </td>
                              <td>{inlineCode(q.savol)}</td>
                              <td>{q.ha ? <RefLink protocol={protocol} kod={q.ha} /> : "davom etiladi"}</td>
                              <td>{q.yoq ? <RefLink protocol={protocol} kod={q.yoq} /> : "davom etiladi"}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </>
         ) : null}
         <h2 id={`${card.kod}-tugash`}>Tugash mezoni</h2>
         <List items={card.tugash} />
         <Bans card={card} bans={bans} />
      </>
   );
}

/** Kitob boshidagi bo'lim: darajalar, tekshiruvchilar va saralash jadvali. */
export function ProtocolFront({ protocol }) {
   return (
      <>
         <h1>Saralash jadvali</h1>
         <p className="p-lead">
            Ishni boshlashdan oldin belgini toping va o'sha protocol bo'yicha ishlang. Hech biri mos kelmasa, to'xtab release
            owner'dan so'rang (UM-02).
         </p>
         <div className="table-wrap">
            <table className="p-triage">
               <thead>
                  <tr>
                     <th>Belgi</th>
                     <th>Protocol</th>
                  </tr>
               </thead>
               <tbody>
                  {protocol.saralash.map((r) => (
                     <tr key={r.belgi}>
                        <td>{inlineCode(r.belgi)}</td>
                        <td>
                           <RefLink protocol={protocol} kod={r.kod} />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <h2 id="p-darajalar">Darajalar</h2>
         <div className="table-wrap">
            <table>
               <tbody>
                  {Object.entries(DARAJALAR).map(([k, v]) => (
                     <tr key={k}>
                        <td>
                           <span className={`p-level p-level--${k}`}>{k}</span>
                        </td>
                        <td>{v}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <h2 id="p-tekshiruvchilar">Tekshiruvchilar</h2>
         <div className="table-wrap">
            <table>
               <tbody>
                  {Object.entries(TEKSHIRUVCHILAR).map(([k, v]) => (
                     <tr key={k}>
                        <td>{k}</td>
                        <td>{v}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <h2 id="p-royxat">Protocol'lar</h2>
         {GURUHLAR.map((g) => {
            const items = protocol.royxat.filter((p) => p.guruh === g.id);
            return items.length ? (
               <div key={g.id} className="p-group">
                  <h3>{guruhNomi(g.id)}</h3>
                  <ul>
                     {items.map((p) => (
                        <li key={p.kod}>
                           <RefLink protocol={protocol} kod={p.kod} />
                        </li>
                     ))}
                  </ul>
               </div>
            ) : null;
         })}
      </>
   );
}


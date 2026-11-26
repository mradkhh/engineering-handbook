import { categories, termDef, terms } from "../terms.js";

// Kitob komponentlari. MDX ichida ishlatiladi; qoida qutisi `Band`ni build.jsx protocol'dan beradi.

function Callout({ kind, label, children }) {
   return (
      <aside className={`callout callout--${kind}`}>
         <div className="callout__label">{label}</div>
         <div className="callout__body">{children}</div>
      </aside>
   );
}

export const Note = ({ children }) => (
   <Callout kind="note" label="Eslatma">
      {children}
   </Callout>
);

export const Warning = ({ children }) => (
   <Callout kind="warning" label="Ogohlantirish">
      {children}
   </Callout>
);

export function DoDont({ children }) {
   return <div className="dodont">{children}</div>;
}
export const Do = ({ title = "To'g'ri", children }) => (
   <div className="dodont__col dodont__col--do">
      <div className="dodont__head">
         <span className="dodont__mark" aria-hidden="true">
            ✓
         </span>
         {title}
      </div>
      <div className="dodont__body">{children}</div>
   </div>
);
export const Dont = ({ title = "Noto'g'ri", children }) => (
   <div className="dodont__col dodont__col--dont">
      <div className="dodont__head">
         <span className="dodont__mark" aria-hidden="true">
            ✕
         </span>
         {title}
      </div>
      <div className="dodont__body">{children}</div>
   </div>
);

export function Steps({ children }) {
   return <div className="steps">{children}</div>;
}

// Satr turlari: "$ " — buyruq, "# " — izoh, qolgani — natija.
export function Terminal({ title = "terminal", children }) {
   const text = String(children ?? "").replace(/^\n+|\s+$/g, "");
   const lines = text.split("\n");
   return (
      <figure className="terminal">
         <figcaption className="terminal__bar">
            <span className="terminal__dots" aria-hidden="true">
               <i />
               <i />
               <i />
            </span>
            <span className="terminal__title">{title}</span>
         </figcaption>
         <pre className="terminal__body">
            {lines.map((line, i) => {
               if (line.startsWith("$ ")) {
                  return (
                     <span key={i} className="t-line t-cmd">
                        <span className="t-prompt">$ </span>
                        {line.slice(2)}
                        {"\n"}
                     </span>
                  );
               }
               if (line.startsWith("# ")) {
                  return (
                     <span key={i} className="t-line t-comment">
                        {line}
                        {"\n"}
                     </span>
                  );
               }
               return (
                  <span key={i} className="t-line t-out">
                     {line}
                     {"\n"}
                  </span>
               );
            })}
         </pre>
      </figure>
   );
}

export function Diagram({ n, title, children }) {
   return (
      <figure className="diagram">
         <div className="diagram__art">{children}</div>
         <figcaption className="diagram__caption">
            <span className="diagram__n">Rasm {n}.</span> {title}
         </figcaption>
      </figure>
   );
}

export function Term({ t, children }) {
   const def = termDef(t);
   return (
      <span className="term" title={def.replace(/`/g, "")} data-term={t}>
         {children ?? t}
      </span>
   );
}

// Suhbatda qanday aytiladi: to'g'ri ibora, noto'g'ri ibora va ma'nosi.
export function Phrase({ ok, bad, children }) {
   return (
      <div className="phrase">
         <div className="phrase__row phrase__row--ok">
            <span className="phrase__mark" aria-hidden="true">
               ✓
            </span>
            <q>{ok}</q>
         </div>
         {bad ? (
            <div className="phrase__row phrase__row--bad">
               <span className="phrase__mark" aria-hidden="true">
                  ✕
               </span>
               <q>{bad}</q>
            </div>
         ) : null}
         {children ? <div className="phrase__note">{children}</div> : null}
      </div>
   );
}

const slug = (t) => `term-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
export const inlineCode = (text) =>
   text.split(/(`[^`]+`)/g).map((part, i) =>
      part.startsWith("`") ? <code key={i}>{part.slice(1, -1)}</code> : part,
   );

// 13-bob: lug'at toifalar bo'yicha, alifbo tartibida.
export function Glossary() {
   return (
      <div className="glossary">
         {categories.map((cat) => {
            const items = Object.entries(terms)
               .filter(([, e]) => e.cat === cat)
               .sort(([a], [b]) => a.localeCompare(b, "en", { sensitivity: "base" }));
            return (
               <section key={cat} className="glossary__group">
                  <h3 className="glossary__cat">{cat}</h3>
                  <dl className="glossary__list">
                     {items.map(([t, e]) => (
                        <div key={t} className="glossary__item" id={slug(t)}>
                           <dt>{t}</dt>
                           <dd>
                              <p>{inlineCode(e.def)}</p>
                              {e.ok ? (
                                 <p className="glossary__use">
                                    <span className="glossary__ok">✓ «{e.ok}»</span>
                                    {e.bad ? <span className="glossary__bad">✕ «{e.bad}»</span> : null}
                                 </p>
                              ) : null}
                           </dd>
                        </div>
                     ))}
                  </dl>
               </section>
            );
         })}
      </div>
   );
}

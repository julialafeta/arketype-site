import type { ReactNode } from "react";

/**
 * ARKETYPE — MDX component library.
 *
 * These are the ONLY building blocks an author needs to compose an article.
 * They encapsulate the entire Loewe/Arketype design (typography, colours,
 * grids). Content authors write MDX with these tags and never touch layout.
 *
 * `createMdxComponents(slug)` bakes the article slug into <Slot> so images can
 * be referenced by bare filename (resolved to /catalogo/<slug>/<file>).
 */

function pad2(n: number | string): string {
  const s = String(n);
  return s.length < 2 ? "0" + s : s;
}

/* -------------------------------------------------------------------------- */
/* Intro / lede                                                               */
/* -------------------------------------------------------------------------- */
function Intro({
  label = "INTRO",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="bleed">
      <div className="intro__wrap">
        <div className="intro__grid">
          <div className="intro__label">{label}</div>
          <div className="intro__body">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Lede({ children }: { children: ReactNode }) {
  return <p className="lede">{children}</p>;
}

/* -------------------------------------------------------------------------- */
/* Chapter shell                                                              */
/* -------------------------------------------------------------------------- */
function Chapter({
  n,
  kicker,
  total = 6,
  id,
  children,
}: {
  n: string;
  kicker: string;
  total?: number;
  id?: string;
  children: ReactNode;
}) {
  const anchor = id ?? `ch${parseInt(n, 10) || n}`;
  return (
    <>
      <div className="rule">
        <div className="rule__line" />
      </div>
      <section id={anchor} className="chapter">
        <div className="chapter__kicker">
          <span>
            {n} · {kicker}
          </span>
          <span>
            ({pad2(n)} / {pad2(total)})
          </span>
        </div>
        {children}
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Split header (heading/lead on one side, figure on the other)               */
/* -------------------------------------------------------------------------- */
function Split({
  figure = "right",
  tall = false,
  even = false,
  children,
}: {
  figure?: "left" | "right";
  tall?: boolean;
  even?: boolean;
  children: ReactNode;
}) {
  const cls = [
    "split",
    even ? "split--even" : figure === "left" ? "split--figure-left" : "",
    tall ? "split--tall" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={cls}>{children}</div>;
}

function Text({ children }: { children: ReactNode }) {
  return <div className="split__text">{children}</div>;
}

function Heading({
  wide = false,
  children,
}: {
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <h2 className={`chapter__heading${wide ? " chapter__heading--wide" : ""}`}>
      {children}
    </h2>
  );
}

function Lead({
  spaced = false,
  children,
}: {
  spaced?: boolean;
  children: ReactNode;
}) {
  return (
    <p className={`chapter__lead${spaced ? " chapter__lead--spaced" : ""}`}>
      {children}
    </p>
  );
}

function MiniQuote({ children }: { children: ReactNode }) {
  return (
    <div className="mini-quote">
      <span className="mini-quote__mark">&#8220;</span>
      <p className="mini-quote__text">{children}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Figures, grids, image slots                                                */
/* -------------------------------------------------------------------------- */
function Figure({
  caption,
  captionTop = false,
  single = false,
  children,
}: {
  caption?: string;
  captionTop?: boolean;
  single?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className="figure">
      {caption && captionTop && (
        <figcaption className="figcaption figcaption--top">{caption}</figcaption>
      )}
      <div className="figure__body">
        {single ? <div className="figure__single">{children}</div> : children}
      </div>
      {caption && !captionTop && (
        <figcaption className="figcaption figcaption--bottom">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Grid({
  cols = 3,
  rows = 3,
  children,
}: {
  cols?: number;
  rows?: number;
  children: ReactNode;
}) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

function makeSlot(slug: string) {
  return function Slot({
    img,
    alt,
    label,
  }: {
    img?: string;
    alt?: string;
    label?: string;
  }) {
    if (img) {
      const src = `/catalogo/${slug}/${img}`;
      return (
        <div className="slot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? label ?? ""}
            className="slot__img"
            loading="lazy"
          />
        </div>
      );
    }
    return (
      <div className="slot">
        <div className="slot__placeholder">
          <span>{label ?? "Imagem"}</span>
        </div>
      </div>
    );
  };
}

/* -------------------------------------------------------------------------- */
/* Body columns + pull quote                                                  */
/* -------------------------------------------------------------------------- */
function Columns({
  n = 3,
  children,
}: {
  n?: 2 | 3 | number;
  children: ReactNode;
}) {
  return (
    <div className={`columns columns--${n}`} data-colbody>
      {children}
    </div>
  );
}

function PullQuote({
  cite,
  children,
}: {
  cite?: string;
  children: ReactNode;
}) {
  return (
    <blockquote className="pull-quote">
      <p>&#8220;{children}&#8221;</p>
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}

function PullWide({ children }: { children: ReactNode }) {
  return <p className="pull-wide">{children}</p>;
}

/* -------------------------------------------------------------------------- */
/* Lexicon (product/pillar cards)                                             */
/* -------------------------------------------------------------------------- */
function Lexicon({
  title,
  fig,
  children,
}: {
  title?: string;
  fig?: string;
  children: ReactNode;
}) {
  return (
    <>
      {(title || fig) && (
        <div className="lexicon__head">
          {title && <div className="lexicon__head-title">{title}</div>}
          {fig && <div className="lexicon__head-fig">{fig}</div>}
        </div>
      )}
      <div className="lexicon">{children}</div>
    </>
  );
}

function makeLexCard(slug: string) {
  return function LexCard({
    n,
    label,
    img,
    children,
  }: {
    n: string;
    label: string;
    img?: string;
    children: ReactNode;
  }) {
    const src = img ? `/catalogo/${slug}/${img}` : null;
    return (
      <div className="lexicon__card">
        <div className="lexicon__media">
          <span className="lexicon__num">{n}</span>
          {src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={src} alt={label} className="slot__img" loading="lazy" />
          ) : (
            <div className="slot__placeholder">
              <span>{label}</span>
            </div>
          )}
        </div>
        <div className="lexicon__text">
          <div className="lexicon__label">{label}</div>
          <div className="lexicon__desc">{children}</div>
        </div>
      </div>
    );
  };
}

/* -------------------------------------------------------------------------- */
/* People / celebrity rows                                                    */
/* -------------------------------------------------------------------------- */
function People({ children }: { children: ReactNode }) {
  return <div className="people">{children}</div>;
}

function Person({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="people__row">
      <span className="people__name">{name}</span>
      <span className="people__text">{children}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Factory                                                                    */
/* -------------------------------------------------------------------------- */
export function createMdxComponents(slug: string) {
  return {
    Intro,
    Lede,
    Chapter,
    Split,
    Text,
    Heading,
    Lead,
    MiniQuote,
    Figure,
    Grid,
    Slot: makeSlot(slug),
    Columns,
    PullQuote,
    PullWide,
    Lexicon,
    LexCard: makeLexCard(slug),
    People,
    Person,
  };
}

export type MdxComponents = ReturnType<typeof createMdxComponents>;

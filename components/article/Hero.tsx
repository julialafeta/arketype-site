import type { ArticleFrontmatter } from "@/lib/articles";
import type { ReactNode } from "react";

/**
 * Article hero: dark band, brand name, the runway "title-in-image" treatment,
 * and the meta + table-of-contents row. All content comes from frontmatter.
 * `header` is the site nav, rendered over the band.
 */
export default function Hero({
  frontmatter,
  slug,
  header,
}: {
  frontmatter: ArticleFrontmatter;
  slug: string;
  header: ReactNode;
}) {
  const {
    brand,
    title,
    heroLines,
    heroImage,
    kicker,
    dateLabel,
    readingTime,
    toc,
  } = frontmatter;

  // Split the title lines into a top-left group and a bottom-right group.
  const lines = heroLines && heroLines.length > 0 ? heroLines : [title];
  const mid = Math.ceil(lines.length / 2);
  const topLines = lines.slice(0, mid);
  const bottomLines = lines.slice(mid);

  const heroSrc = heroImage ? `/catalogo/${slug}/${heroImage}` : null;

  return (
    <section id="top" className="hero">
      <div className="hero__band" />

      {header}

      <div className="hero__stage">
        <div className="hero__grid">
          <div className="hero__spacer" />
          <div className="hero__col">
            <div className="hero__brand">{brand}</div>

            <figure className="hero__figure">
              <div className="hero__title-frame">
                {heroSrc && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={heroSrc}
                    alt={`${brand} — capa editorial`}
                    className="hero__title-img"
                  />
                )}
                <div className="hero__title-gradient" />
                <h1 className="hero__title">
                  <span className="hero__title-top">
                    {topLines.map((l, i) => (
                      <span key={i}>{l}</span>
                    ))}
                  </span>
                  <span className="hero__title-bottom">
                    {bottomLines.map((l, i) => (
                      <span key={i}>{l}</span>
                    ))}
                  </span>
                </h1>
              </div>
            </figure>
          </div>
        </div>
      </div>

      <div className="hero__meta">
        <div className="hero__meta-grid">
          <div className="hero__meta-side">
            <div className="meta-label">Neste ensaio</div>
            <div className="meta-info">
              {kicker && (
                <>
                  {kicker}
                  <br />
                </>
              )}
              {dateLabel && (
                <>
                  {dateLabel}
                  <br />
                </>
              )}
              {readingTime}
            </div>
          </div>

          {toc && toc.length > 0 && (
            <ul className="toc">
              {toc.map((item) => (
                <li key={item.href} className="toc__item">
                  <span className="toc__dot">•</span>
                  <a href={`#${item.href}`} className="toc__link">
                    {item.label}
                  </a>
                  {item.year && <span className="toc__year">{item.year}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export type HeaderBrand = { slug: string; brand: string; active?: boolean };

/**
 * ARKETYPE top bar: wordmark + INDEX / CATÁLOGO (dropdown) / STUDIO.
 * Defaults to the cream wordmark for use over the dark hero/masthead band.
 * Pass `onLight` when the header sits on a light background.
 * `brands` populates the CATÁLOGO dropdown from published articles.
 */
export default function SiteHeader({
  onLight = false,
  brands = [],
  activeSlug,
}: {
  onLight?: boolean;
  brands?: HeaderBrand[];
  activeSlug?: string;
}) {
  const wordmark = onLight
    ? "/logos/arketype-wordmark-black.svg"
    : "/logos/arketype-wordmark-cream.svg";

  return (
    <div className="site-header__inner">
      <Link href="/catalogo" aria-label="Arketype — início">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmark} alt="Arketype" className="brand-logo" />
      </Link>
      <nav className="nav">
        <Link href="/catalogo" className="nav__link nav__link--dim">
          Index
        </Link>
        <div className="cat-nav">
          <div className="cat-nav__label">
            CATÁLOGO<span style={{ fontSize: "0.7em", opacity: 0.7 }}>▾</span>
          </div>
          <div className="cat-dropdown">
            <div className="cat-dropdown__inner">
              {brands.length === 0 ? (
                <span className="cat-dropdown__item cat-dropdown__item--on">
                  Em breve
                </span>
              ) : (
                brands.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/catalogo/${b.slug}`}
                    className={`cat-dropdown__item${
                      b.slug === activeSlug ? " cat-dropdown__item--on" : ""
                    }`}
                  >
                    {b.brand}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
        <span className="nav__link nav__link--dim" aria-disabled="true">
          Studio
        </span>
      </nav>
    </div>
  );
}

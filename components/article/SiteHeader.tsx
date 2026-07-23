import Link from "next/link";

export type MenuItem = { brand: string; slug: string | null };

/**
 * ARKETYPE top bar: wordmark + INDEX / CATÁLOGO (dropdown) / STUDIO.
 * INDEX and STUDIO are non-clickable labels (no page behind them yet).
 * Defaults to the cream wordmark for use over the dark hero band; pass
 * `onLight` on a light background. `menu` is the CATÁLOGO roster: brands with a
 * slug are live links, brands with `slug: null` render dimmed ("coming soon").
 */
export default function SiteHeader({
  onLight = false,
  menu = [],
  activeSlug,
}: {
  onLight?: boolean;
  menu?: MenuItem[];
  activeSlug?: string;
}) {
  const wordmark = onLight
    ? "/logos/arketype-wordmark-black.svg"
    : "/logos/arketype-wordmark-cream.svg";

  return (
    <div className="site-header__inner">
      <Link href="/" aria-label="Arketype — início">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmark} alt="Arketype" className="brand-logo" />
      </Link>
      <nav className="nav">
        <span className="nav__link nav__link--dim" aria-disabled="true">
          Index
        </span>
        <div className="cat-nav">
          <div className="cat-nav__label">
            CATÁLOGO<span style={{ fontSize: "0.7em", opacity: 0.7 }}>▾</span>
          </div>
          <div className="cat-dropdown">
            <div className="cat-dropdown__inner">
              {menu.length === 0 ? (
                <span className="cat-dropdown__item cat-dropdown__item--on">
                  Em breve
                </span>
              ) : (
                menu.map((item) =>
                  item.slug ? (
                    <Link
                      key={item.brand}
                      href={`/catalogo/${item.slug}`}
                      className={`cat-dropdown__item${
                        item.slug === activeSlug ? " cat-dropdown__item--on" : ""
                      }`}
                    >
                      {item.brand}
                    </Link>
                  ) : (
                    <span
                      key={item.brand}
                      className="cat-dropdown__item"
                      aria-disabled="true"
                    >
                      {item.brand}
                    </span>
                  ),
                )
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

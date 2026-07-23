import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import SiteHeader, { type HeaderBrand } from "@/components/article/SiteHeader";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "O Catálogo da ARKETYPE: estudos editoriais de marcas de moda, uma marca por artigo.",
};

export default function CatalogoHome() {
  const articles = getAllArticles();
  const brands: HeaderBrand[] = articles.map((a) => ({
    slug: a.slug,
    brand: a.brand,
  }));

  return (
    <div className="catalog">
      <header className="catalog__masthead">
        <SiteHeader brands={brands} />
        <div className="catalog__hero">
          <p className="catalog__eyebrow">Arketype · Estudos de marca</p>
          <h1 className="catalog__title">Catálogo</h1>
          <p className="catalog__subtitle">
            Análises editoriais de marcas de moda. Cada artigo é uma marca: sua
            origem, sua linguagem e as escolhas que a tornaram o que é.
          </p>
        </div>
      </header>

      <div className="catalog__body">
        <div className="catalog__count">
          {articles.length}{" "}
          {articles.length === 1 ? "artigo" : "artigos"} no arquivo
        </div>

        {articles.length === 0 ? (
          <p className="catalog__empty">Nenhum artigo publicado ainda.</p>
        ) : (
          <div className="catalog__grid">
            {articles.map((a) => {
              const cover = a.cover
                ? `/catalogo/${a.slug}/${a.cover}`
                : null;
              return (
                <Link key={a.slug} href={`/catalogo/${a.slug}`} className="card">
                  <div className="card__cover">
                    {cover ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={cover} alt={`${a.brand} — capa`} />
                    ) : (
                      <div className="card__cover-placeholder">{a.brand}</div>
                    )}
                  </div>
                  <div className="card__meta">
                    <span className="card__brand">{a.brand}</span>
                    {a.dateLabel && (
                      <span className="card__date">{a.dateLabel}</span>
                    )}
                  </div>
                  <h2 className="card__title">{a.title}</h2>
                  {a.excerpt && <p className="card__excerpt">{a.excerpt}</p>}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <footer className="catalog__footer">
        <div className="site-footer__note">
          Arketype Catalog · Estudos de marca e material
        </div>
        <div className="site-footer__meta">© ARKETYPE · filed 2026</div>
      </footer>
    </div>
  );
}

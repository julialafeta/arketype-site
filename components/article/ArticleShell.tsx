import type { ReactNode } from "react";
import type { ArticleFrontmatter } from "@/lib/articles";
import SiteHeader, { type HeaderBrand } from "./SiteHeader";
import Hero from "./Hero";
import ProgressBar from "./ProgressBar";

/**
 * The full article template. Wraps compiled MDX (`children`) with the ARKETYPE
 * chrome: progress bar, hero, closing reflection, afterword and footer — all
 * driven by frontmatter. Every article shares this shell.
 */
export default function ArticleShell({
  frontmatter,
  slug,
  brands,
  children,
}: {
  frontmatter: ArticleFrontmatter;
  slug: string;
  brands: HeaderBrand[];
  children: ReactNode;
}) {
  const { closing, afterword, caseNumber, kicker } = frontmatter;

  return (
    <>
      <ProgressBar />

      <Hero
        frontmatter={frontmatter}
        slug={slug}
        header={<SiteHeader brands={brands} activeSlug={slug} />}
      />

      <main className="article-main">{children}</main>

      {closing && (closing.eyebrow || closing.paragraphs?.length) && (
        <section className="closing">
          <div className="closing__inner">
            {closing.eyebrow && (
              <div className="closing__eyebrow">{closing.eyebrow}</div>
            )}
            {closing.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {afterword && (
        <div className="afterword__wrap">
          <div className="afterword">
            <p>{afterword}</p>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="site-footer__wordmark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/arketype-wordmark-cream.svg" alt="Arketype" />
        </div>
        <div className="site-footer__row">
          <div className="site-footer__note">
            {kicker ?? "Arketype Catalog"} · Estudos de marca e material
          </div>
          <div className="site-footer__meta">
            © ARKETYPE · filed 2026{caseNumber ? ` · Case № ${caseNumber}` : ""}
          </div>
        </div>
      </footer>
    </>
  );
}

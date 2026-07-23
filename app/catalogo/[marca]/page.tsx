import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getArticle, getCatalogMenu } from "@/lib/articles";
import { createMdxComponents } from "@/components/article/mdx";
import ArticleShell from "@/components/article/ArticleShell";

type Params = { marca: string };

// Pre-render every article at build time from content/catalogo/*.mdx.
export function generateStaticParams(): Params[] {
  return getAllSlugs().map((marca) => ({ marca }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { marca } = await params;
  const article = getArticle(marca);
  if (!article) return {};
  const { title, brand, excerpt, cover } = article.frontmatter;
  const image = cover ? `/catalogo/${marca}/${cover}` : undefined;
  return {
    title,
    description: excerpt ?? `${brand} — estudo de marca no Catálogo da ARKETYPE.`,
    openGraph: {
      title: `${title} · ARKETYPE`,
      description: excerpt,
      images: image ? [image] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { marca } = await params;
  const article = getArticle(marca);
  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.content,
    components: createMdxComponents(marca),
    options: { parseFrontmatter: false },
  });

  const menu = getCatalogMenu();

  return (
    <ArticleShell frontmatter={article.frontmatter} slug={marca} menu={menu}>
      {content}
    </ArticleShell>
  );
}

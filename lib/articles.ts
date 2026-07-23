import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * ARKETYPE content layer.
 *
 * Every article is a single `.mdx` file in `content/catalogo/`. The file name
 * (without extension) becomes the URL slug: `content/catalogo/loewe.mdx` →
 * `/catalogo/loewe`. To publish a new article you only add a new `.mdx` here;
 * routing and design are applied automatically by the template.
 */

export const CATALOGO_DIR = path.join(process.cwd(), "content", "catalogo");

export type TocItem = {
  label: string;
  year?: string;
  href: string;
};

export type ArticleFrontmatter = {
  /** Brand name, shown in the hero band (e.g. "Loewe"). */
  brand: string;
  /** Full article title. */
  title: string;
  /** Title broken into lines for the hero runway-image treatment. */
  heroLines?: string[];
  /** Background image behind the hero title (file in public/catalogo/<slug>/). */
  heroImage?: string;
  /** Cover image for the /catalogo listing card. */
  cover?: string;
  /** One-line summary for the listing card. */
  excerpt?: string;
  /** Small label above the meta block (e.g. "Arketype Catalog"). */
  kicker?: string;
  /** ISO date, used for sorting/machine-readable date. */
  date?: string;
  /** Human date shown in the meta block (e.g. "15 JUL 2026"). */
  dateLabel?: string;
  /** Reading-time label (e.g. "12 min de leitura"). */
  readingTime?: string;
  /** Archive case number shown in the footer. */
  caseNumber?: string;
  /** Manual ordering on the listing (lower = first). Falls back to date. */
  order?: number;
  /** Table of contents entries. */
  toc?: TocItem[];
  /** Closing "última reflexão" block. */
  closing?: { eyebrow?: string; paragraphs?: string[] };
  /** Signed-off afterword paragraph under the closing band. */
  afterword?: string;
  /** Whether the article is ready to be listed/served. Defaults to true. */
  published?: boolean;
};

export type ArticleMeta = ArticleFrontmatter & {
  slug: string;
};

export type Article = {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
};

function readMdxFiles(): string[] {
  if (!fs.existsSync(CATALOGO_DIR)) return [];
  return fs
    .readdirSync(CATALOGO_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllSlugs(): string[] {
  return readMdxFiles().map((f) => f.replace(/\.mdx?$/, ""));
}

export function getArticle(slug: string): Article | null {
  const candidates = [
    path.join(CATALOGO_DIR, `${slug}.mdx`),
    path.join(CATALOGO_DIR, `${slug}.md`),
  ];
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const article = getArticle(slug);
      if (!article) return null;
      return { slug, ...article.frontmatter } as ArticleMeta;
    })
    .filter((a): a is ArticleMeta => a !== null && a.published !== false)
    .sort((a, b) => {
      const ao = a.order ?? Number.POSITIVE_INFINITY;
      const bo = b.order ?? Number.POSITIVE_INFINITY;
      if (ao !== bo) return ao - bo;
      // Fall back to most-recent date first.
      const ad = a.date ? Date.parse(a.date) : 0;
      const bd = b.date ? Date.parse(b.date) : 0;
      return bd - ad;
    });
}

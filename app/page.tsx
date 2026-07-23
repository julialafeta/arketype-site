import { redirect } from "next/navigation";
import { getAllArticles } from "@/lib/articles";

// First version: the site focuses on the article itself. Send the root to the
// most recent published article (currently Loewe).
export default function Home() {
  const first = getAllArticles()[0];
  redirect(first ? `/catalogo/${first.slug}` : "/catalogo/loewe");
}

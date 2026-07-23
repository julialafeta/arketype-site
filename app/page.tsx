import { redirect } from "next/navigation";

// First version: the site IS the blog. Send the root to the catalog.
export default function Home() {
  redirect("/catalogo");
}

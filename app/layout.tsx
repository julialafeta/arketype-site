import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/article.css";
import "@/styles/catalog.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arketype.com.br"),
  title: {
    default: "ARKETYPE — Catálogo",
    template: "%s · ARKETYPE",
  },
  description:
    "ARKETYPE — projeto editorial de análise de marcas de moda. Estudos de marca no Catálogo.",
  openGraph: {
    type: "website",
    siteName: "ARKETYPE",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

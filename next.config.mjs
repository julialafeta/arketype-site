/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MDX articles are compiled at request/build time via next-mdx-remote (RSC),
  // so no @next/mdx page extension wiring is needed here.
  images: {
    // Article images are local (public/catalogo/<marca>/...). No remote loader needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Ganti URL ini dengan domain asli kamu nanti setelah deploy ke Vercel
  const baseUrl = "https://pemenangkarir-coffee.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Opsional: larang bot masuk ke folder rahasia jika ada
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

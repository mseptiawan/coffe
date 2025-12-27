import { MetadataRoute } from "next";
import cafes from "@/data/cafes.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const cafeUrls = cafes.map((cafe) => ({
    url: `https://cafe-pemenangkarir.vercel.app/cafe/${cafe.slug}`, // Sesuaikan domain
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://cafe-pemenangkarir.vercel.app",
      lastModified: new Date(),
      priority: 1,
    },
    ...cafeUrls,
  ];
}

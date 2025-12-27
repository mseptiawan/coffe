import { Metadata } from "next";
// Import data JSON kamu di sini agar variabel 'cafes' dikenali
import cafes from "@/data/cafes.json";
import { cafeImage } from "@/lib/cafeImage";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Pastikan nama variabelnya 'cafes' (plural) sesuai import
  const cafe = cafes.find((c) => c.slug === params.slug);

  if (!cafe) {
    return { title: "Cafe Tidak Ditemukan" };
  }

  // Ambil gambar pertama untuk SEO preview
  const firstImage = cafe.images?.gallery?.[0];
  const ogImage = firstImage
    ? cafeImage(cafe.slug, `gallery/${firstImage}`, "gallery")
    : "";

  return {
    title: cafe.name, // Otomatis jadi: "Nama Cafe | Palembang Coffee Map" jika di root layout sudah ada template
    description: cafe.description?.slice(0, 160),
    openGraph: {
      title: `${cafe.name} | Palembang Coffee Map`,
      description: `Cek lokasi, menu, dan suasana di ${cafe.name} Palembang.`,
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
}

export default function CafeDetailLayout({ children }: Props) {
  return <>{children}</>;
}

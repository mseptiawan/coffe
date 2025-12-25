import cafes from "@/data/cafes.json";
import { notFound } from "next/navigation";

export default function CafeDetail({
  params,
}: {
  params: { slug: string };
}) {
  const cafe = cafes.find((c) => c.slug === params.slug);

  if (!cafe) return notFound();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{cafe.name}</h1>
      <p className="mt-2 text-gray-600">{cafe.address}</p>

      <div className="mt-4 text-sm">
        ⭐ {cafe.rating}
      </div>

      <div className="mt-6 whitespace-pre-line text-gray-700">
        {cafe.description}
      </div>
    </main>
  );
}

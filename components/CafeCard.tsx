import Link from "next/link";
import Badge from "./Badge";

type Cafe = {
  id: number;
  name: string;
  slug: string;
  address: string;
  rating: number;
  vibe: string[];
};

export default function CafeCard({ cafe }: { cafe: Cafe }) {
  return (
    <Link
      href={`/cafe/${cafe.slug}`}
      className="block rounded-xl border bg-white p-5 transition hover:shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-900">
        {cafe.name}
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        {cafe.address}
      </p>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="font-medium">⭐ {cafe.rating}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {cafe.vibe.slice(0, 3).map((v) => (
          <Badge key={v} text={v} />
        ))}
      </div>
    </Link>
  );
}

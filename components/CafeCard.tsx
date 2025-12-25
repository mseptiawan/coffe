import Link from "next/link";
import Badge from "./Badge";
import { Star, MapPin, ArrowRight } from "lucide-react"; // install lucide-react

export default function CafeCard({ cafe }: { cafe: any }) {
  return (
    <Link
      href={`/cafe/${cafe.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
            {cafe.name}
          </h2>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">
            <Star size={14} fill="currentColor" />
            {cafe.rating.toFixed(1)}
          </div>
        </div>

        <div className="mt-2 flex items-start gap-1 text-sm text-gray-500">
          <MapPin size={16} className="mt-0.5 shrink-0" />
          <p className="line-clamp-2">{cafe.address}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {cafe.vibe.slice(0, 3).map((v: string) => (
            <Badge key={v} text={v} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center text-sm font-semibold text-amber-600 opacity-0 transition-opacity group-hover:opacity-100">
        Lihat detail <ArrowRight size={16} className="ml-1" />
      </div>
    </Link>
  );
}
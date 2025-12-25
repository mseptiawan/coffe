import cafes from "@/data/cafes.json";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Wallet, 
  Instagram, 
  Star, 
  Navigation 
} from "lucide-react";
import Badge from "@/components/Badge";

export default function CafeDetail({ params }: { params: { slug: string } }) {
  const cafe = cafes.find((c) => c.slug === params.slug);

  if (!cafe) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header / Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-600 hover:text-amber-600 transition">
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Kembali</span>
          </Link>
          <div className="flex gap-3">
             <a href={cafe.instagram} target="_blank" className="p-2 rounded-full bg-gray-100 hover:bg-pink-50 hover:text-pink-600 transition">
                <Instagram size={20} />
             </a>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-8">
        {/* Title & Rating */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-black text-gray-900">{cafe.name}</h1>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-600 border border-amber-100">
              <Star size={18} fill="currentColor" />
              <span className="font-bold">{cafe.rating}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-gray-600">
            <MapPin size={20} className="mt-1 shrink-0 text-amber-600" />
            <p className="text-lg leading-relaxed">{cafe.address}</p>
          </div>
        </section>

        {/* Info Grid */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Jam Operasional</p>
              <p className="text-gray-900 font-semibold">{cafe.open_hours}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Estimasi Harga</p>
              <p className="text-gray-900 font-semibold">{cafe.price_range}</p>
            </div>
          </div>
        </section>

        {/* Vibe Tags */}
        <section className="mt-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Vibe & Fasilitas</h3>
          <div className="flex flex-wrap gap-2">
            {cafe.vibe.map((v) => (
              <Badge key={v} text={v} />
            ))}
          </div>
        </section>

        <hr className="my-10 border-gray-200" />

        {/* Content */}
        <section className="prose prose-amber max-w-none">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Tentang Cafe</h3>
          <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
            {cafe.description}
          </div>
        </section>

        {/* CTA Button */}
        <section className="mt-12">
          <a 
            href={cafe.maps} 
            target="_blank"
            className="flex items-center justify-center gap-2 w-full md:w-max bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-gray-200"
          >
            <Navigation size={20} />
            Buka di Google Maps
          </a>
        </section>
      </article>
    </main>
  );
}
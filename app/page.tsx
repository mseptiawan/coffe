import cafes from "@/data/cafes.json";
import CafeCard from "@/components/CafeCard";
import CafeMap from "@/components/CafeMap";
export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-12">
      <header className="text-center md:text-left space-y-3">
        <div className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700">
          ☕ Coffee Directory
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
          Palembang <span className="text-amber-600">Coffee Map</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Temukan tempat ngopi terbaik di Kota Pempek. Mulai dari yang 
          hidden gem sampai yang paling hits untuk work from cafe.
        </p>
      </header>

      {/* MAP SECTION */}
      <section className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
        <CafeMap cafes={cafes} />
      </section>

      {/* GRID SECTION */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Rekomendasi Cafe</h3>
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </section>
      </div>
    </main>
  );
}
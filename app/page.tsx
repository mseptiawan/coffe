import cafes from "@/data/cafes.json";
import CafeCard from "@/components/CafeCard";

export default function Home() {
  return (
    <main className="p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ☕ COFFE
        </h1>
        <p className="mt-2 text-gray-600">
          Database coffee shop & tempat nongkrong di Palembang
        </p>
      </header>

      {/* Grid cafe */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} />
        ))}
      </section>
    </main>
  );
}

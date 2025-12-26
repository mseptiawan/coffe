"use client";

import { useState, useEffect } from "react";
import cafes from "@/data/cafes.json";
import CafeCard from "@/components/CafeCard";
import dynamic from "next/dynamic";
import ServiceCTA from "@/components/ServiceCTA";
import SearchBar from "@/components/SearchBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  // SEARCH
  const [query, setQuery] = useState("");
  const CafeMap = dynamic(() => import("@/components/CafeMap"), {
    ssr: false,
  });
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // FILTER LOGIC
  const filteredCafes = cafes.filter((cafe) => {
    const q = query.toLowerCase();

    return (
      cafe.name.toLowerCase().includes(q) ||
      cafe.address.toLowerCase().includes(q) ||
      cafe.vibe.join(" ").toLowerCase().includes(q)
    );
  });

  // RESET PAGE SAAT SEARCH
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // PAGINATION LOGIC (PAKAI filteredCafes)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCafes = filteredCafes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCafes.length / itemsPerPage);

  // Ubah fungsi paginate menjadi:
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // ✅ Tambahkan pengecekan typeof window
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 800, behavior: "smooth" });
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-12 space-y-6">
      {/* HEADER */}
      <header className="text-center md:text-left space-y-3">
        <div className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500 border border-amber-500/20">
          ☕ Coffee Directory
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Palembang <span className="text-amber-500">Coffee Map</span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl">
          Temukan tempat ngopi terbaik di Kota Pempek. Mulai dari yang hidden
          gem sampai yang paling hits untuk work from cafe.
        </p>

        {/* SEARCH BAR */}
        <SearchBar value={query} onChange={setQuery} />
      </header>

      {/* MAP */}
      <section className="overflow-hidden rounded-3xl border-4 border-zinc-800 shadow-2xl">
        <CafeMap cafes={filteredCafes} />
      </section>

      {/* MAP INFO */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
        <span>📍 {filteredCafes.length} cafe ditemukan</span>
        <span>☕ Hidden gem & hits</span>
        <span>💻 WFC friendly</span>
      </div>

      {/* CTA */}
      <div className="-mt-6">
        <ServiceCTA />
      </div>

      {/* LIST */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-2xl font-bold text-white">Rekomendasi Cafe</h3>

          <span className="text-sm text-zinc-500 font-medium">
            Menampilkan {filteredCafes.length === 0 ? 0 : indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredCafes.length)} dari{" "}
            {filteredCafes.length} cafe
          </span>
        </div>

        <section className="grid grid-cols-2 gap-3 md:gap-8 lg:grid-cols-3">
          {currentCafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </section>

        {/* EMPTY STATE */}
        {filteredCafes.length === 0 && (
          <p className="text-center text-zinc-500 py-12">
            Tidak ada cafe yang cocok dengan pencarian kamu ☕
          </p>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 pt-8 border-t border-white/5">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 disabled:opacity-20 hover:bg-zinc-800"
            >
              <ChevronLeft size={24} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`h-10 w-10 rounded-xl font-bold ${
                    currentPage === number
                      ? "bg-amber-500 text-black"
                      : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 disabled:opacity-20 hover:bg-zinc-800"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

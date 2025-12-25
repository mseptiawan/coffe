"use client"; // Wajib ditambahkan karena kita pakai State

import { useState } from "react";
import cafes from "@/data/cafes.json";
import CafeCard from "@/components/CafeCard";
import CafeMap from "@/components/CafeMap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCTA from "@/components/ServiceCTA";

export default function Home() {
  // CONFIGURATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Tampilkan 9 cafe per halaman

  // LOGIC PAGINATION
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCafes = cafes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cafes.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll ke atas section list saat ganti halaman
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
  <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 space-y-6">
      <header className="text-center md:text-left space-y-3">
        <div className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500 border border-amber-500/20">
          ☕ Coffee Directory
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Palembang <span className="text-amber-500">Coffee Map</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Temukan tempat ngopi terbaik di Kota Pempek. Mulai dari yang 
          hidden gem sampai yang paling hits untuk work from cafe.
        </p>
      </header>

      {/* MAP SECTION */}
      <section className="overflow-hidden rounded-3xl border-4 border-zinc-800 shadow-2xl">
        <CafeMap cafes={cafes} />
      </section>
<div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70">
  <span>📍 14 cafe terdaftar</span>
  <span>☕ Hidden gem & hits</span>
  <span>💻 WFC friendly</span>
</div>

      <div className="-mt-6"> 
      <ServiceCTA />
</div>
      {/* GRID SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-2xl font-bold text-white">Rekomendasi Cafe</h3>
          <span className="text-sm text-zinc-500 font-medium">
            Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, cafes.length)} dari {cafes.length} cafe
          </span>
        </div>
        
        <section className="grid grid-cols-2 gap-3 md:gap-8 lg:grid-cols-3">
          {currentCafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </section>

        {/* PAGINATION NAVIGATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2 pt-8 border-t border-white/5">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 disabled:opacity-20 hover:bg-zinc-800 transition"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`h-10 w-10 rounded-xl font-bold transition-all ${
                    currentPage === number
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                      : "bg-zinc-900 border border-white/5 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 disabled:opacity-20 hover:bg-zinc-800 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
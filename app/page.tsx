"use client";

import { useState, useEffect } from "react";
import cafes from "@/data/cafes.json";
import CafeCard from "@/components/CafeCard";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import ServiceCTA from "@/components/ServiceCTA";
import SearchBar from "@/components/SearchBar";
import { Plus } from "lucide-react";
import SupportModal from "@/components/SupportModal";

export default function Home() {
  // SEARCH STATE
  const [query, setQuery] = useState("");

  // LOAD MORE STATE
  // Berikan nilai default awal (misal 9)
  const [limit, setLimit] = useState(9);

  // Gunakan useEffect untuk mendeteksi layar mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Standar breakpoint mobile (md di Tailwind)
    if (isMobile) {
      setLimit(10);
    } else {
      setLimit(9);
    }
  }, []); // Berjalan sekali saat mount
  const CafeMap = dynamic(() => import("@/components/CafeMap"), {
    ssr: false,
  });

  // FILTER LOGIC
  const filteredCafes = cafes.filter((cafe) => {
    const q = query.toLowerCase();
    return (
      cafe.name.toLowerCase().includes(q) ||
      cafe.address.toLowerCase().includes(q) ||
      cafe.vibe.join(" ").toLowerCase().includes(q)
    );
  });

  // DATA YANG DITAMPILKAN (Bukan di-page, tapi di-slice sampai limit)
  const currentCafes = filteredCafes.slice(0, limit);

  // FUNGSI LOAD MORE
  const handleLoadMore = () => {
    setLimit((prev) => prev + 6); // Tambah 6 cafe setiap kali klik
  };

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-12 space-y-6">
      <SupportModal /> {/* Taruh di sini */}
      {/* HEADER */}
      {/* Container Header dibuat Center secara keseluruhan */}
      <header className="flex flex-col items-center text-center space-y-6 md:space-y-8">
        {/* 1. BADGE - Center */}
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-amber-500 border border-amber-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          Coffee & Space Directory
        </div>

        {/* 2. TITLE & DESCRIPTION - Center */}
        <div className="space-y-3 md:space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]">
            Palembang <span className="text-amber-500 italic">Coffee Map.</span>
          </h1>
          <p className="mx-auto text-sm md:text-lg text-zinc-400 max-w-xl md:max-w-2xl leading-relaxed font-medium">
            Temukan tempat ngopi dan{" "}
            <span className="text-zinc-200">hangout spots</span> terbaik di Kota
            Pempek. Mulai dari{" "}
            <span className="text-zinc-200">specialty coffee</span> hingga spot
            santai dengan menu makanan juara.
          </p>
        </div>

        {/* 3. SEARCH BAR - Sekarang di Tengah */}
        <div className="w-full max-w-2xl mx-auto pt-2 md:pt-4">
          <SearchBar value={query} onChange={setQuery} />

          {/* Hint kecil di bawah search bar biar makin cakep */}
          <p className="mt-3 text-[10px] md:text-xs text-zinc-500 font-medium">
            Coba cari:{" "}
            <span className="text-zinc-400 italic">
              &quot;Kambang Iwak&quot;, &quot;WFC&quot;, atau &quot;Cozy&quot;
            </span>
          </p>
        </div>
      </header>
      {/* MAP SECTION */}
      <section className="overflow-hidden rounded-3xl border-4 border-zinc-800 shadow-2xl">
        <CafeMap cafes={filteredCafes} />
      </section>
      {/* MAP INFO */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/70 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          {filteredCafes.length} Cafe ditemukan
        </span>
        <span className="text-zinc-600">|</span>
        <span>☕ Hidden Gem & Hits</span>
        <span className="text-zinc-600">|</span>
        <span>💻 WFC Friendly</span>
      </div>
      {/* CTA SECTION */}
      <div className="-mt-6">
        <ServiceCTA />
      </div>
      {/* LIST SECTION */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center justify-between px-1">
          <h3
            id="rekomendasi-section"
            className="text-2xl font-bold text-white tracking-tight"
          >
            Rekomendasi Cafe
          </h3>

          <span className="text-xs md:text-sm text-zinc-500 font-medium  px-3 py-1 ">
            Menampilkan {currentCafes.length} dari {filteredCafes.length}
          </span>
        </div>

        {/* GRID WITH FRAMER MOTION */}
        <section className="grid grid-cols-2 gap-3 md:gap-8 lg:grid-cols-3">
          {currentCafes.map((cafe) => (
            <div key={cafe.id} className="animate-fade-in-up">
              <CafeCard cafe={cafe} />
            </div>
          ))}
        </section>

        {/* EMPTY STATE */}
        {filteredCafes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-500 py-20 border-2 border-dashed border-white/5 rounded-3xl"
          >
            <p className="text-lg">
              Tidak ada cafe yang cocok dengan pencarian kamu ☕
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-amber-500 hover:underline font-bold"
            >
              Reset Pencarian
            </button>
          </motion.div>
        )}

        {/* LOAD MORE BUTTON */}
        {limit < filteredCafes.length && (
          <div className="mt-12 flex items-center justify-center pt-8 border-t border-white/5">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 transition-all hover:border-amber-500/50 hover:bg-amber-500/5 active:scale-95"
            >
              <Plus
                size={16}
                className="text-amber-500 transition-transform group-hover:rotate-90 duration-300"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white">
                Muat Lebih Banyak
              </span>
            </button>
          </div>
        )}

        {/* INFO JIKA SUDAH SEMUA TERLIHAT */}
        {limit >= filteredCafes.length && filteredCafes.length > 0 && (
          <p className="text-center text-zinc-600 text-xs font-bold uppercase tracking-[0.2em] pt-10">
            Kamu telah menjelajahi semua tempat ngopi ☕
          </p>
        )}
      </div>
      {/* FLOATING SAWERIA BUTTON */}
      {/* FLOATING SAWERIA BUTTON */}
      <a
        href="https://saweria.co/mseptiawan"
        target="_blank"
        rel="noopener noreferrer"
        // Ukuran p-2.5 di mobile biar gak kegedean, md:px-5 md:py-3 di desktop
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[999] flex items-center gap-2 rounded-full bg-[#faad14] p-2.5 md:px-5 md:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 transition-all hover:scale-110 active:scale-95 group"
      >
        <div className="relative">
          {/* Notifikasi Dot - Dibuat lebih kecil di mobile */}
          <div className="absolute -right-0.5 -top-0.5 flex h-2 w-2 md:h-3 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-red-600"></span>
          </div>

          {/* SVG Icon - Ukuran adaptif */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-5 md:h-5 text-zinc-900 group-hover:rotate-12 transition-transform duration-300"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        </div>

        {/* Text: Muncul di Desktop, di Mobile hanya icon biar bersih */}
        <span className="hidden md:block text-[11px] font-black uppercase tracking-tighter text-zinc-900">
          Traktir Kopi
        </span>
      </a>
    </main>
  );
}

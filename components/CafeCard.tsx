"use client";

import Link from "next/link";
import { Star, MapPin, ArrowRight, Coffee } from "lucide-react";
import { motion } from "framer-motion"; // 👈 Import framer-motion

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
    <motion.div
      // ✨ Animasi Masuk/Keluar
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout // 👈 Menghaluskan pergerakan posisi card
      className="h-full"
    >
      <Link
        href={`/cafe/${cafe.slug}`}
        /* p-4 di mobile, p-6 di desktop */
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl md:rounded-2xl border border-white/5 bg-zinc-900/40 p-4 md:p-6 transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/40 hover:bg-zinc-800/60 hover:shadow-2xl hover:shadow-amber-500/10"
      >
        <div className="relative z-10">
          {/* Header: Nama & Rating */}
          <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between md:gap-2">
            <h2 className="text-sm md:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-0">
              {cafe.name}
            </h2>

            <div className="flex w-fit items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 md:py-1 text-[10px] md:text-sm font-bold text-amber-500 border border-amber-500/20">
              <Star size={10} className="md:w-3.5" fill="currentColor" />
              {/* Gunakan Number() untuk memastikan nilai null dianggap 0 saat pengecekan */}
              {cafe.rating && Number(cafe.rating) > 0
                ? cafe.rating.toFixed(1)
                : "New"}
            </div>
          </div>

          {/* Alamat dengan Icon */}
          <div className="mt-2 md:mt-3 flex items-start gap-1 text-zinc-400">
            <MapPin
              size={12}
              className="mt-0.5 shrink-0 text-zinc-500 md:w-4"
            />
            <p className="text-[10px] md:text-sm leading-relaxed line-clamp-1 md:line-clamp-2 group-hover:text-zinc-300 transition-colors">
              {cafe.address}
            </p>
          </div>

          {/* Vibe Tags */}
          <div className="mt-3 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
            {/* Mobile View */}
            <div className="flex md:hidden">
              {cafe.vibe.slice(0, 1).map((v) => (
                <span
                  key={v}
                  className="rounded-md bg-zinc-800/50 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-400 border border-zinc-700/50"
                >
                  {v}
                </span>
              ))}
            </div>
            {/* Desktop View */}
            <div className="hidden md:flex flex-wrap gap-2">
              {cafe.vibe.slice(0, 3).map((v) => (
                <span
                  key={v}
                  className="rounded-md bg-zinc-800/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border border-zinc-700/50 group-hover:border-amber-500/30 group-hover:text-amber-200 transition-colors"
                >
                  {v}
                </span>
              ))}
            </div>
            {cafe.vibe.length > 3 && (
              <span className="text-[9px] md:text-[10px] text-zinc-500 font-medium self-center">
                +{cafe.vibe.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer: Area Aksi */}
        <div className="mt-4 md:mt-8 pt-3 md:pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1 md:gap-2 text-zinc-500 group-hover:text-amber-400/80 transition-colors">
            <Coffee size={12} className="md:w-4" />
            <span className="text-[8px] md:text-[11px] font-bold uppercase tracking-widest truncate max-w-[50px] md:max-w-none">
              Cafe
            </span>
          </div>

          <div className="flex items-center text-[10px] md:text-sm font-bold text-zinc-400 group-hover:text-amber-400 transition-all">
            <span className="hidden md:inline opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[11px] uppercase tracking-tighter">
              Lihat detail
            </span>
            <ArrowRight
              size={14}
              className="ml-1 md:w-[18px] transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>

        {/* Efek Glow Melayang */}
        <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />
      </Link>
    </motion.div>
  );
}

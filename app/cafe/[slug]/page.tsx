"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Wallet,
  Instagram,
  Star,
  Navigation,
  X,
  Maximize2,
  Image as ImageIcon,
  BookOpen,
  Coffee,
} from "lucide-react";
import { cafeImage } from "@/lib/cafeImage";
import cafes from "@/data/cafes.json";

export default function CafeDetail({ params }: { params: { slug: string } }) {
  const cafe = cafes.find((c) => c.slug === params.slug);
  const [activeTab, setActiveTab] = useState<"gallery" | "menu">("gallery");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!cafe) return notFound();

  const handleOpenImage = (src: string) => setSelectedImage(src);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-zinc-100 pb-1">
      {/* 1. MODAL LIGHTBOX */}
      {selectedImage && (
        <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-[10000] p-3 bg-zinc-800 rounded-full text-white hover:bg-zinc-700 transition-all"
          >
            <X size={24} />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Fullscreen view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 2. HEADER NAV */}
      {/* 2. HEADER NAV (Modern Glassmorphism) */}
      <nav className="sticky top-0 z-[60] bg-[#0A0A0A] backdrop-blur-xl  px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Back Button dengan Blur Background tipis */}
          <Link
            href="/"
            className="group flex items-center gap-2 p-2 -ml-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-white active:scale-95"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </Link>

          {/* Sisi Kanan: Instagram & Opsional Actions */}
          <div className="flex items-center gap-2">
            <a
              href={cafe.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 rounded-full text-zinc-300 hover:text-white transition-all text-xs font-bold tracking-widest active:scale-95 shadow-lg"
            >
              {/* Ikon tetap tipis dan elegan */}
              <Instagram
                size={16}
                className="group-hover:text-pink-500 transition-colors"
              />
              <span className="uppercase">Instagram</span>
            </a>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION (Cover with Text Overlay) */}
      {/* 3. HERO SECTION (Tinggi Desktop +20px & Mobile Safe) */}
      <section className="relative w-full bg-[#0A0A0A]">
        <div className="mx-auto max-w-6xl px-0 md:px-6 md:pt-6">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[540px] w-full overflow-hidden md:rounded-xl border-b md:border border-white/10 bg-zinc-900">
            {/* LOGIKA GAMBAR / PLACEHOLDER */}
            {cafe.images?.cover ? (
              <Image
                src={cafeImage(cafe.slug, "cover", "cover")}
                alt={cafe.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            ) : (
              /* Tampilan Premium saat gambar tidak ada */
              <div className="relative flex h-full w-full items-center justify-center bg-zinc-950">
                {/* Efek Cahaya Dekoratif di Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full" />

                <div className="z-10 flex flex-col items-center gap-4 opacity-20">
                  <Coffee size={80} strokeWidth={1} className="text-white" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                    Image Not Available
                  </span>
                </div>
              </div>
            )}

            {/* Overlay Gradient: Tetap ada agar teks judul selalu kontras */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Title & Info Over Image */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-12 z-20">
              <div className="flex items-center gap-1.5 mb-2">
                <Star size={14} className="fill-amber-500 text-amber-500" />
                <span className="text-amber-500 font-bold text-sm">
                  {/* Fix rating toFixed agar tidak error jika rating null */}
                  {cafe.rating ? cafe.rating.toFixed(1) : "0.0"}
                </span>
              </div>

              <h1 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-[0.9] drop-shadow-2xl">
                {cafe.name}
              </h1>

              <div className="flex items-start gap-2 text-zinc-300 mt-4 max-w-md md:max-w-xl">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-500 md:w-5 md:h-5"
                />
                <p className="text-xs md:text-base leading-relaxed drop-shadow-md line-clamp-2 font-medium">
                  {cafe.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-4 pt-8 space-y-8">
        {/* 4. CTA BUTTON */}
        <div className="pt-2">
          <a
            href={cafe.maps}
            target="_blank"
            className="flex items-center justify-center gap-3 w-full bg-amber-500 text-black py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            <Navigation size={18} fill="currentColor" />
            Directly Open in Maps
          </a>
        </div>

        {/* STATS CARD */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-amber-500">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Open Hours
              </p>
              <p className="text-xs font-semibold">{cafe.open_hours}</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-amber-500">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Budget
              </p>
              <p className="text-xs font-semibold">{cafe.price_range}</p>
            </div>
          </div>
        </section>

        {/* TAB SYSTEM (GALLERY & MENU) */}
        <section className="space-y-4 pt-4">
          <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                activeTab === "gallery"
                  ? "bg-zinc-800 text-amber-500"
                  : "text-zinc-500"
              }`}
            >
              <ImageIcon size={14} /> GALLERY
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                activeTab === "menu"
                  ? "bg-zinc-800 text-amber-500"
                  : "text-zinc-500"
              }`}
            >
              <BookOpen size={14} /> MENU
            </button>
          </div>

          <div className="min-h-[200px]">
            {activeTab === "gallery" ? (
              /* --- LOGIKA GALLERY --- */
              cafe.images?.gallery && cafe.images.gallery.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {cafe.images.gallery.map((img: string) => {
                    const src = cafeImage(
                      cafe.slug,
                      `gallery/${img}`,
                      "gallery"
                    );
                    return (
                      <div
                        key={img}
                        onClick={() => handleOpenImage(src)}
                        className="group relative aspect-square rounded-xl overflow-hidden cursor-zoom-in border border-white/5"
                      >
                        <Image
                          src={src}
                          alt="Gallery"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={20} className="text-white" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty State Gallery */
                <div className="flex flex-col items-center justify-center py-12 bg-zinc-900/30 rounded-2xl border border-dashed border-white/5">
                  <ImageIcon size={32} className="text-zinc-700 mb-2" />
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                    Belum ada foto galeri
                  </p>
                </div>
              )
            ) : /* --- LOGIKA MENU --- */
            cafe.images?.menu && cafe.images.menu.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {cafe.images.menu.map((img: string) => {
                  const src = cafeImage(cafe.slug, `menu/${img}`, "menu");
                  return (
                    <div
                      key={img}
                      onClick={() => handleOpenImage(src)}
                      className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-zoom-in border border-white/5 bg-zinc-900 shadow-lg"
                    >
                      <Image
                        src={src}
                        alt="Menu"
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State Menu */
              <div className="flex flex-col items-center justify-center py-12 bg-zinc-900/30 rounded-2xl border border-dashed border-white/5">
                <BookOpen size={32} className="text-zinc-700 mb-2" />
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                  Daftar menu belum tersedia
                </p>
              </div>
            )}
          </div>
        </section>

        {/* DESCRIPTION & VIBES */}
        <div className="space-y-10 pt-6">
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              About Cafe
            </h3>
            <div className="space-y-4">
              {cafe.description.split("\n").map((para, index) => (
                <p
                  key={index}
                  className="text-zinc-300 text-base leading-relaxed italic font-light"
                >
                  &quot;{para.trim()}&quot;
                </p>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
              Atmosphere & Vibes
            </h3>
            <div className="flex flex-wrap gap-2">
              {cafe.vibe.map((v) => (
                <span
                  key={v}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider shadow-sm"
                >
                  {v}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* MINI AGENCY FOOTER */}
        {/* 5. MINI AGENCY FOOTER (Premium Look) */}
        <footer className="mt-20 pb-4 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Garis Dekoratif Halus */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-zinc-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-zinc-800" />
            </div>

            <div className="text-center space-y-2">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em] leading-none">
                Pemenang Karir
              </p>
              <p className="text-[9px] font-bold text-zinc-800 uppercase tracking-[0.3em]">
                Est. 2024 — Digital Curation
              </p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}

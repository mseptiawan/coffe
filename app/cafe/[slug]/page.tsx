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
  const mainImage = cafe.images?.gallery?.[0]
    ? cafeImage(cafe.slug, `gallery/${cafe.images.gallery[0]}`, "gallery")
    : null;
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
              alt={`Suasana di ${cafe.name}`} // Lebih deskriptif
              fill
              className="object-contain"
              priority // Agar gambar modal langsung tajam saat terbuka
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
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[480px] w-full overflow-hidden md:rounded-[2rem] border-b md:border border-white/10 bg-zinc-950">
            {/* BACKGROUND ILLUSTRATION (Ganti Image) */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              {/* Efek Ambient Glow yang lebih dinamis */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />

              {/* Ikon Kopi sebagai Centerpiece */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                  {/* Dekorasi lingkaran di belakang ikon */}
                  <div className="absolute inset-0 scale-150 border border-white/5 rounded-full" />
                  <div className="absolute inset-0 scale-[2] border border-white/[0.02] rounded-full" />

                  <Coffee
                    size={120}
                    strokeWidth={0.5}
                    className="text-amber-500/40 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                  />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                    Palembang Coffee Map
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                </div>
              </div>

              {/* Background Pattern (Optional: Bikin tekstur biar ga polos banget) */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Overlay Gradient (Dibuat lebih gelap di bawah agar teks terbaca) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />

            {/* Title & Info Over Image */}
            <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 z-30">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <span className="text-amber-500 font-black text-xs">
                    {cafe.rating ? cafe.rating.toFixed(1) : "0.0"}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Featured Destination
                </span>
              </div>

              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-[0.85] drop-shadow-2xl">
                {cafe.name}
              </h1>

              <div className="flex items-start gap-2 text-zinc-300 mt-5 max-w-md md:max-w-xl">
                <MapPin size={18} className="mt-0.5 shrink-0 text-amber-500" />
                <p className="text-sm md:text-lg leading-relaxed font-medium text-zinc-400">
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
                          alt={`Interior dan suasana di ${cafe.name} Palembang`}
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
                        alt={`Daftar menu makanan dan minuman di ${cafe.name}`}
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
      {/* 1.5 JSON-LD Schema (SEO Robot) */}
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: cafe.name,
            description: cafe.description?.replace(/\n/g, " "),
            image: mainImage,
            address: {
              "@type": "PostalAddress",
              streetAddress: cafe.address,
              addressLocality: "Palembang",
              addressRegion: "Sumatera Selatan",
              addressCountry: "ID",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: cafe.rating || 0,
              bestRating: "5",
              worstRating: "1",
              ratingCount: "1",
            },
            priceRange: cafe.price_range,
            servesCuisine: "Coffee & Snack",
          }),
        }}
      />
    </main>
  );
}

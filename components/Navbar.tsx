"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // 1. Cek apakah ini halaman detail (slug cafe)
  const isDetailPage = pathname.startsWith("/cafe/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Coffee Map", href: "/", isExternal: false },
    {
      name: "Layanan",
      href: "https://pemenangkarir.vercel.app",
      isExternal: true,
    },
    { name: "Blog", href: "https://mdx-blog-ms.vercel.app", isExternal: true },
  ];

  // 2. Tentukan warna background & border berdasarkan kondisi
  // Jika Detail Page -> Hitam Pekat langsung
  // Jika Home -> Transparent, lalu Hitam saat scroll
  const getNavbarStyles = () => {
    if (isDetailPage) {
      return "border-white/10 bg-[#0A0A0A] py-3 shadow-2xl";
    }
    if (scrolled) {
      return "border-white/10 bg-zinc-950/90 backdrop-blur-xl py-3 shadow-lg";
    }
    return "border-transparent bg-transparent py-5";
  };

  return (
    <nav
      className={`fixed top-0 z-[9999] w-full transition-all duration-500 border-b ${getNavbarStyles()}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="rounded-xl bg-amber-500 p-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform">
                <Coffee size={18} className="text-black" strokeWidth={3} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-white leading-none uppercase">
                Pemenang<span className="text-amber-500">Karir</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                Spot Directory
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  {link.name}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                  />
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                    pathname === link.href
                      ? "text-amber-500"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white p-2 transition-transform active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 w-full backdrop-blur-xl border-b border-white/10 px-6 py-8 md:hidden flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-300 ${
            // LOGIKA BARU:
            // 1. Jika di detail page -> Selalu Hitam Pekat (#0A0A0A)
            // 2. Jika di Home & sudah scroll -> Hitam Zinc (Zinc-950/95)
            // 3. Jika di Home & belum scroll -> Transparan (agar gradasi amber body kelihatan)
            isDetailPage
              ? "bg-[#0A0A0A]"
              : scrolled
              ? "bg-zinc-950/95"
              : "bg-transparent"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
              onClick={() => !link.isExternal && setIsOpen(false)}
            >
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  {link.name}
                </span>
                {link.isExternal && (
                  <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mt-1">
                    External Link
                  </span>
                )}
              </div>

              {link.isExternal ? (
                <ArrowUpRight size={14} className="text-amber-500" />
              ) : (
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    pathname === link.href
                      ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]"
                      : "bg-zinc-800"
                  }`}
                />
              )}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

import Link from "next/link";
import { Coffee, Instagram, Twitter, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/5 bg-zinc-950 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* 1. BRAND SECTION */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="rounded-xl bg-amber-500 p-2">
                <Coffee size={18} className="text-black" strokeWidth={3} />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase italic">
                Pemenang<span className="text-amber-500 not-italic">KARIR</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-medium">
              Kurasi tempat nongkrong, workspace, dan kopi terbaik di Kota
              Pempek. Membantumu menemukan sudut ternyaman untuk setiap momen.
            </p>
          </div>

          {/* 2. EXPLORE SECTION */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Coffee Map
                </Link>
              </li>
              <li>
                <a
                  href="https://mdx-blog-ms.vercel.app"
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Blog <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://pemenangkarir.vercel.app"
                  target="_blank"
                  className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Layanan <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          {/* 3. SUPPORT SECTION */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://forms.gle/sWaTY4NXcxBEC1jq9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-amber-500 transition-colors font-medium flex items-center gap-1.5"
                >
                  Tambah Tempat{" "}
                  <ArrowUpRight size={14} className="opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:mseptiawan017@gmail.com"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Hubungi Kami
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            © {currentYear} PemenangKarir • Made in Palembang
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <span className="hover:text-zinc-400 cursor-default">V.1.0.4</span>
            <span className="hover:text-zinc-400 cursor-default">
              Status: Stable
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

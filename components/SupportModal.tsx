"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, X, Heart } from "lucide-react";

export default function SupportModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Munculkan pop-up setelah 4 detik user buka web
    const timer = setTimeout(() => {
      // Cek apakah user sudah pernah menutup pop-up ini sebelumnya (biar ga muncul terus tiap refresh)
      const hasSeenModal = localStorage.getItem("hasSeenSupportModal");
      if (!hasSeenModal) {
        setIsOpen(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const closeBase = () => {
    setIsOpen(false);
    // Simpan status agar tidak muncul lagi di kunjungan berikutnya hari ini
    localStorage.setItem("hasSeenSupportModal", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Overlay Gelap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBase}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Konten Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 p-8 shadow-2xl"
          >
            {/* Tombol Close */}
            <button
              onClick={closeBase}
              className="absolute right-6 top-6 text-zinc-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <Coffee size={40} strokeWidth={2.5} />
              </div>

              <h3 className="mb-2 text-2xl font-black tracking-tight text-white">
                Support Project Ini!{" "}
                <Heart size={20} className="inline text-red-500 fill-red-500" />
              </h3>

              <p className="mb-8 text-sm leading-relaxed text-zinc-400">
                Bantu kami tetap independen dalam mengkurasi tempat ngopi
                terbaik di Palembang. Setiap traktir kopi sangat berarti untuk
                operasional web ini.
              </p>

              <div className="flex flex-col w-full gap-3">
                <a
                  href="https://saweria.co/mseptiawan"
                  target="_blank"
                  onClick={closeBase}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#faad14] py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Traktir Kopi ☕
                </a>

                <button
                  onClick={closeBase}
                  className="text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-400"
                >
                  Mungkin Nanti
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

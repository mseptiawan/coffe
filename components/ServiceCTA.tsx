import {
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function ServiceCTA() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl">
        {/* Glow Halus di Background */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-600/10 blur-[60px]" />

        <div className="relative p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-lg space-y-5">
              {/* Badge Mini */}
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 border border-blue-500/20">
                <ShieldCheck size={12} />
                Scalable Business System
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-black leading-tight text-white">
                  Modernisasi bisnis kamu <br />
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    dengan sistem yang tepat.
                  </span>
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">
                  <span className="font-bold text-zinc-200">
                    Pemenang Karir
                  </span>{" "}
                  membantu membangun infrastruktur digital agar operasional
                  bisnis lebih terstruktur dan siap untuk ekspansi.
                </p>
              </div>

              {/* List Simpel - Fokus pada Sistem & Bisnis */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Automasi Operasional",
                  "Sistem Integrasi",
                  "Digitalisasi UMKM",
                  "Optimasi Workflow",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[11px] font-bold text-zinc-500"
                  >
                    <CheckCircle2 size={14} className="text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol yang lebih ramping */}
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="https://pemenangkarir.vercel.app"
                target="_blank"
                className="group flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-black text-zinc-900 transition-all hover:bg-blue-50 hover:scale-105 active:scale-95"
              >
                Solusi Bisnis
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href="https://wa.me/6289630909617"
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-800/50 px-6 py-3 text-xs font-bold text-white hover:bg-zinc-800 hover:border-white/20 active:scale-95"
              >
                <MessageCircle size={16} className="text-blue-400" />
                Konsultasi Strategis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

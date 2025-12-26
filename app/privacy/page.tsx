import Link from "next/link";
import { ArrowLeft, ShieldCheck, Info, Mail } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "27 Desember 2025";

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      {/* Tombol Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors mb-12 text-sm font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={16} /> Kembali ke Map
      </Link>

      {/* Header Halaman */}
      <header className="space-y-6 mb-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 border border-amber-500/20">
          Legal Documentation
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">
          Privacy & <br />
          <span className="text-amber-500 not-italic">Disclaimer.</span>
        </h1>
        <p className="text-zinc-500 font-medium tracking-wide">
          Terakhir diperbarui pada {lastUpdated}
        </p>
      </header>

      <div className="space-y-16">
        {/* SECTION 1: DISCLAIMER */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-white">
            <Info className="text-amber-500" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Disclaimer Konten
            </h2>
          </div>
          <div className="space-y-4 text-zinc-400 leading-relaxed font-medium">
            <p>
              Pemenang Karir Spot Directory adalah platform kurasi independen.
              Seluruh data yang ditampilkan (nama tempat, lokasi, jam buka)
              dikumpulkan dari sumber publik guna kepentingan informasi dan
              promosi tempat terkait.
            </p>
            <p>
              <strong className="text-white">Hak Cipta:</strong> Kami tidak
              mengklaim kepemilikan atas foto atau merek dagang yang
              ditampilkan. Hak cipta sepenuhnya milik pemilik cafe atau
              fotografer asli. Penggunaan media di platform ini bertujuan untuk
              membantu visualisasi bagi pengguna.
            </p>
            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl italic">
              "Jika Anda adalah pemilik bisnis dan ingin informasi atau foto
              Anda dihapus/diperbarui, kami akan melakukannya dengan segera
              setelah menerima laporan Anda."
            </div>
          </div>
        </section>

        {/* SECTION 2: PRIVACY POLICY */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-white">
            <ShieldCheck className="text-amber-500" size={24} />
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Privacy Policy
            </h2>
          </div>
          <div className="space-y-4 text-zinc-400 leading-relaxed font-medium">
            <p>
              Kami sangat menjaga privasi pengunjung. Berikut adalah poin-poin
              sederhana mengenai data Anda:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong className="text-zinc-200">Data Pengunjung:</strong> Kami
                tidak mengharuskan Anda untuk login atau memberikan identitas
                pribadi untuk menggunakan peta ini.
              </li>
              <li>
                <strong className="text-zinc-200">Cookies & Analytics:</strong>{" "}
                Kami menggunakan cookies dasar untuk menyimpan preferensi
                tampilan dan menganalisis jumlah kunjungan secara anonim.
              </li>
              <li>
                <strong className="text-zinc-200">Pihak Ketiga:</strong>{" "}
                Penggunaan fitur peta tunduk pada kebijakan privasi
                OpenStreetMap dan Leaflet sebagai penyedia layanan peta dasar.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: CONTACT */}
        <section className="pt-10 border-t border-white/5 space-y-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest">
            Ada Pertanyaan?
          </h3>
          <p className="text-zinc-400 font-medium">
            Hubungi tim{" "}
            <span className="text-white font-bold">Pemenang Karir</span> untuk
            urusan legal, kerjasama, atau permintaan penghapusan konten melalui:
          </p>
          <a
            href="mailto:mseptiawan017@gmail.com"
            className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-amber-500 transition-colors"
          >
            <Mail size={16} /> admin@pemenangkarir.com
          </a>
        </section>
      </div>

      {/* Footer sederhana khusus halaman policy */}
      <footer className="mt-24 pt-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
          © 2025 Pemenang Karir • Palembang, Indonesia
        </p>
      </footer>
    </main>
  );
}

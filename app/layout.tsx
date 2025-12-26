import { Plus_Jakarta_Sans } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 👈 Pastikan path import benar
import Footer from "@/components/Footer";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${jakartaSans.className} bg-zinc-950 text-white antialiased`}
      >
        {/* 1. Navbar diletakkan di sini agar tersedia di semua halaman */}
        <Navbar />

        {/* 2. Wrapper dengan padding-top (pt-20) agar konten tidak tertutup Navbar */}
        <div className="pt-20 md:pt-24">{children}</div>

        <Footer />
        {/* Bisa juga tambahin Footer di sini nanti */}
      </body>
    </html>
  );
}

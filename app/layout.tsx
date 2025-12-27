"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import { usePathname } from "next/navigation";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. Definisikan font di luar komponen agar bisa diakses
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 2. Cek apakah sedang di halaman detail cafe
  const isDetailPage = pathname.startsWith("/cafe/");

  return (
    <html lang="id">
      <body
        className={`${
          jakartaSans.className
        } antialiased transition-colors duration-500 ${
          isDetailPage ? "bg-[#0A0A0A]" : ""
        }`}
      >
        {/* Wrapper tambahan untuk memastikan gradasi Amber di CSS 
           tertutup sempurna saat di halaman detail 
        */}
        <div
          className={`min-h-screen flex flex-col ${
            isDetailPage ? "bg-[#0A0A0A]" : "bg-transparent"
          }`}
        >
          <Navbar />

          <main className="flex-grow pt-20 md:pt-24">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}

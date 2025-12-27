import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import ClientLayout from "@/components/ClientLayout"; // Kita pindahkan logic client ke sini

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

// --- METADATA GLOBAL (Server Side) ---
export const metadata: Metadata = {
  title: {
    default: "Palembang Coffee Map | Temukan Cafe Terbaik",
    template: "%s | Palembang Coffee Map", // Ini akan otomatis nambahin nama cafe di belakang
  },
  description:
    "Direktori cafe terlengkap di Palembang. Temukan tempat nongkrong, WFC, dan kopi terbaik.",
  keywords: [
    "Cafe Palembang",
    "Kopi Palembang",
    "WFC Palembang",
    "Tempat Nongkrong",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${jakartaSans.className} antialiased transition-colors duration-500`}
      >
        {/* Pindahkan logic pathname ke component ClientLayout agar metadata tetap bisa di Server */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

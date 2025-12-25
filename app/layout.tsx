import { Plus_Jakarta_Sans } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

// Setting font Plus Jakarta Sans
const jakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* Terapkan font ke className body */}
      <body className={jakartaSans.className}>{children}</body>
    </html>
  );
}
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith("/cafe/");

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDetailPage ? "bg-[#0A0A0A]" : "bg-transparent"
      }`}
    >
      <Navbar />
      <main className="flex-grow pt-20 md:pt-24">{children}</main>
      <Footer />
    </div>
  );
}

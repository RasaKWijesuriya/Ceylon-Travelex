import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "@/app/components/Footer";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ceylon Travelex",
  description: "Bespoke journeys across Sri Lanka & the Indian Ocean.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] " +
        (scrolled
          ? "backdrop-blur bg-black/45 border-b border-white/10"
          : "bg-gradient-to-b from-black/35 via-black/10 to-transparent")
      }
    >
      <div className="mx-auto max-w-7xl px-4">
       
        <div className="flex h-[76px] items-center">
         
          <Link
            href="/"
            className="font-display text-xl tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          >
            Ceylon Travelex
          </Link>

        
          <div className="ml-auto flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-white/90 hover:text-white transition drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/enquire"
              className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-medium text-white hover:bg-amber-400/20"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

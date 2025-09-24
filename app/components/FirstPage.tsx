"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollCue from "@/app/components/ScrollCue";

export default function FirstPage() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero-sigiriya.jpg"
        alt="Sigiriya at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />
      
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.35)_100%)]" />

     
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-[76px] pb-28 md:pb-36 lg:pb-44">
        <div className="mx-auto max-w-4xl text-center pt-10 md:pt-14">
         
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest"
          >
            <span className="text-amber-400">✧</span> Bespoke Journeys
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            className="mt-4 font-display text-5xl leading-[1.12] drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] md:text-7xl"
          >
            Where Luxury Meets <span className="text-amber-400">Longitude</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
            className="mt-6 text-lg text-white/85"
          >
            Curated escapes across Sri Lanka and the Indian Ocean—effortless,
            discreet, and tailored to your taste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black shadow hover:brightness-105"
            >
              Design My Journey →
            </Link>
            <Link
              href="/#destinations"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Explore Experiences
            </Link>
          </motion.div>
        </div>
      </div>

     
      <ScrollCue className="md:bottom-[clamp(20px,6dvh,64px)]" />
    </section>
  );
}

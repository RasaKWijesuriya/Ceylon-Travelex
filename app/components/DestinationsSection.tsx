"use client";
import { useEffect, useState } from "react";
import DestinationCard, { Destination } from "./DestinationCard";

export default function DestinationsSection() {
  const [items, setItems] = useState<Destination[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/destinations?featured=1", { cache: "no-store" });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Failed to load");
        if (mounted) setItems(json.data);
      } catch (e: any) {
        setError(e.message || "Failed to load");
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section id="destinations" className="mx-auto max-w-7xl px-4 py-20">
      {/* small pill */}
      <div className="mb-3 flex justify-center">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80">
          Featured Destinations
        </span>
      </div>

      <h2 className="mb-10 text-center font-display text-3xl md:text-4xl">
        Curated Escapes
      </h2>

      {error && (
        <p className="text-center text-sm text-red-300">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {!items &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-[360px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}

        {items?.map((d) => <DestinationCard key={d.id} d={d} />)}
      </div>
    </section>
  );
}

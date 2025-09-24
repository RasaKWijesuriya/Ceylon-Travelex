"use client";
import Image from "next/image";
import Link from "next/link";

export type Destination = {
  id: string;
  name: string;
  country: string;
  region_code?: string;
  tagline?: string;
  hero_url: string | null; // allow null from DB
  price_from: number;
};

const LOCAL_BASE = "/images/destinations/";
const PLACEHOLDER = "/images/destinations/placeholder.jpg"; // put a small jpg here

function formatPrice(n: number) {
  return `from $${Math.round(n).toLocaleString("en-US")}`;
}

function resolveImageSrc(u?: string | null) {
  const s = (u ?? "").trim();

  // nothing in DB -> fallback
  if (!s) return PLACEHOLDER;

  // full remote URL
  if (/^https?:\/\//i.test(s)) return s;

  // already a public path (must start with '/')
  if (s.startsWith("/")) return s;

  // treat as filename from our public folder
  // IMPORTANT: forward slashes only
  return LOCAL_BASE + s;
}


export default function DestinationCard({ d }: { d: Destination }) {
  const imgSrc = resolveImageSrc(d.hero_url);

  return (
    <article
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
    >
      {/* Image */}
      <div className="relative">
        <Image
          src={imgSrc}                                 // ← use the resolved src
          alt={d.name}
          width={1200}
          height={800}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 45vw, 100vw"
          priority={false}
        />

        {/* price pill */}
        <div className="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-black shadow">
          {formatPrice(d.price_from)}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 px-5 pb-5 pt-4">
        {/* small meta (region/country) */}
        <div className="flex items-center gap-2 text-xs text-white/70">
          {/* tiny pin icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" className="text-amber-400">
            <path
              fill="currentColor"
              d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5Z"
            />
          </svg>
          <span>{d.country}</span>
        </div>

        <h3 className="font-display text-lg leading-tight">{d.name}</h3>

        {d.tagline ? <p className="text-sm text-white/75">{d.tagline}</p> : null}

        <div className="pt-2">
          <Link
            href={`/contact?destination=${encodeURIComponent(d.id)}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            Enquire Now <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

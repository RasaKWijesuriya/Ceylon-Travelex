import { Star } from "lucide-react";

export type TestimonialItem = {
  id: number;
  quote: string;
  author: string;
  city?: string | null;
  country?: string | null;
  rating?: number | null; 
};

export default function TestimonialsSection({
  items = [],
}: { items?: TestimonialItem[] }) {
  
  const fallback: TestimonialItem[] = [
    {
      id: 1,
      quote:
        "From candlelit ramparts to sunrise at Sigiriya—every detail felt written just for us.",
      author: "A. Bennett",
      city: "London",
      country: "UK",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "Effortless, discreet, and beyond five-star. A curator who truly listened.",
      author: "S. Kumar",
      city: "New York",
      country: "USA",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "Quiet luxury without the crowds. We’ll be back.",
      author: "L. Garda",
      city: "Sydney",
      country: "Australia",
      rating: 5,
    },
  ];

  const data = items.length ? items : fallback;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
      {/* heading */}
      <div className="text-center">
        <div className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400">
          <span className="h-px w-10 bg-amber-400/50" />
          Testimonials
          <span className="h-px w-10 bg-amber-400/50" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl">
          Cherished Memories
        </h2>
      </div>

      {/* grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {data.map((t) => {
          const stars = Math.max(1, Math.min(5, t.rating ?? 5));
          const location = [t.city, t.country].filter(Boolean).join(", ");

          return (
            <article
              key={t.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            >
              {/* stars */}
              <div className="mb-4 flex gap-1 text-amber-400">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>

              {/* quote */}
              <p className="text-lg italic text-white/90">“{t.quote}”</p>

              <hr className="my-6 border-white/10" />

              {/* author + location */}
              <p className="font-semibold">{t.author}</p>
              {location && (
                <p className="text-sm text-white/70">{location}</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

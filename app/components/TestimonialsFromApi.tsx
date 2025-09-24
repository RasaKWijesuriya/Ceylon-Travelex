// app/components/TestimonialsFromApi.tsx
import TestimonialsSection, {
  TestimonialItem,
} from "./TestimonialsSection";

export default async function TestimonialsFromApi() {
  // If you deploy behind a proxy, you may already have a helper that builds the base URL.
  // In dev, this relative URL works fine in a Server Component:
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/testimonials`, {
    // always fresh in dev; adjust to your needs
    cache: "no-store",
  });

  if (!res.ok) {
    // Fallback to the static version if API fails
    return <TestimonialsSection />;
  }

  const json = await res.json();

  // IMPORTANT: map API payload -> component shape.
  // If your route returns { author: "...", city, country, rating }, use those keys.
  // If it returns author_name instead, swap to author: r.author_name.
  const items: TestimonialItem[] =
    (json?.data ?? []).map((r: any) => ({
      id: r.id,
      quote: r.quote,
      author: r.author ?? r.author_name, // support both if needed
      city: r.city ?? null,
      country: r.country ?? null,
      rating: r.rating ?? 5,
    })) ?? [];

  return <TestimonialsSection items={items} />;
}

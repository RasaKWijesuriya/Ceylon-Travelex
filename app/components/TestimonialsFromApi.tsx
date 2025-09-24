import TestimonialsSection, {
  TestimonialItem,
} from "./TestimonialsSection";

export default async function TestimonialsFromApi() {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/testimonials`, {
    
    cache: "no-store",
  });

  if (!res.ok) {
    return <TestimonialsSection />;
  }

  const json = await res.json();

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

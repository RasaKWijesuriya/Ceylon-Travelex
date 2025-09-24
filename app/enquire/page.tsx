// app/enquire/page.tsx
import EnquiryForm from "../components/EnquiryForm";


export const metadata = {
  title: "Design Your Perfect Escape – Enquiry",
  description:
    "Share your vision and our private curator will craft a bespoke journey tailored to your desires.",
};

export default function EnquirePage() {
  return (
    <main className="relative mx-auto max-w-3xl px-4 py-16 md:py-20">
      {/* eyebrow */}
      <p className="text-center text-xs tracking-[0.25em] text-amber-400">
        BEGIN YOUR JOURNEY
      </p>

      {/* title */}
      <h1 className="mt-3 text-center font-display text-4xl md:text-5xl">
        Design Your Perfect Escape
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-center text-white/80">
        Share your vision and our private curator will craft a bespoke journey
        tailored to your desires.
      </p>

      <div className="mt-10">
        <EnquiryForm />
      </div>
    </main>
  );
}

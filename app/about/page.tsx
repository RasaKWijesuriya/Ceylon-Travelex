import Image from "next/image";

export const metadata = {
  title: "About — Ceylon Travelex",
  description:
    "Crafting bespoke, quietly luxurious journeys across Sri Lanka and the wider Indian Ocean.",
};

function DotDivider() {
  return <span className="mx-3 text-white/30">•</span>;
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="m5 12 4 4 10-10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl px-4 pt-[84px] pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-amber-400">
            Our Story
          </div>

          <h1 className="mt-4 font-display text-[36px] leading-tight text-white md:text-6xl">
            Crafting Journeys Beyond the Ordinary
          </h1>
        </div>

        <div className="mt-10 grid items-start gap-10 md:mt-14 md:grid-cols-12">
          <section className="md:col-span-6 lg:col-span-7">
            <div className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-amber-400">
              BESPOKE JOURNEYS
            </div>
            <div className="h-px w-16 bg-amber-400/40 mb-6" />

            <div className="space-y-5 text-[15px] leading-relaxed text-white/85">
              <p>
                Ceylon Travelex was born from a simple belief: that travel should
                be as unique as the traveler. Founded by a team of Sri Lankan
                hospitality veterans and global travel curators, we specialize in
                crafting bespoke experiences across Sri Lanka and the wider Indian
                Ocean.
              </p>
              <p>
                Our approach is quietly luxurious—no ostentation, just thoughtful
                curation. We work with a network of boutique properties, local
                artisans, and cultural guides who share our commitment to
                authentic, sustainable travel. Every journey is designed from
                scratch, tailored to your preferences, and executed with the kind
                of attention to detail that makes the extraordinary feel effortless.
              </p>
            </div>

            <div className="my-8 h-px w-full bg-white/10" />
            <h3 className="mb-4 font-display text-xl text-white">
              What Sets Us Apart
            </h3>

            <ul className="space-y-5">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="font-medium text-white">Thoughtful Curation</div>
                  <div className="text-sm text-white/75">
                    Every experience is handpicked and personally vetted by our
                    team of local experts.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="font-medium text-white">Seamless Execution</div>
                  <div className="text-sm text-white/75">
                    From arrival to departure, every detail is managed with
                    precision and care.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/30">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                  <div className="font-medium text-white">
                    Cultural Authenticity
                  </div>
                  <div className="text-sm text-white/75">
                    Deep connections with local communities ensure genuine,
                    respectful encounters.
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <aside className="md:col-span-6 lg:col-span-5">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/hero-sigiriya.jpg"
                  alt="Tea-country sunrise—quiet mornings and misty valleys."
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="px-4 pb-4 pt-3 text-center">
                <p className="text-xs text-white/60">
                  The highland tea country of Sri Lanka, where Ceylon’s legacy
                  continues.
                </p>
              </div>
            </div>

            {/* Micro facts */}
            <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/85">
              <div>
                <div className="font-semibold text-white">2010</div>
                <div className="text-xs text-white/60">Founded</div>
              </div>
              <div>
                <div className="font-semibold text-white">+150</div>
                <div className="text-xs text-white/60">Private Partners</div>
              </div>
              <div>
                <div className="font-semibold text-white">24/7</div>
                <div className="text-xs text-white/60">Concierge</div>
              </div>
            </div>
          </aside>
        </div>

        {/* bottom separator */}
        <div className="mt-16 h-px w-full bg-white/10" />

        {/* Ethos / signature strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center text-sm text-white/70">
          <span>Designed with intention</span>
          <DotDivider />
          <span>Delivered with discretion</span>
          <DotDivider />
          <span>Rooted in Sri Lankan hospitality</span>
        </div>
      </div>
    </main>
  );
}

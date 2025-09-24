"use client";

import { Crown, Globe, Headphones, Heart } from "lucide-react";

const items = [
  {
    Icon: Crown,
    title: "Private Curator",
    desc: "Dedicated travel expert for every journey",
  },
  {
    Icon: Globe,
    title: "Exclusive Access",
    desc: "Hidden gems and private experiences",
  },
  {
    Icon: Headphones,
    title: "24/7 Concierge",
    desc: "Round-the-clock assistance during travel",
  },
  {
    Icon: Heart,
    title: "Bespoke Touches",
    desc: "Personalized details that matter to you",
  },
];

export default function Membership() {
  return (
    <section
      id="membership"
      className="relative bg-black py-20 md:py-28"
      aria-labelledby="membership-title"
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
       
        <div className="mb-6 flex items-center justify-center gap-3 text-xs tracking-[0.25em] text-amber-400">
          <span className="h-px w-10 bg-amber-400/50" />
          <span>MEMBERSHIP</span>
          <span className="h-px w-10 bg-amber-400/50" />
        </div>

        {/* headline */}
        <h2
          id="membership-title"
          className="font-display text-3xl leading-tight md:text-5xl"
        >
          Quiet Privileges, Just for You
        </h2>

        {/* feature grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="mx-auto max-w-[18rem] text-center"
            >
              
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border-2 border-amber-400/70 bg-amber-400/[0.07] shadow-[0_0_0_2px_rgba(0,0,0,0.35)]">
                <Icon className="h-7 w-7 text-amber-400" strokeWidth={1.8} />
              </div>

              <h3 className="mb-2 font-semibold text-lg">{title}</h3>
              <p className="text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

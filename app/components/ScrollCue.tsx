"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = { className?: string };

export default function ScrollCue({ className = "" }: Props) {
  return (
    <Link
      href="#destinations"
      aria-label="Scroll down"
      className={[
        // keep it below CTAs and non-clickable
        "pointer-events-none absolute z-0 left-1/2 -translate-x-1/2",
        // sit a bit higher as viewport changes; more space on larger screens
        "bottom-[3vh] sm:bottom-[4vh] md:bottom-[5vh] lg:bottom-[6vh]",
        className,
      ].join(" ")}
    >
      <motion.div
        aria-hidden
        animate={{ y: [0, 6, 0] }}               // smaller bounce
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        className="
          relative h-10 w-6 rounded-full
          border-2 border-white/60 bg-black/10
          shadow-[0_0_0_2px_rgba(0,0,0,0.25)] backdrop-blur-[1px]
        "
      >
        <span
          className="
            absolute left-1/2 top-2.5 -translate-x-1/2
            h-4 w-[2px] rounded-full bg-white/85
          "
        />
      </motion.div>
    </Link>
  );
}

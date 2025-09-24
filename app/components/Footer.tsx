"use client";

import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-black text-white/90 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Top: 3 columns */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + blurb */}
          <div>
            <h3 className="font-display text-2xl text-white">Ceylon Travelex</h3>
            <p className="mt-3 max-w-sm text-white/70">
              Curating extraordinary journeys across Sri Lanka and the Indian
              Ocean since 2010.
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon
                label="Instagram"
                href="https://instagram.com/"
                icon={
                  <path
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm12 5h.01M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                }
              />
              <SocialIcon
                label="Email"
                href="mailto:hello@ceylontravelex.com"
                icon={
                  <path
                    d="M3 6h18v12H3zM3 6l9 7l9-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinejoin="round"
                  />
                }
              />
              <SocialIcon
                label="Call us"
                href="tel:+94112345678"
                icon={
                  <path
                    d="M6 4l3 2l-2 3c1.5 3 3.5 5 6.5 6.5l3-2l2 3l-2 3a3 3 0 0 1-3 1.5C7.5 22 2 16.5 2 9a3 3 0 0 1 1.5-3L6 4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinejoin="round"
                  />
                }
              />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white/80 font-semibold tracking-wide">
              Quick Links
            </h4>
            <nav className="mt-4 grid gap-2 text-white/85">
              <FooterLink href="/#destinations">Destinations</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/enquire">Contact &amp; Booking</FooterLink>
              <FooterLink href="/#rate">Experiences</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/80 font-semibold tracking-wide">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-2 text-white/85">
              <li>Colombo, Sri Lanka</li>
              <li>
                <a
                  className="hover:text-amber-400 transition"
                  href="tel:+94112345678"
                >
                  +94 11 234 5678
                </a>
              </li>
              <li>
                <a
                  className="hover:text-amber-400 transition"
                  href="mailto:hello@ceylontravelex.com"
                >
                  hello@ceylontravelex.com
                </a>
              </li>
            </ul>
            <p className="mt-3 text-white/60">
              Your private curator will reply within 24 hours.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} Ceylon Travelex (Pvt) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- helpers ---------- */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
    >
      <span aria-hidden>–</span>
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        inline-flex h-11 w-11 items-center justify-center rounded-full
        text-amber-400 bg-amber-400/10 ring-1 ring-amber-400/25
        transition-colors
        hover:text-amber-300 hover:bg-amber-400/15
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40
      "
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        {icon}
      </svg>
    </Link>
  );
}


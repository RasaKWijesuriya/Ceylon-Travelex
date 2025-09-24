// app/components/EnquiryForm.tsx
"use client";

import { useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  destination: string;
  notes: string;
  // honeypot
  website?: string;
};

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    destination: "",
    notes: "",
    website: "",
  });

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    // simple spam block
    if (form.website) return;

    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || "Failed to submit enquiry");
      }

      setOk(true);
      setForm({
        fullName: "",
        email: "",
        destination: "",
        notes: "",
        website: "",
      });
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-white/70">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            className={input}
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-white/70">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            className={input}
            placeholder="your@email.com"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-wider text-white/70">
          Preferred Destination
        </label>
        <input
          name="destination"
          type="text"
          className={input}
          placeholder="Sri Lanka, Maldives, or your dream destination"
          value={form.destination}
          onChange={onChange}
        />
        <p className="mt-1 text-xs text-white/50">
          Leave blank if you’d like our curator to suggest destinations
        </p>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-wider text-white/70">
          Tell Us About Your Vision
        </label>
        <textarea
          name="notes"
          rows={5}
          className={input}
          placeholder="Share travel preferences, occasions, group size, dates, or specific experiences you’re seeking…"
          value={form.notes}
          onChange={onChange}
          required
        />
      </div>

      {/* honeypot */}
      <input
        name="website"
        className="hidden"
        autoComplete="off"
        tabIndex={-1}
        value={form.website}
        onChange={onChange}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-amber-400 py-2.5 text-sm font-semibold text-black shadow hover:brightness-105 disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit Enquiry"}
      </button>

      {ok && (
        <p className="text-center text-sm text-emerald-400">
          Thank you. Your enquiry has been sent — your curator will reply
          within 24 hours.
        </p>
      )}
      {err && (
        <p className="text-center text-sm text-rose-400">
          {err}
        </p>
      )}

      <p className="text-center text-[11px] leading-relaxed text-white/50">
        By submitting this form, you agree to our privacy policy. Your
        information will only be used to create your bespoke travel
        experience.
      </p>
    </form>
  );
}

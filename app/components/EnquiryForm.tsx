"use client";

import { useEffect, useState } from "react";

type Destination = { id: string; name: string };

type FormState = {
  name: string;
  email: string;
  destination_id: string | ""; 
  travel_date?: string;         
  party_size?: number;         
  message: string;
  company?: string;             
};

export default function EnquiryForm() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    destination_id: "",
    travel_date: "",
    party_size: undefined,
    message: "",
    company: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/destinations/list");
        if (!res.ok) throw new Error("Failed to load destinations");
        const data: Destination[] = await res.json();
        setDestinations(data);
      } catch (e: any) {
        console.error(e);
        setErr("Could not load destinations.");
      }
    })();
  }, []);

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "party_size"
          ? (value ? Number(value) : undefined)
          : value,
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    if (form.company) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        destination_id: form.destination_id || undefined, // undefined -> NULL in DB
        travel_date: form.travel_date || undefined,        // keep yyyy-mm-dd
        party_size: form.party_size ?? undefined,
        message: form.message,
        company: "", // real users leave this empty
      };

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Failed to submit enquiry");
      }

      setOk(true);
      setForm({
        name: "",
        email: "",
        destination_id: "",
        travel_date: "",
        party_size: undefined,
        message: "",
        company: "",
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
            name="name"
            className={input}
            placeholder="Enter your full name"
            value={form.name}
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
          Destination
        </label>
        <select
          name="destination_id"
          value={form.destination_id}
          onChange={onChange}
          className={input}
        >
          <option value="">Any destination (let the curator suggest)</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-white/70">
            Travel Date
          </label>
          <input
            name="travel_date"
            type="date" // yyyy-mm-dd 
            className={input}
            value={form.travel_date}
            onChange={onChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-wider text-white/70">
            Party Size
          </label>
          <input
            name="party_size"
            type="number"
            min={1}
            className={input}
            value={form.party_size ?? ""}
            onChange={onChange}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-wider text-white/70">
          Tell Us About Your Vision
        </label>
        <textarea
          name="message"
          rows={5}
          className={input}
          placeholder="Share travel preferences, group size, dates, or specific experiences you’re seeking…"
          value={form.message}
          onChange={onChange}
          required
          minLength={10}
        />
      </div>

      {/* honeypot */}
      <input
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
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
          Thank you. Your enquiry has been sent — your curator will reply within 24 hours.
        </p>
      )}
      {err && <p className="text-center text-sm text-rose-400">{err}</p>}
    </form>
  );
}

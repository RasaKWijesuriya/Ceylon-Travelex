"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      destination_id: fd.get("destination_id") || null, // optional
      travel_date: fd.get("travel_date") || null,       // optional (YYYY-MM-DD)
      party_size: Number(fd.get("party_size") || 0) || null,
      message: fd.get("message"),
      company: fd.get("company"), // honeypot, stays empty
    };

    setStatus("sending");
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(res.ok ? "ok" : "err");
    if (res.ok) (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <main style={{ padding: 24, maxWidth: 720 }}>
      <h1>Booking enquiry</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="destination_id" placeholder="Destination ID (optional)" />
        <input name="travel_date" type="date" placeholder="Travel date (optional)" />
        <input name="party_size" type="number" min={1} placeholder="Party size (optional)" />
        <textarea name="message" placeholder="Tell us about your trip" required minLength={10} rows={5} />
        <input name="company" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
        <button disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit enquiry"}
        </button>
        {status === "ok" && <p style={{ color: "green" }}>Thanks! We’ll be in touch.</p>}
        {status === "err" && <p style={{ color: "crimson" }}>Something went wrong. Try again.</p>}
      </form>
    </main>
  );
}

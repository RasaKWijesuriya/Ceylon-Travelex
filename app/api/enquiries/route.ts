import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";
import { z } from "zod";

// Here's an inline schema that matches your UI + DB:
const enquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  destination_id: z
    .string()
    .uuid("destination_id must be a UUID")
    .optional()
    .nullable()
    .transform((v) => (v ? v : null)),
  travel_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "travel_date must be YYYY-MM-DD")
    .optional()
    .nullable()
    .transform((v) => (v ? v : null)),
  party_size: z
    .coerce.number()
    .int()
    .positive()
    .max(999)
    .optional()
    .nullable(),
  message: z.string().min(10, "Tell us a little more about your trip"),
  company: z.string().optional().default(""), 
});

function cuid() {
  return (
    Math.random().toString(36).slice(2, 14) +
    Math.random().toString(36).slice(2, 12)
  );
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }
  const data = parsed.data;

  if (data.company && data.company.trim() !== "") {
    
    return NextResponse.json({ ok: true }, { status: 204 });
  }

  try {
    const pool = getPool();
    const id = cuid();

    await pool.execute(
      `INSERT INTO enquiries 
         (id, created_at, updated_at, status, name, email, destination_id, travel_date, party_size, message) 
       VALUES (?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        "new", 
        data.name,
        data.email,
        data.destination_id ?? null,
        data.travel_date ?? null, // must be YYYY-MM-DD or null for MySQL DATE
        data.party_size ?? null,
        data.message,
      ]
    );

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

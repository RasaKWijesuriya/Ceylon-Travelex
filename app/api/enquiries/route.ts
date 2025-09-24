import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";
import { enquirySchema } from "@/lib/validators";

function cuid() {
  return Math.random().toString(36).slice(2, 14) + Math.random().toString(36).slice(2, 12);
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const data = enquirySchema.parse(raw);

    const pool = getPool();
    const id = cuid();

    await pool.execute(
      `INSERT INTO enquiries 
         (id, created_at, updated_at, status, name, email, destination_id, travel_date, party_size, message) 
       VALUES (?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        "NEW",
        data.name,
        data.email,
        data.destination_id ?? null,
        data.travel_date ?? null,
        data.party_size ?? null,
        data.message,
      ]
    );

    return NextResponse.json({ ok: true, id });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ ok: false, error: "Validation failed", details: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

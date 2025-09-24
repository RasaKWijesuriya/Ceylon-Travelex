import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";
import { bookingSchema } from "@/lib/validators";

function cuid() {
  return Math.random().toString(36).slice(2, 14) + Math.random().toString(36).slice(2, 12);
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const data = bookingSchema.parse(raw);

    const pool = getPool();
    const id = cuid();

    await pool.execute(
      `INSERT INTO bookings 
        (id, created_at, customer_id, destination_id, start_date, end_date, party_size, total_amount) 
       VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.customer_id,
        data.destination_id,
        data.start_date,
        data.end_date,
        data.party_size,
        data.total_amount,
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

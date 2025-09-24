// app/api/testimonials/route.ts
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2/promise";
import { getPool } from "@/lib/mysql";

interface Row extends RowDataPacket {
  id: number;
  author_name: string;
  quote: string;
  city: string | null;
  country: string | null;
  rating: number | null;
  display_order: number;
}

export async function GET() {
  const [rows] = await getPool().execute<Row[]>(
    `
    SELECT
      id,
      author_name,
      quote,
      city,
      country,
      rating,
      display_order
    FROM luxury_travel.testimonials
    WHERE is_active = 1
    ORDER BY display_order ASC
    `
  );

  const data = rows.map((r) => ({
    id: r.id,
    quote: r.quote,
    author: r.author_name,
    city: r.city ?? undefined,
    country: r.country ?? undefined,
    rating: r.rating ?? 5,
  }));

  return NextResponse.json({ ok: true, data });
}

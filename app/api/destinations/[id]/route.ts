// app/api/destinations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";

// Define the correct shape for the second argument
type RouteContext = {
  params: { id: string };
};

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id } = params;

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT * FROM destinations WHERE id = ?",
      [id]
    );

    // rows may be RowDataPacket[] in mysql2
    const data = Array.isArray(rows) ? rows[0] : null;
    if (!data) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

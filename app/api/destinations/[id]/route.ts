import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }   
) {
  const { id } = params;

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT * FROM destinations WHERE id = ?",
      [id]
    );

    const data = Array.isArray(rows) ? rows[0] : null;
    if (!data) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

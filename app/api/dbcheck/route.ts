import { NextResponse } from "next/server";
import { getPool } from "../../../lib/mysql";

export async function GET() {
  try {
    const [rows] = await getPool().query("SELECT NOW() AS now, DATABASE() AS db");
    return NextResponse.json({ ok: true, rows });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

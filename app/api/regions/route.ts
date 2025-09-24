import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";

export async function GET() {
  const [rows] = await getPool().query(`SELECT code, name FROM regions ORDER BY name ASC`);
  return NextResponse.json({ ok: true, data: rows });
}

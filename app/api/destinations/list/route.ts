import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";
import type { RowDataPacket } from "mysql2/promise";

interface DestRow extends RowDataPacket {
  id: string;
  name: string;
}

export async function GET() {
  const pool = getPool();

  const [rows] = await pool.query<DestRow[]>(
    "SELECT id, name FROM destinations ORDER BY name"
  );

  return NextResponse.json(rows);
}

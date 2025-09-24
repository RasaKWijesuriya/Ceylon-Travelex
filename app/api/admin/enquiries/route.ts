import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";

export async function GET(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  const auth = req.headers.get("authorization") || "";
  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [rows] = await getPool().query(
    `SELECT id, status, name, email, destination_id, travel_date, party_size, created_at
       FROM enquiries
      ORDER BY created_at DESC
      LIMIT 200`
  );
  return NextResponse.json({ ok: true, data: rows });
}

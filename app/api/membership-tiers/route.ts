import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";

export async function GET() {
  const [rows] = await getPool().query(
    `SELECT id, name, description, perks, is_invitation_only, priority
       FROM membership_tiers
      ORDER BY priority ASC`
  );
  return NextResponse.json({ ok: true, data: rows });
}

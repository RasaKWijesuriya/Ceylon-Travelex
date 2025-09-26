import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";
import { idParam } from "@/lib/validators";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;          
  const parsedId = idParam.parse(id);       // still validated at runtime

  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM destinations WHERE id = ? LIMIT 1", [parsedId]);
  const dest = (rows as any[])[0] ?? null;
  if (!dest) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true, data: dest });
}

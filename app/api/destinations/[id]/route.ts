import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";
import { idParam } from "@/lib/validators";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = idParam.parse(params.id);
  const pool = getPool();

  const [d] = await pool.query(
    `SELECT id, name, country, region_code, tagline, hero_url,
            price_from, is_featured, created_at, updated_at
       FROM destinations WHERE id = ? LIMIT 1`, [id]
  );
  const dest = (d as any[])[0];
  if (!dest) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const [images] = await pool.query(
    `SELECT id, url, alt, is_primary, position, created_at
       FROM destination_images
      WHERE destination_id = ?
      ORDER BY is_primary DESC, position ASC, created_at DESC`, [id]
  );

  const [tags] = await pool.query(
    `SELECT t.id, t.name
       FROM destination_tags dt
       JOIN tags t ON t.id = dt.tag_id
      WHERE dt.destination_id = ?
      ORDER BY t.name ASC`, [id]
  );

  return NextResponse.json({ ok: true, data: { ...dest, images, tags } });
}

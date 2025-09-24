import { NextResponse } from "next/server";
import { getPool } from "@/lib/mysql";


export async function GET(req: Request) {
  const url = new URL(req.url);
  const featured = url.searchParams.get("featured");
  const region = url.searchParams.get("region");

  const pool = getPool();

  let sql = `
    SELECT
      d.id, d.name, d.country, d.region_code, d.tagline, d.hero_url,
      d.price_from, d.is_featured, d.created_at, d.updated_at,
      (SELECT di.url FROM destination_images di
         WHERE di.destination_id = d.id AND di.is_primary = 1
         ORDER BY di.position ASC LIMIT 1) AS primary_image,
      (SELECT GROUP_CONCAT(t.name ORDER BY t.name SEPARATOR ',')
         FROM destination_tags dt
         JOIN tags t ON t.id = dt.tag_id
        WHERE dt.destination_id = d.id) AS tags
    FROM destinations d
    WHERE 1=1
  `;

  const params: any[] = [];
  if (featured === "1") sql += ` AND d.is_featured = 1 `;
  if (region) { sql += ` AND d.region_code = ? `; params.push(region); }

  sql += ` ORDER BY d.created_at DESC `;

  const [rows] = await pool.query(sql, params);
  return NextResponse.json({ ok: true, data: rows });
}

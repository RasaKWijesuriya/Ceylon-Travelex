// app/api/destinations/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/mysql';

type Context = { params: { id: string } };

export async function GET(_req: NextRequest, context: Context) {
  const id = context.params.id;

  const [rows] = await getPool().query(
    'SELECT * FROM destinations WHERE id = ?',
    [id]
  );

  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: rows[0] });
}

// Example for DELETE/PUT too:

export async function DELETE(_req: NextRequest, context: Context) {
  const id = context.params.id;
  await getPool().query('DELETE FROM destinations WHERE id = ?', [id]);
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest, context: Context) {
  const id = context.params.id;
  const body = await req.json();
  await getPool().query('UPDATE destinations SET ? WHERE id = ?', [body, id]);
  return NextResponse.json({ ok: true });
}

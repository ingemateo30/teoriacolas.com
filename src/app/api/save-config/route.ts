import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const config = await req.json()
  // Guardar configuración en base de datos o archivo
  return NextResponse.json({ saved: true, config })
}

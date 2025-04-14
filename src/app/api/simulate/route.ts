import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  // Simular aquí usando modelos matemáticos
  return NextResponse.json({ status: 'ok', data: body })
}

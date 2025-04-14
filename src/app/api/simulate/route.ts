import { NextResponse } from 'next/server';
import { simulateModel } from '@/lib/simulation/core';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { model, parameters } = data;
    
    if (!model || !parameters) {
      return NextResponse.json(
        { error: 'Se requieren el modelo y los parámetros' },
        { status: 400 }
      );
    }

    const results = simulateModel(model, parameters);
    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error en la simulación:', error);
    return NextResponse.json(
      { error: 'Error procesando la simulación' },
      { status: 500 }
    );
  }
}
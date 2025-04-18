"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Definición de modelos de teoría de colas
const queueModels = [
  { 
    id: "mm1", 
    name: "M/M/1", 
    description: "Un servidor, llegadas poisson, servicio exponencial" 
  },
  { 
    id: "mm2", 
    name: "M/M/2", 
    description: "Dos servidores, llegadas poisson, servicio exponencial" 
  },
  { 
    id: "mmc", 
    name: "M/M/c", 
    description: "Múltiples servidores, llegadas poisson, servicio exponencial" 
  },
  { 
    id: "mg1", 
    name: "M/G/1", 
    description: "Un servidor, llegadas poisson, servicio general" 
  },
  { 
    id: "md1", 
    name: "M/D/1", 
    description: "Un servidor, llegadas poisson, servicio determinístico" 
  },
];

export default function SimulatorPage() {
  const router = useRouter();
  
  const navigateToModel = (modelId: string) => {
    router.push(`/simulator/${modelId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-400">Simulador de Teoría de Colas</h1>
      
      <p className="mb-8 text-gray-300">
        Selecciona un modelo para visualizar y simular su comportamiento:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queueModels.map((model) => (
          <div 
            key={model.id} 
            className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition cursor-pointer border border-purple-800"
            onClick={() => navigateToModel(model.id)}
          >
            <h2 className="text-xl font-semibold text-purple-300 mb-2">{model.name}</h2>
            <p className="text-gray-400">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
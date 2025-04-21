"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';


/**
 * Página Simulador con el mismo estilo del Navbar
 * 
 * Muestra diferentes modelos de teoría de colas
 * Implementa un diseño coherente con el tema oscuro y azul del navbar
 */
export default function SimulatorPage() {
  const router = useRouter();
  
  // Estado para efectos de transición al cargar la página
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Efecto para añadir una pequeña animación al cargar
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Función para navegar a la página específica del modelo
  const navigateToModel = (modelId: string) => {
    router.push(`/simulator/${modelId}`);
  };
  
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      {/* Navbar - Fijo en la parte superior */}
      <Navbar />
      
      {/* Área de contenido principal con sidebar */}
      <div className="flex flex-1 pt-16"> {/* Añadido pt-16 para compensar la altura del navbar fijo */}
        {/* Sidebar - Fijo en la izquierda */}
        <Sidebar />
        
        {/* Contenido principal con estilo coherente al Navbar */}
        <div className={`flex-1 min-h-screen bg-gray-900 text-white p-8 transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <h1 className="text-3xl font-bold mb-6 text-blue-400">Simulador de Teoría de Colas</h1>
          <p className="mb-8 text-gray-300">
            Selecciona un modelo para visualizar y simular su comportamiento:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {queueModels.map((model) => (
              <div
                key={model.id}
                className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 border border-gray-700 
                transition-all duration-200 cursor-pointer hover:border-blue-500 hover:scale-105"
                onClick={() => navigateToModel(model.id)}
              >
                <h2 className="text-xl font-semibold text-blue-400 mb-2">{model.name}</h2>
                <p className="text-gray-300">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
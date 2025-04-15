"use client";

import { useState } from 'react';
import { ControlPanel } from '@/components/simulator/ControlPanel';
import { QueueVisualizer } from '@/components/simulator/QueueVisualizer';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

export default function SimulatorPage({
  params,
}: {
  params: { modelId: string }
}) {
  // Estado para controlar efectos interactivos si los necesitas
  const [isSimulating, setIsSimulating] = useState(false);

  // Mapeo para obtener información del modelo según su ID
  const getModelName = (id: string) => {
    const modelNames: Record<string, string> = {
      'mm1': 'M/M/1',
      'mmc': 'M/M/c',
      'mmck': 'M/M/c/K',
      'mg1': 'M/G/1',
      'gm1': 'G/M/1',
      'gg1': 'G/G/1',
      'networks': 'Redes de Colas'
    };
    return modelNames[id];
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <div className="max-w-7xl w-full mx-auto px-4 py-10 md:px-8 lg:px-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Simulador de Modelo {getModelName(params.modelId)}
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Experimenta con diferentes parámetros y visualiza el comportamiento del sistema de colas en tiempo real.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Visualización</h2>
                <QueueVisualizer modelId={params.modelId} width={580} height={400} />
              </div>
              <div className="lg:col-span-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Panel de Control</h2>
                <ControlPanel modelId={params.modelId}/>
              </div>
            </div>
          </div>

          {/* Sección de resultados y estadísticas */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resultados</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Tiempo de espera</h3>
                <p className="text-2xl font-bold text-primary-600">
                  {isSimulating ? 'Calculando...' : '0.00 min'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Longitud de cola</h3>
                <p className="text-2xl font-bold text-primary-600">
                  {isSimulating ? 'Calculando...' : '0.00'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Utilización</h3>
                <p className="text-2xl font-bold text-primary-600">
                  {isSimulating ? 'Calculando...' : '0.00%'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { useSimulation } from '@/hooks/useSimulation';
import QueueVisualizer from '@/components/simulator/QueueVisualizer';
import SimulationControls from '@/components/simulator/SimulationControls';
import MetricsDisplay from '@/components/charts/MetricsDisplay';
import LineChart from '@/components/charts/LineChart';
import { SimulationParameters } from '@/types/simulation';
import { Card } from '@/components/ui/Card';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

export default function SimulatorPage() {
  // Estado inicial para los parámetros de simulación
  const [initialParams] = useState<SimulationParameters>({
    model: 'MM1',
    arrivalRate: 1.0,
    serviceRate: 1.5,
    servers: 1,
    capacity: -1, // -1 indica infinito
    speed: 1.0,
    maxTime: 100,
    animationSpeed: 1.0,
    arrivalDistribution: 'exponential',
    serviceDistribution: 'exponential'
  });

  // Usar el hook de simulación
  const {
    params,
    updateParameters,
    start,
    pause,
    reset,
    state,
    entities,
    metrics,
    currentTime
  } = useSimulation(initialParams);

  // Datos para el gráfico de línea (métricas en el tiempo)
  const [timeData, setTimeData] = useState<{ time: number; queueLength: number; utilization: number }[]>([]);

  // Actualizar datos del gráfico cuando cambian las métricas
  React.useEffect(() => {
    if (state === 'running' && currentTime > 0) {
      setTimeData(prev => [
        ...prev,
        {
          time: currentTime,
          queueLength: metrics.avgQueueLength,
          utilization: metrics.serverUtilization
        }
      ].slice(-100)); // Mantener solo los últimos 100 puntos
    }
  }, [metrics, currentTime, state]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      {/* Navbar - Fijo en la parte superior */}
      <Navbar />

      {/* Área de contenido principal con sidebar */}
      <div className="flex flex-1 pt-16"> {/* Añadido pt-16 para compensar la altura del navbar fijo */}
        {/* Sidebar - Fijo en la izquierda */}
        <Sidebar />
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Simulador de Teoría de Colas</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel de Control */}
            <div className="lg:col-span-1">
              <Card className="p-4 mb-6 bg-gray-900 border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-blue-900/20">
                <h3 className="text-lg font-medium mb-4 text-blue-400">Controles de Simulación</h3>
                <SimulationControls
                  parameters={params}
                  onParametersChange={updateParameters}
                  onStart={start}
                  onPause={pause}
                  onReset={reset}
                  simulationState={state}
                  currentTime={currentTime}
                />
              </Card>

              {/* Métricas */}
              <Card className="p-4 bg-gray-900 border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-blue-900/20">
                <h3 className="text-lg font-medium mb-4 text-blue-400">Métricas de Rendimiento</h3>
                <MetricsDisplay metrics={metrics} />
              </Card>
            </div>

            {/* Visualización */}
            <div className="lg:col-span-2">
              {/* Visualizador de Cola */}
              <Card className="p-4 mb-6 bg-gray-900 border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-blue-900/20">
                <h3 className="text-lg font-medium mb-4 text-blue-400">Visualización de la Cola</h3>
                <QueueVisualizer
                  entities={entities}
                  servers={params.servers}
                  capacity={params.capacity}
                />
              </Card>

              {/* Gráficos de Métricas */}
              <Card className="p-4 bg-gray-900 border border-gray-800 shadow-xl transition-all duration-300 hover:shadow-blue-900/20">
                <h3 className="text-lg font-medium mb-4 text-blue-400">Evolución de Métricas</h3>
                <LineChart
                  data={timeData}
                  xKey="time"
                  series={[
                    { key: 'queueLength', label: 'Longitud de Cola', color: '#3b82f6' },
                    { key: 'utilization', label: 'Utilización del Servidor', color: '#10b981' }
                  ]}
                  xLabel="Tiempo"
                  yLabel="Valor"
                />
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
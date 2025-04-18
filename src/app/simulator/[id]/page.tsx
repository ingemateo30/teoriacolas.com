'use client';

import React, { useState, useEffect, use } from 'react';
import { useSimulation } from '@/hooks/useSimulation';
import QueueVisualizer from '@/components/simulator/QueueVisualizer';
import SimulationControls from '@/components/simulator/SimulationControls';
import MetricsDisplay from '@/components/charts/MetricsDisplay';
import LineChart from '@/components/charts/LineChart';
import HistogramChart from '@/components/charts/HistogramChart';
import { SimulationParameters } from '@/types/simulation';
import { Card } from '@/components/ui/Card';
import { calculateTheoreticalMetrics } from '@/lib/simulation/utils/metrics';

// Tipos de modelos disponibles
const modelConfigs: Record<string, Partial<SimulationParameters>> = {
  'mm1': {
    model: 'MM1',
    servers: 1,
    capacity: -1
  },
  'mmc': {
    model: 'MMC',
    servers: 2,
    capacity: -1
  },
  'mmck': {
    model: 'MMCK',
    servers: 2,
    capacity: 10
  },
  'mg1': {
    model: 'MG1',
    servers: 1,
    capacity: -1,
    serviceDistribution: 'uniform'
  },
  'gm1': {
    model: 'GM1',
    servers: 1,
    capacity: -1,
    arrivalDistribution: 'normal'
  }
};

interface SimulatorModelPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SimulatorModelPage({ params }: SimulatorModelPageProps) {
  const { id } = use(params); // Resolver la promesa
  const modelId = id.toLowerCase();

  // Obtener la configuración del modelo o usar MM1 por defecto
  const modelConfig = modelConfigs[modelId] || modelConfigs.mm1;

  // Estado inicial para los parámetros de simulación
  const [initialParams] = useState<SimulationParameters>({
    model: modelConfig.model as SimulationParameters['model'] || 'MM1',
    arrivalRate: 1.0,
    serviceRate: 1.5,
    servers: modelConfig.servers || 1,
    capacity: modelConfig.capacity || -1,
    speed: 1.0,
    maxTime: 100,
    animationSpeed: 1.0,
    arrivalDistribution: modelConfig.arrivalDistribution || 'exponential',
    serviceDistribution: modelConfig.serviceDistribution || 'exponential'
  });

  // Usar el hook de simulación
  const {
    params: simulationParams,
    updateParameters,
    start,
    pause,
    reset,
    state,
    entities,
    metrics,
    currentTime
  } = useSimulation(initialParams);

  // Métricas teóricas para comparación
  const [theoreticalMetrics, setTheoreticalMetrics] = useState(calculateTheoreticalMetrics(initialParams));

  useEffect(() => {
    setTheoreticalMetrics(calculateTheoreticalMetrics(simulationParams));
  }, [simulationParams]);

  const [timeData, setTimeData] = useState<{ time: number; queueLength: number; utilization: number; theoretical: number }[]>([]);

  useEffect(() => {
    if (state === 'running' && currentTime > 0) {
      setTimeData(prev => [
        ...prev,
        {
          time: currentTime,
          queueLength: metrics.avgQueueLength,
          utilization: metrics.serverUtilization,
          theoretical: theoreticalMetrics.avgQueueLength
        }
      ].slice(-100));
    }
  }, [metrics, currentTime, state, theoreticalMetrics]);

  const getModelTitle = () => {
    const modelMap: Record<string, string> = {
      'mm1': 'M/M/1',
      'mmc': `M/M/${simulationParams.servers}`,
      'mmck': `M/M/${simulationParams.servers}/${simulationParams.capacity === -1 ? '∞' : simulationParams.capacity}`,
      'mg1': 'M/G/1',
      'gm1': 'G/M/1'
    };
    return modelMap[modelId] || 'Modelo Desconocido';
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Simulador de Cola {getModelTitle()}
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Simula y analiza el comportamiento del modelo de cola {getModelTitle()}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SimulationControls
            parameters={simulationParams}
            onParametersChange={updateParameters}
            onStart={start}
            onPause={pause}
            onReset={reset}
            simulationState={state}
            currentTime={currentTime}
          />

          <Card className="p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Métricas de Simulación</h3>
            <MetricsDisplay metrics={metrics} />
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Métricas Teóricas</h3>
            <MetricsDisplay metrics={theoreticalMetrics} />
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Visualización de la Cola</h3>
            <QueueVisualizer
              entities={entities}
              servers={simulationParams.servers}
              capacity={simulationParams.capacity}
            />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Evolución de Cola</h3>
              <LineChart
                data={timeData}
                xKey="time"
                series={[
                  { key: 'queueLength', label: 'Longitud Simulada', color: '#3b82f6' },
                  { key: 'theoretical', label: 'Longitud Teórica', color: '#ef4444' }
                ]}
                xLabel="Tiempo"
                yLabel="Longitud"
              />
            </Card>

            <Card className="p-4">
              <h3 className="text-lg font-medium mb-4">Utilización del Servidor</h3>
              <LineChart
                data={timeData}
                xKey="time"
                series={[
                  { key: 'utilization', label: 'Utilización', color: '#10b981' }
                ]}
                xLabel="Tiempo"
                yLabel="Utilización"
              />
            </Card>
          </div>

          {metrics.waitingTimeDistribution && metrics.waitingTimeDistribution.length > 0 && (
            <Card className="p-4 mt-6">
              <h3 className="text-lg font-medium mb-4">Distribución de Tiempos de Espera</h3>
              <HistogramChart
                data={metrics.waitingTimeDistribution}
                bins={10}
                color="#3b82f6"
                xLabel="Tiempo de Espera"
                yLabel="Frecuencia"
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

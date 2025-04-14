"use client";

import { ControlPanel } from '@/components/simulator/ControlPanel';
import { QueueVisualizer } from '@/components/simulator/QueueVisualizer';
import { SimulationControls } from '@/components/simulator/SimulationControls';
import { MetricsDisplay } from '@/components/charts/MetricsDisplay';

export default function SimulatorPage() {
  return (
    <div className="simulator-page">
      <h1>Simulador de Teoría de Colas</h1>
      <p>
        Configura los parámetros del modelo y observa la simulación en tiempo real:
      </p>

      <div className="simulator-container">
        <div className="control-section">
          <ControlPanel />
          <SimulationControls />
        </div>
        
        <div className="visualization-section">
          <QueueVisualizer />
        </div>
        
        <div className="metrics-section">
          <MetricsDisplay />
        </div>
      </div>
    </div>
  );
}
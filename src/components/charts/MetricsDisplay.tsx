import { LineChart } from '@/components/charts/LineChart';
import { HistogramChart } from '@/components/charts/HistogramChart';
import { DistributionVisualization } from '@/components/charts/DistributionVisualization';

// Datos de ejemplo para las métricas
const metricData = {
  queueLength: [
    { time: 0, value: 0 },
    { time: 10, value: 2 },
    { time: 20, value: 5 },
    { time: 30, value: 3 },
    { time: 40, value: 1 },
    { time: 50, value: 4 },
  ],
  waitingTimes: [0.5, 1.2, 2.3, 0.8, 1.7, 3.2, 2.1, 0.4, 1.9, 2.8],
  systemTimes: [2.1, 3.4, 4.2, 2.5, 3.8, 5.6, 4.3, 2.2, 3.5, 4.8],
  utilizationRate: 0.78,
  calculatedMetrics: {
    L: 2.5,    // Número medio de clientes en el sistema
    Lq: 1.72,  // Longitud media de la cola
    W: 3.21,   // Tiempo medio en el sistema
    Wq: 1.92,  // Tiempo medio en la cola
    rho: 0.78  // Factor de utilización
  }
};

export const MetricsDisplay = () => {
  return (
    <div className="metrics-display">
      <h2>Métricas del Sistema</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Métricas Calculadas</h3>
          <div className="metrics-table">
            <div className="metric-row">
              <div className="metric-label">Factor de utilización (ρ):</div>
              <div className="metric-value">{metricData.calculatedMetrics.rho.toFixed(2)}</div>
            </div>
            <div className="metric-row">
              <div className="metric-label">Clientes en sistema (L):</div>
              <div className="metric-value">{metricData.calculatedMetrics.L.toFixed(2)}</div>
            </div>
            <div className="metric-row">
              <div className="metric-label">Clientes en cola (Lq):</div>
              <div className="metric-value">{metricData.calculatedMetrics.Lq.toFixed(2)}</div>
            </div>
            <div className="metric-row">
              <div className="metric-label">Tiempo en sistema (W):</div>
              <div className="metric-value">{metricData.calculatedMetrics.W.toFixed(2)}</div>
            </div>
            <div className="metric-row">
              <div className="metric-label">Tiempo en cola (Wq):</div>
              <div className="metric-value">{metricData.calculatedMetrics.Wq.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Longitud de Cola</h3>
          <LineChart data={metricData.queueLength} xKey="time" yKey="value" />
        </div>
        
        <div className="metric-card">
          <h3>Distribución de Tiempos de Espera</h3>
          <HistogramChart data={metricData.waitingTimes} />
        </div>
        
        <div className="metric-card">
          <h3>Distribución de Tiempos en el Sistema</h3>
          <DistributionVisualization data={metricData.systemTimes} />
        </div>
      </div>
    </div>
  );
};

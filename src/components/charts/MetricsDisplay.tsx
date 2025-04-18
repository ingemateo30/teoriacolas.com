'use client';

import React from 'react';

// Tipo para las métricas que vamos a mostrar
interface MetricsDisplayProps {
  metrics: {
    arrivalRate?: number;
    serviceRate?: number;
    avgQueueLength?: number;
    avgWaitingTime?: number;
    serverUtilization?: number;
    throughput?: number;
    avgSystemTime?: number;
    avgSystemEntities?: number;
    probSystemEmpty?: number;
  };
}

/**
 * Componente MetricsDisplay con Modo Oscuro
 * 
 * Muestra métricas clave de los sistemas de colas en un formato claro
 * Utiliza un diseño de modo oscuro con colores específicos por métrica
 * Compatible con el tema oscuro general de la aplicación
 */
const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  // Función para formatear los valores numéricos
  const formatValue = (value: number | undefined): string => {
    if (value === undefined) return 'N/A';
    return value.toFixed(3);
  };

  // Obtener el color apropiado para cada métrica
  const getMetricColor = (metricKey: string): string => {
    switch (metricKey) {
      case 'arrivalRate': return 'text-blue-400';
      case 'serviceRate': return 'text-emerald-400';
      case 'avgQueueLength': return 'text-purple-400';
      case 'avgWaitingTime': return 'text-amber-400';
      case 'serverUtilization': return 'text-red-400';
      case 'throughput': return 'text-cyan-400';
      case 'avgSystemTime': return 'text-indigo-400';
      case 'avgSystemEntities': return 'text-pink-400';
      case 'probSystemEmpty': return 'text-teal-400';
      default: return 'text-gray-300';
    }
  };

  // Estructura de datos para las métricas que queremos mostrar
  const metricsToDisplay = [
    { key: 'arrivalRate', label: 'Tasa de llegada (λ)', value: formatValue(metrics.arrivalRate) },
    { key: 'serviceRate', label: 'Tasa de servicio (μ)', value: formatValue(metrics.serviceRate) },
    { key: 'avgQueueLength', label: 'Longitud media de cola (Lq)', value: formatValue(metrics.avgQueueLength) },
    { key: 'avgWaitingTime', label: 'Tiempo medio de espera (Wq)', value: formatValue(metrics.avgWaitingTime) },
    { key: 'serverUtilization', label: 'Utilización del servidor (ρ)', value: formatValue(metrics.serverUtilization) },
    { key: 'throughput', label: 'Rendimiento (λ efectiva)', value: formatValue(metrics.throughput) },
    { key: 'avgSystemTime', label: 'Tiempo medio en el sistema (W)', value: formatValue(metrics.avgSystemTime) },
    { key: 'avgSystemEntities', label: 'Clientes medios en el sistema (L)', value: formatValue(metrics.avgSystemEntities) },
    { key: 'probSystemEmpty', label: 'Probabilidad sistema vacío (P0)', value: formatValue(metrics.probSystemEmpty) },
  ];

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {metricsToDisplay.map((metric) => (
          <div 
            key={metric.key} 
            className="flex flex-col p-3 bg-gray-800/70 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <span className="text-sm text-gray-400 mb-1">{metric.label}</span>
            <span className={`text-lg font-semibold ${getMetricColor(metric.key)}`}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsDisplay;
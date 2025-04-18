'use client';

import React, { useMemo } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HistogramChartProps {
  data: number[];
  bins?: number;
  color?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
}

/**
 * Componente HistogramChart con Modo Oscuro
 * 
 * Muestra distribuciones de datos mediante histogramas interactivos
 * Usa una paleta de colores optimizada para modo oscuro
 * Compatible con el tema oscuro general de la aplicación
 */
const HistogramChart: React.FC<HistogramChartProps> = ({
  data,
  bins = 10,
  color = '#60a5fa', // Color azul más adaptado al tema oscuro
  xLabel,
  yLabel,
  height = 300,
}) => {
  // Generar datos del histograma
  const histogramData = useMemo(() => {
    if (!data || data.length === 0) return [];
    // Encontrar min y max para los límites
    const min = Math.min(...data);
    const max = Math.max(...data);
   
    // Crear bins
    const binWidth = (max - min) / bins;
    const histBins = Array(bins).fill(0).map((_, i) => {
      const binStart = min + i * binWidth;
      const binEnd = binStart + binWidth;
      return {
        binStart,
        binEnd,
        label: `${binStart.toFixed(2)}-${binEnd.toFixed(2)}`,
        count: 0,
        x: (binStart + binEnd) / 2,
      };
    });
   
    // Contar valores en cada bin
    data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      if (binIndex >= 0) {
        histBins[binIndex].count++;
      }
    });
   
    return histBins;
  }, [data, bins]);
 
  // Formatear valores del eje según sea necesario
  const formatXAxis = (value: any) => {
    return Number(value).toFixed(2);
  };

  // Colores personalizados para el tema oscuro
  const darkThemeColors = {
    grid: '#374151', // gris más oscuro para la cuadrícula
    text: '#d1d5db', // texto claro
    background: '#1f2937', // fondo oscuro
    tooltip: '#111827', // fondo del tooltip
  };

  // Si no hay datos, mostrar mensaje
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-md border border-gray-700">
        <p className="text-gray-400">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg border border-gray-800 shadow-md">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={histogramData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={darkThemeColors.grid} />
          <XAxis
            dataKey="x"
            tickFormatter={formatXAxis}
            stroke={darkThemeColors.text}
            label={{ 
              value: xLabel, 
              position: 'insideBottomRight', 
              offset: -10,
              fill: darkThemeColors.text 
            }}
            tick={{ fill: darkThemeColors.text }}
          />
          <YAxis
            stroke={darkThemeColors.text}
            label={{ 
              value: yLabel, 
              angle: -90, 
              position: 'insideLeft',
              fill: darkThemeColors.text 
            }}
            tick={{ fill: darkThemeColors.text }}
          />
          <Tooltip
            formatter={(value) => [`${value}`, 'Frecuencia']}
            labelFormatter={(label) => `Rango: ${histogramData.find(item => item.x === label)?.label || ''}`}
            contentStyle={{ 
              backgroundColor: darkThemeColors.tooltip,
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              color: darkThemeColors.text
            }}
          />
          <Bar 
            dataKey="count" 
            fill={color} 
            radius={[4, 4, 0, 0]}
            className="hover:opacity-80 transition-opacity"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChart;
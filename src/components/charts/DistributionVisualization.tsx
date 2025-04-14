'use client'

import React from 'react'
import { LineChart } from './LineChart'
import { HistogramChart } from './HistogramChart'

interface DistributionVisualizationProps {
  lineData: { x: number; y: number }[]
  histogramData: number[]
}

export function DistributionVisualization({ lineData, histogramData }: DistributionVisualizationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Distribución de Longitud de Cola (Gráfico Lineal)</h2>
        <LineChart data={lineData} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Histograma de Longitudes de Cola</h2>
        <HistogramChart data={histogramData} />
      </div>
    </div>
  )
}

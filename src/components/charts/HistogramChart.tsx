'use client'

import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

interface HistogramChartProps {
  data: number[]
}

export function HistogramChart({ data }: HistogramChartProps) {
  const chartData = {
    labels: data.map((_, index) => `Intervalo ${index + 1}`),
    datasets: [
      {
        label: 'Frecuencia de Longitudes de Cola',
        data: data,
        backgroundColor: 'rgba(53, 162, 235, 0.8)',
      },
    ],
  }

  return <Bar data={chartData} />
}

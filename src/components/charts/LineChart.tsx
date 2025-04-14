'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, Title, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(LineElement, PointElement, Title, Tooltip, Legend, CategoryScale, LinearScale)

interface LineChartProps {
  data: { x: number; y: number }[]
}

export function LineChart({ data }: LineChartProps) {
  const chartData = {
    labels: data.map(d => d.x),
    datasets: [
      {
        label: 'Longitud de Cola',
        data: data.map(d => d.y),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  }

  return <Line data={chartData} />
}

  
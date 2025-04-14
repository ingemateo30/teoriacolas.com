'use client'

import React from 'react'

interface MetricsDisplayProps {
  metrics: { [key: string]: number }
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="p-4 border rounded-xl bg-white shadow-md">
          <h3 className="text-sm font-semibold text-gray-600">{key}</h3>
          <p className="text-lg font-bold">{value.toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}

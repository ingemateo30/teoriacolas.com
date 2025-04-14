'use client'

import React from 'react'
import { useSimulationStore } from '@/store/simulationStore'

export function QueueVisualizer() {
  const result = useSimulationStore(state => state.result)

  if (!result) return <p className="text-gray-500">No hay simulación para visualizar.</p>

  return (
    <div className="p-4 border rounded-xl bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-2">Visualizador de Cola</h2>
      <div className="flex space-x-2">
        {Array.from({ length: result.finalQueueLength }).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" />
        ))}
      </div>
      <p className="text-sm mt-2">Clientes en cola: {result.finalQueueLength}</p>
    </div>
  )
}

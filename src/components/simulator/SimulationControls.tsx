'use client'

import React from 'react'
import { useSimulationStore } from '@/store/simulationStore'

export function SimulationControls() {
  const reset = useSimulationStore(state => state.reset)

  return (
    <div className="mt-4">
      <button
        onClick={reset}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Reiniciar Simulación
      </button>
    </div>
  )
}


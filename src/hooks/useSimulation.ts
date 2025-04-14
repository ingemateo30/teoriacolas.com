'use client'

import { useState, useCallback } from 'react'
import { simulateQueue } from '@/lib/simulation/core'
import type { SimulationParams, SimulationResult } from '@/types/simulation'

export function useSimulation() {
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const runSimulation = useCallback((params: SimulationParams) => {
    setLoading(true)
    const output = simulateQueue(params)
    setResult(output)
    setLoading(false)
  }, [])

  const resetSimulation = useCallback(() => {
    setResult(null)
  }, [])

  return {
    result,
    loading,
    runSimulation,
    resetSimulation,
  }
}

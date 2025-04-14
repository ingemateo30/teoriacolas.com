import { useMemo } from 'react'
import type { SimulationResult } from '@/types/simulation'

export function useChartData(simResult: SimulationResult | null) {
  return useMemo(() => {
    if (!simResult) return { line: [], histogram: [] }

    const line = simResult.events.map(e => ({
      x: e.time,
      y: e.queueLength,
    }))

    const histogram = simResult.events.map(e => e.queueLength)

    return { line, histogram }
  }, [simResult])
}

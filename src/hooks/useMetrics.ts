import { useMemo } from 'react'
import { calculateMetrics } from '@/lib/simulation/utils/metrics'
import type { SimulationParams } from '@/types/simulation'

export function useMetrics(params: SimulationParams) {
  return useMemo(() => {
    return calculateMetrics(params)
  }, [params])
}

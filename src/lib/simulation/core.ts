import { simulateMM1 } from './models/mm1'
import { SimulationParams, SimulationResult } from '@/types/simulation'

export function simulateQueue(params: SimulationParams): SimulationResult {
  switch (params.model) {
    case 'MM1':
      return simulateMM1(params)
    default:
      throw new Error(`Modelo ${params.model} no implementado`)
  }
}

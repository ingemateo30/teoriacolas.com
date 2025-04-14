import { SimulationParams } from '@/types/simulation'

export function validateParams(params: SimulationParams): string[] {
  const errors: string[] = []
  if (params.arrivalRate <= 0) errors.push('La tasa de llegada debe ser mayor a 0.')
  if (params.serviceRate <= 0) errors.push('La tasa de servicio debe ser mayor a 0.')
  if (params.arrivalRate >= params.serviceRate) errors.push('El sistema no es estable (λ >= μ).')
  return errors
}

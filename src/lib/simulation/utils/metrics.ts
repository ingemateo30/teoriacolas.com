import { SimulationParams } from '@/types/simulation'

export function calculateMetrics(params: SimulationParams) {
  const { arrivalRate, serviceRate } = params

  const ρ = arrivalRate / serviceRate
  const L = ρ / (1 - ρ)
  const Lq = ρ * ρ / (1 - ρ)
  const W = 1 / (serviceRate - arrivalRate)
  const Wq = arrivalRate / (serviceRate * (serviceRate - arrivalRate))

  return { ρ, L, Lq, W, Wq }
}

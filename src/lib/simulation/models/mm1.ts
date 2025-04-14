import { SimulationParams, SimulationResult, SimulationEvent } from '@/types/simulation'
import { exponential } from '../generators/exponential'

export function simulateMM1(params: SimulationParams): SimulationResult {
  const { arrivalRate, serviceRate, duration } = params

  let time = 0
  let queueLength = 0
  const events: SimulationEvent[] = []

  while (time < duration) {
    const arrival = exponential(arrivalRate)
    const service = exponential(serviceRate)

    time += arrival
    queueLength += 1

    events.push({ time, queueLength })

    time += service
    queueLength -= 1

    if (queueLength < 0) queueLength = 0

    events.push({ time, queueLength })
  }

  return {
    events,
    finalTime: time,
    finalQueueLength: queueLength,
  }
}

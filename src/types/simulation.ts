export type QueueModel =
  | 'MM1'
  | 'MMC'
  | 'MMCK'
  | 'MG1'
  | 'GM1'
  | 'GG1'
  | 'Networks'

export interface SimulationParams {
  model: QueueModel
  arrivalRate: number // λ
  serviceRate: number // μ
  servers?: number     // c (para MMC, MMCK)
  capacity?: number    // K (para MMCK)
  duration: number
}

export interface SimulationEvent {
  time: number
  queueLength: number
}

export interface SimulationResult {
  events: SimulationEvent[]
  finalTime: number
  finalQueueLength: number
}

export interface SimulationParameters {
  // Queue model parameters
  model: 'MM1' | 'MMC' | 'MMCK' | 'MG1' | 'GM1' | 'GG1';
  arrivalRate: number;  // λ - arrivals per unit time
  serviceRate: number;  // μ - service rate per unit time
  servers: number;      // c - number of servers
  capacity: number;     // k - system capacity (optional, -1 for infinite)
  
  // Simulation control parameters
  speed: number;        // simulation speed multiplier
  maxTime: number;      // maximum simulation time
  animationSpeed: number; // visual animation speed
  
  // Distribution types
  arrivalDistribution: 'exponential' | 'poisson' | 'uniform' | 'normal';
  serviceDistribution: 'exponential' | 'poisson' | 'uniform' | 'normal';
}

export interface SimulationEntity {
  id: number;
  arrivalTime: number;
  serviceStartTime?: number;
  departureTime?: number;
  status: 'waiting' | 'processing' | 'completed';
  position: { x: number; y: number }; // For animation
}

export interface QueueMetrics {
  avgWaitingTime: number;
  avgSystemTime: number;
  avgQueueLength: number;
  serverUtilization: number;
  throughput: number;
  // Puedes agregar más métricas según necesites
  waitingTimeDistribution?: number[];
  systemTimeDistribution?: number[];
}

export type SimulationState = 'idle' | 'running' | 'paused' | 'completed';

export interface SimulationEvent {
  time: number;
  type: 'arrival' | 'departure';
  entityId: number;
}

export interface SimulationSnapshot {
  time: number;
  queueLength: number;
  busyServers: number;
  metrics: QueueMetrics;
}

export interface SimulationResult {
  model: string;
  parameters: SimulationParameters;
  metrics: QueueMetrics;
  snapshots: SimulationSnapshot[];
  events: SimulationEvent[];
}
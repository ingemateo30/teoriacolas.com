import { DistributionParams, QueueDiscipline } from './models';

// Interfaz para un generador de números aleatorios
export interface RandomGenerator {
  seed: number;
  next(): number; // Genera un número aleatorio entre 0 y 1
  setSeed(seed: number): void;
}

// Interfaz para un generador de tiempos entre llegadas
export interface ArrivalGenerator {
  generate(): number; // Genera un tiempo entre llegadas
  getDistributionParams(): DistributionParams;
}

// Interfaz para un generador de tiempos de servicio
export interface ServiceGenerator {
  generate(): number; // Genera un tiempo de servicio
  getDistributionParams(): DistributionParams;
}

// Interfaz para una entidad en la simulación
export interface Entity {
  id: string;
  arrivalTime: number;
  serviceTime?: number;
  processingTime: number;
  waitingTime: number;
  status: EntityStatus;
  serverId: number | null;
  priority?: number;
  attributes?: Record<string, any>; 
  position: number; // Atributos adicionales
}

export type QueueModel = 
  | 'MM1' 
  | 'MMC' 
  | 'MMCK' 
  | 'MG1' 
  | 'GM1' 
  | 'GG1' 
  | 'GGCK' 
  | 'Network';

// Cambia el nombre de ModelType a QueueModel
export type ModelType = QueueModel;

// Tipos de estado de entidad
export type EntityStatus = 'arriving' | 'queued' | 'inService' | 'departed' | 'rejected';

// Interfaz para un evento en la simulación
export interface Event {
  time: number;
  type: EventType;
  entityId: string | null;
  serverId?: number;
}

// Tipos de eventos
export type EventType = 'arrival' | 'departure' | 'custom';

// Tipos de distribuciones disponibles
export type DistributionType = 'exponential' | 'constant' | 'uniform' | 'normal' | 'erlang' | 'custom';

// Tipos de modelos soportados

// Estado de la simulación
export type SimulationState = 'idle' | 'running' | 'paused' | 'completed';

// Parámetros de simulación
export interface SimulationParams {
  // Parámetros de llegada
  arrivalRate: number;                     // Tasa de llegada (λ)
  arrivalDistribution: DistributionType;   // Tipo de distribución de llegadas
  arrivalParams?: Record<string, number>;  // Parámetros adicionales para la distribución

  // Parámetros de servicio
  serviceRate: number;                     // Tasa de servicio (μ)
  serviceDistribution: DistributionType;   // Tipo de distribución de servicio
  serviceParams?: Record<string, number>;  // Parámetros adicionales para la distribución

  // Configuración del sistema
  serverCount?: number;                    // Número de servidores (c)
  systemCapacity?: number;                 // Capacidad del sistema (K), -1 para infinito
  
  // Configuración adicional
  queueDiscipline?: QueueDiscipline;       // Disciplina de cola
  populationSize?: number;                 // Tamaño de la población (para modelos de población finita)
  seed?: number;                           // Semilla para generación de números aleatorios
}

// Interfaz para el calendario de eventos
export interface EventCalendar {
  addEvent(event: Event): void;
  getNextEvent(): Event | undefined;
  removeEvent(event: Event): void;
  getCurrentTime(): number;
  isEmpty(): boolean;
  getEventCount(): number;
  clear(): void;
}

// Interfaz para la cola
export interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  getLength(): number;
  getItems(): T[];
  clear(): void;
}

// Interfaz para una estrategia de disciplina de cola
export interface QueueDisciplineStrategy<T> {
  type: QueueDiscipline;
  selectNext(queue: Queue<T>): T | undefined;
}

// Interfaz para un servidor
export interface Server {
  id: number;
  isBusy(): boolean;
  startService(entity: Entity, serviceTime: number): void;
  endService(): Entity | undefined;
  getCurrentEntity(): Entity | undefined;
  getUtilization(currentTime: number): number;
  getTotalBusyTime(): number;
}

// Interfaz para un recolector de estadísticas
export interface StatisticsCollector {
  recordArrival(time: number): void;
  recordQueueJoin(entity: Entity): void;
  recordQueueLeave(entity: Entity, time: number): void;
  recordServiceStart(entity: Entity, serverId: number, time: number): void;
  recordServiceEnd(entity: Entity, serverId: number, time: number): void;
  recordBlocking(entity: Entity, time: number): void;
  updateTimeSeries(time: number, queueLength: number, systemLength: number, serverUtilization: number[]): void;
  getStatistics(): any;
  reset(): void;
}

// Interfaz para el motor de simulación
export interface SimulationEngine {
  initialize(config: SimulationConfig): void;
  run(): SimulationResults;
  pause(): void;
  resume(): void;
  stop(): void;
  getState(): SimulationState;
  setRandomSeed(seed: number): void;
}

// Configuración de la simulación
export interface SimulationConfig {
  arrivalGenerator: ArrivalGenerator;
  serviceGenerator: ServiceGenerator;
  numServers: number;
  queueDiscipline: QueueDiscipline;
  capacity?: number;
  maxEntities?: number;
  maxTime?: number;
  seed?: number;
  collectTraces?: boolean;
  warmupPeriod?: number;
}

// Resultados de la simulación
export interface SimulationResults {
  avgWaitingTime: number;
  avgSystemTime: number;
  avgQueueLength: number;
  avgSystemLength: number;
  serverUtilization: number[];
  avgServerUtilization: number;
  throughput: number;
  idleProbability: number;
  blockingProbability?: number;
  waitingProbability: number;
  timeSeries?: {
    queueLength: [number, number][];
    systemLength: [number, number][];
    serverUtilization: [number, number][];
  };
  histogram?: {
    waitingTime: number[];
    systemTime: number[];
    queueLength: number[];
  };
  events?: Event[];
}

export interface SystemMetrics {
  avgWaitTime: number;
  avgSystemTime: number;
  avgQueueLength: number;
  avgSystemSize: number;
  serverUtilization: number;
  throughput: number;
}
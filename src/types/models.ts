// Tipos para los modelos de teoría de colas

// Tipo de distribución
export enum DistributionType {
    Exponential = 'exponential',
    Constant = 'constant',
    Uniform = 'uniform',
    Normal = 'normal',
    Poisson = 'poisson',
    Erlang = 'erlang',
    Gamma = 'gamma',
    Weibull = 'weibull',
    LogNormal = 'lognormal',
    Empirical = 'empirical'
  }
  
  // Parámetros de distribución
  export interface DistributionParams {
    type: DistributionType;
    // Parámetros específicos según el tipo de distribución
    mean?: number;
    std?: number;
    rate?: number; // Para distribución exponencial (λ)
    min?: number; // Para uniforme
    max?: number; // Para uniforme
    shape?: number; // Para distribuciones como Gamma, Erlang
    scale?: number; // Para distribuciones como Gamma, Weibull
    k?: number; // Para Erlang
    empiricalData?: number[]; // Para distribución empírica
  }
  
  // Disciplina de la cola
  export enum QueueDiscipline {
    FIFO = 'FIFO', // First In First Out
    LIFO = 'LIFO', // Last In First Out
    SIRO = 'SIRO', // Service In Random Order
    PRI = 'PRI',   // Priority
    SJF = 'SJF',   // Shortest Job First
    PSJF = 'PSJF'  // Preemptive Shortest Job First
  }
  
  // Modelo de teoría de colas base
  export interface QueueModel {
    id: string;
    name: string;
    description: string;
    arrivalDistribution: DistributionParams;
    serviceDistribution: DistributionParams;
    numServers: number;
    capacity?: number; // Capacidad del sistema (infinita si no se especifica)
    discipline: QueueDiscipline;
    population?: number; // Tamaño de la población (infinita si no se especifica)
    formula?: string; // Fórmula o notación Kendall
  }
  
  // Resultados de cálculos analíticos
  export interface AnalyticalResults {
    rho: number; // Factor de utilización
    L: number; // Número promedio de clientes en el sistema
    Lq: number; // Número promedio de clientes en la cola
    W: number; // Tiempo promedio en el sistema
    Wq: number; // Tiempo promedio en la cola
    Pb?: number; // Probabilidad de bloqueo (para sistemas con capacidad finita)
    P0?: number; // Probabilidad de sistema vacío
    Pn?: number[]; // Probabilidades de estados
  }
  
  // Configuración de la simulación
  export interface SimulationConfig {
    duration: number; // Duración de la simulación
    warmupPeriod?: number; // Periodo de calentamiento
    numReplications?: number; // Número de replicaciones
    seed?: number; // Semilla para números aleatorios
    collectTraces?: boolean; // Indicador para recolectar trazas detalladas
    stopCondition?: string; // Condición para detener la simulación
  }
  
  // Evento de la simulación
  export interface SimulationEvent {
    time: number;
    type: 'ARRIVAL' | 'DEPARTURE' | 'START_SERVICE';
    entityId: number;
    serverId?: number;
  }
  
  // Estado de una entidad (cliente)
  export interface EntityState {
    id: number;
    arrivalTime: number;
    serviceStartTime?: number;
    departureTime?: number;
    waitingTime?: number;
    serviceTime?: number;
    systemTime?: number;
    priority?: number;
    status: 'WAITING' | 'IN_SERVICE' | 'COMPLETED' | 'BLOCKED';
  }
  
  // Estado de un servidor
  export interface ServerState {
    id: number;
    busy: boolean;
    currentEntityId?: number;
    totalBusyTime: number;
    utilization: number;
  }
  
  // Estado del sistema
  export interface SystemState {
    time: number;
    entities: EntityState[];
    queue: EntityState[];
    servers: ServerState[];
    totalArrivals: number;
    totalDepartures: number;
    totalBlocked: number;
  }
  
  // Resultados de la simulación
  export interface SimulationResults {
    analyticalResults?: AnalyticalResults;
    simulationConfig: SimulationConfig;
    averageQueueLength: number;
    averageSystemLength: number;
    averageWaitingTime: number;
    averageSystemTime: number;
    serverUtilization: number[];
    avgServerUtilization: number;
    blockingProbability?: number;
    idleProbability: number;
    confidenceIntervals?: {
      waitingTime: [number, number];
      systemTime: [number, number];
      queueLength: [number, number];
      systemLength: [number, number];
      utilization: [number, number];
    };
    histogram?: {
      waitingTime: number[];
      systemTime: number[];
      queueLength: number[];
      systemLength: number[];
    };
    timeSeriesData?: {
      queueLength: [number, number][];
      systemLength: [number, number][];
      serverUtilization: [number, number][];
    };
    events?: SimulationEvent[];
    finalState?: SystemState;
  }
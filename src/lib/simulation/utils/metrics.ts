import { SimulationEntity, QueueMetrics, SimulationParameters } from '@/types/simulation';

export function calculateMetrics(
  entities: SimulationEntity[],
  currentTime: number,
  params: SimulationParameters
): QueueMetrics {
  // Contar entidades por estado
  const waiting = entities.filter(e => e.status === 'waiting').length;
  const processing = entities.filter(e => e.status === 'processing').length;
  
  // Calcular tiempos de espera y sistema para entidades en proceso
  let totalWaitingTime = 0;
  let totalSystemTime = 0;
  let completedCount = 0;
  
  // Para entidades procesadas completamente (que tienen todos los tiempos)
  entities.forEach(entity => {
    if (entity.status === 'processing' && entity.serviceStartTime) {
      // Entidades que están siendo atendidas
      const waitTime = entity.serviceStartTime - entity.arrivalTime;
      totalWaitingTime += waitTime;
      
      // Para el tiempo de sistema, usamos el tiempo actual como referencia
      const systemTime = currentTime - entity.arrivalTime;
      totalSystemTime += systemTime;
      completedCount++;
    } else if (entity.status === 'waiting') {
      // Para entidades en espera, el tiempo de espera es hasta ahora
      const waitTime = currentTime - entity.arrivalTime;
      totalWaitingTime += waitTime;
      totalSystemTime += waitTime; // Aún no tienen tiempo de servicio
    }
  });
  
  // Calcular promedios
  const avgWaitingTime = completedCount > 0 ? totalWaitingTime / entities.length : 0;
  const avgSystemTime = completedCount > 0 ? totalSystemTime / entities.length : 0;
  
  // Calcular utilización de servidores
  const serverUtilization = params.servers > 0 ? processing / params.servers : 0;
  
  // Calcular throughput (tasa de salida)
  // En estado estable, debería acercarse a la tasa de llegada si el sistema es estable
  const throughput = currentTime > 0 ? completedCount / currentTime : 0;
  
  // Tamaño medio de la cola
  const avgQueueLength = waiting;
  
  // Crear histogramas para distribuciones
  const waitingTimeDistribution = entities
    .filter(e => e.serviceStartTime)
    .map(e => e.serviceStartTime! - e.arrivalTime);
  
  const systemTimeDistribution = entities
    .filter(e => e.departureTime)
    .map(e => e.departureTime! - e.arrivalTime);
  
  return {
    avgWaitingTime,
    avgSystemTime,
    avgQueueLength,
    serverUtilization,
    throughput,
    waitingTimeDistribution,
    systemTimeDistribution
  };
}

// Función para calcular métricas teóricas según el modelo seleccionado
export function calculateTheoreticalMetrics(params: SimulationParameters): QueueMetrics {
  const { model, arrivalRate, serviceRate, servers, capacity } = params;
  
  // Factor de utilización del sistema
  const rho = arrivalRate / (serviceRate * servers);
  
  let avgWaitingTime = 0;
  let avgSystemTime = 0;
  let avgQueueLength = 0;
  let serverUtilization = 0;
  let throughput = 0;
  
  switch (model) {
    case 'MM1': {
      // M/M/1 model formulas
      serverUtilization = rho;
      avgQueueLength = rho * rho / (1 - rho);
      avgWaitingTime = avgQueueLength / arrivalRate;
      avgSystemTime = avgWaitingTime + 1 / serviceRate;
      throughput = arrivalRate;
      break;
    }
    case 'MMC': {
      // M/M/c model formulas (aproximación)
      serverUtilization = rho;
      
      // Probabilidad de que todos los servidores estén ocupados (fórmula de Erlang-C)
      const p0 = calculateErlangCP0(arrivalRate, serviceRate, servers);
      const erlangC = calculateErlangC(arrivalRate, serviceRate, servers, p0);
      
      avgWaitingTime = erlangC / (servers * serviceRate - arrivalRate);
      avgSystemTime = avgWaitingTime + 1 / serviceRate;
      avgQueueLength = arrivalRate * avgWaitingTime;
      throughput = arrivalRate;
      break;
    }
    case 'MMCK': {
      // M/M/c/K model (capacidad limitada)
      // Implementación básica, se puede mejorar con fórmulas más precisas
      if (capacity === -1) { // Infinito
        return calculateTheoreticalMetrics({...params, model: 'MMC'});
      }
      
      // Factor de carga
      const a = arrivalRate / serviceRate;
      
      // Probabilidades de estado
      const p = calculateMMCKProbabilities(a, servers, capacity);
      
      // Cálculo de métricas
      let L = 0; // Número esperado en el sistema
      for (let n = 0; n <= capacity; n++) {
        L += n * p[n];
      }
      
      // Probabilidad de rechazo (sistema lleno)
      const pK = p[capacity];
      
      // Tasa efectiva de llegada
      const lambdaEff = arrivalRate * (1 - pK);
      
      serverUtilization = (lambdaEff / serviceRate) / servers;
      avgQueueLength = L - (1 - p[0]) * servers;
      avgSystemTime = L / lambdaEff;
      avgWaitingTime = avgSystemTime - 1 / serviceRate;
      throughput = lambdaEff;
      break;
    }
    case 'MG1':
    case 'GM1':
    case 'GG1':
      // Estos modelos requieren más información sobre las distribuciones
      // Para una aproximación simple, utilizamos fórmulas de M/G/1 aproximado
      serverUtilization = rho;
      
      // Asumimos un coeficiente de variación para las distribuciones
      const cv = 1.0; // 1.0 para exponencial, puede ser diferente
      
      avgWaitingTime = (rho * (1 + cv * cv) / (2 * (1 - rho))) / serviceRate;
      avgSystemTime = avgWaitingTime + 1 / serviceRate;
      avgQueueLength = arrivalRate * avgWaitingTime;
      throughput = arrivalRate;
      break;
  }
  
  return {
    avgWaitingTime,
    avgSystemTime,
    avgQueueLength,
    serverUtilization,
    throughput
  };
}

// Funciones auxiliares para cálculos específicos

// Calcula P0 para la fórmula de Erlang-C
function calculateErlangCP0(arrivalRate: number, serviceRate: number, servers: number): number {
  const a = arrivalRate / serviceRate;
  let sum = 0;
  
  // Suma para n de 0 a c-1
  for (let n = 0; n < servers; n++) {
    sum += Math.pow(a, n) / factorial(n);
  }
  
  // Término para n = c
  sum += Math.pow(a, servers) / (factorial(servers) * (1 - a / servers));
  
  return 1 / sum;
}

// Calcula la fórmula de Erlang-C
function calculateErlangC(arrivalRate: number, serviceRate: number, servers: number, p0: number): number {
  const a = arrivalRate / serviceRate;
  const numerator = Math.pow(a, servers) * p0;
  const denominator = factorial(servers) * Math.pow(1 - a / servers, 2);
  
  return numerator / denominator;
}

// Calcula probabilidades para el modelo M/M/c/K
function calculateMMCKProbabilities(a: number, c: number, k: number): number[] {
  const p: number[] = [];
  let sum = 0;
  
  // Calcular probabilidades para n = 0 a n = c
  for (let n = 0; n <= c; n++) {
    p[n] = Math.pow(a, n) / factorial(n);
    sum += p[n];
  }
  
  // Calcular probabilidades para n = c+1 a n = k
  for (let n = c + 1; n <= k; n++) {
    p[n] = Math.pow(a, n) / (factorial(c) * Math.pow(c, n - c));
    sum += p[n];
  }
  
  // Normalizar
  for (let n = 0; n <= k; n++) {
    p[n] /= sum;
  }
  
  return p;
}

// Función factorial
function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
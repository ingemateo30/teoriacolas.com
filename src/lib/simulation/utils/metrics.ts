
// lib/simulation/utils/metrics.ts

interface QueueMetrics {
    utilization: number;
    avgQueueLength: number;
    avgWaitTime: number;
    avgSystemCustomers: number;
    probabilityWait: number;
    L: number;
    Lq: number;
  }
  
  interface UtilizationParams {
    arrivalRate: number;    // λ - Tasa de llegadas
    serviceRate: number;    // μ - Tasa de servicio
    servers?: number;       // s - Número de servidores (opcional)
  }
  
  interface QueueMetricsParams extends UtilizationParams {
    queueCapacity?: number; // K - Capacidad máxima del sistema
  }
  
  /**
   * Calcula la utilización del sistema (ρ)
   * @param params Parámetros del sistema de colas
   * @returns Utilización del sistema (0 a 1)
   */
  export function calculateUtilization(params: UtilizationParams): number {
    const { arrivalRate, serviceRate, servers = 1 } = params;
    
    // Validaciones básicas
    if (arrivalRate < 0 || serviceRate < 0) {
      throw new Error('Las tasas deben ser valores positivos');
    }
  
    const utilization = arrivalRate / (servers * serviceRate);
  
    if (utilization > 1) {
      throw new Error('El sistema es inestable (ρ > 1). Aumente los servidores o la tasa de servicio.');
    }
  
    return utilization;
  }
  
  /**
   * Calcula métricas clave para diferentes modelos de colas
   * @param params Parámetros del sistema
   * @returns Objeto con métricas calculadas
   */
  export function calculateQueueMetrics(params: QueueMetricsParams): QueueMetrics {
    const { arrivalRate, serviceRate, servers = 1, queueCapacity } = params;
    const utilization = calculateUtilization(params);
    
    // Validar parámetros
    if (servers < 1 || !Number.isInteger(servers)) {
      throw new Error('El número de servidores debe ser un entero positivo');
    }
  
    let metrics: Partial<QueueMetrics> = { utilization };
  
    // Modelo M/M/1
    if (servers === 1 && !queueCapacity) {
      metrics.avgQueueLength = (arrivalRate ** 2) / (serviceRate * (serviceRate - arrivalRate));
      metrics.avgWaitTime = metrics.avgQueueLength / arrivalRate;
      metrics.avgSystemCustomers = arrivalRate / (serviceRate - arrivalRate);
      metrics.probabilityWait = utilization;
    }
    // Modelo M/M/s
    else if (servers > 1 && !queueCapacity) {
      const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
      const rho = utilization;
      const p0 = 1 / (([...Array(servers).keys()]
        .reduce((sum, k) => sum + (arrivalRate/serviceRate) ** k / factorial(k), 0) +
        (arrivalRate/serviceRate) ** servers / (factorial(servers) * (1 - rho))));
  
      metrics.avgQueueLength = (p0 * (arrivalRate/serviceRate) ** servers * rho) / 
        (factorial(servers) * (1 - rho) ** 2);
      metrics.avgWaitTime = metrics.avgQueueLength / arrivalRate;
      metrics.avgSystemCustomers = metrics.avgQueueLength + arrivalRate / serviceRate;
      metrics.probabilityWait = (p0 * (arrivalRate/serviceRate) ** servers) / 
        (factorial(servers) * (1 - rho));
    }
    // Modelo M/M/1/K
    else if (queueCapacity) {
      const K = queueCapacity;
      const rho = utilization;
      
      if (rho === 1) {
        metrics.avgQueueLength = K * (K - 1) / (2 * (K + 1));
        metrics.avgSystemCustomers = K / 2;
      } else {
        metrics.avgQueueLength = rho / (1 - rho) - 
          ((K + 1) * rho ** (K + 1)) / (1 - rho ** (K + 1));
        metrics.avgSystemCustomers = metrics.avgQueueLength + rho;
      }
      
      metrics.avgWaitTime = metrics.avgQueueLength / (arrivalRate * (1 - (rho ** K)));
      metrics.probabilityWait = 1 - (1 - rho) / (1 - rho ** (K + 1));
    }
  
    return metrics as QueueMetrics;
  }
  
  // Funciones auxiliares para modelos específicos
  export function mm1Metrics(params: Omit<QueueMetricsParams, 'servers' | 'queueCapacity'>): QueueMetrics {
    return calculateQueueMetrics({ ...params, servers: 1 });
  }
  
  export function mmcMetrics(params: Omit<QueueMetricsParams, 'queueCapacity'>): QueueMetrics {
    return calculateQueueMetrics(params);
  }
  
  export function mm1kMetrics(params: QueueMetricsParams & { queueCapacity: number }): QueueMetrics {
    return calculateQueueMetrics(params);
  }
// src/lib/math/queueCalculations.ts

type QueueModel = 'MM1' | 'MMc' | 'MMcK' | 'MG1' | 'GM1' | 'GG1' | 'MM1K' | 'MGcK';

interface QueueParameters {
  lambda: number;        // Tasa de llegada
  mu: number;            // Tasa de servicio
  c: number;             // Número de servidores
  k?: number;            // Capacidad del sistema (si aplica)
  sigma?: number;        // Desviación estándar (para distribuciones generales)
  ca?: number;           // Coeficiente de variación de llegadas (para GG1)
  cs?: number;           // Coeficiente de variación de servicio (para GG1)
}

interface QueueMetrics {
  rho: number;           // Factor de utilización
  l: number;             // Número promedio de clientes en el sistema
  lq: number;            // Número promedio de clientes en cola
  w: number;             // Tiempo promedio en el sistema
  wq: number;            // Tiempo promedio en cola
  p0: number;            // Probabilidad de sistema vacío
  pn?: number[];         // Distribución de probabilidad de n clientes (si aplica)
  pk?: number;           // Probabilidad de sistema lleno (si aplica)
}

// Calcular factorial
function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Validar parámetros comunes
function validateCommonParameters(params: QueueParameters): void {
  if (params.lambda <= 0) throw new Error("La tasa de llegada (λ) debe ser mayor que 0");
  if (params.mu <= 0) throw new Error("La tasa de servicio (μ) debe ser mayor que 0");
  if (params.c < 1) throw new Error("El número de servidores (c) debe ser al menos 1");
}

// M/M/1 - Sistema de cola simple con llegadas y servicios exponenciales
function calculateMM1(params: QueueParameters, maxN: number): QueueMetrics {
  const { lambda, mu } = params;
  validateCommonParameters(params);
  
  const rho = lambda / mu;
  
  if (rho >= 1) {
    throw new Error("Sistema inestable: λ/μ debe ser menor que 1");
  }
  
  const p0 = 1 - rho;
  const l = rho / (1 - rho);
  const lq = rho * rho / (1 - rho);
  const w = 1 / (mu - lambda);
  const wq = lambda / (mu * (mu - lambda));
  
  // Calcular Pn para n = 0, 1, 2, ..., maxN
  const pn = Array(maxN + 1).fill(0).map((_, n) => (1 - rho) * Math.pow(rho, n));
  
  return { rho, l, lq, w, wq, p0, pn };
}

// M/M/c - Sistema con c servidores en paralelo
function calculateMMc(params: QueueParameters, maxN: number): QueueMetrics {
  const { lambda, mu, c } = params;
  validateCommonParameters(params);
  
  const rho = lambda / (mu * c);
  
  if (rho >= 1) {
    throw new Error("Sistema inestable: λ/(c·μ) debe ser menor que 1");
  }
  
  // Calcular P0
  let sum = 0;
  for (let n = 0; n < c; n++) {
    sum += Math.pow(lambda / mu, n) / factorial(n);
  }
  sum += Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho));
  
  const p0 = 1 / sum;
  
  // Calcular métricas
  const lq = (Math.pow(lambda / mu, c) * lambda * mu) / 
             (factorial(c - 1) * Math.pow(c * mu - lambda, 2)) * p0;
  const l = lq + lambda / mu;
  const wq = lq / lambda;
  const w = wq + 1 / mu;
  
  // Calcular Pn para n = 0, 1, 2, ..., maxN
  const pn = Array(maxN + 1).fill(0).map((_, n) => {
    if (n <= c) {
      return Math.pow(lambda / mu, n) / factorial(n) * p0;
    } else {
      return Math.pow(lambda / mu, n) * p0 / (factorial(c) * Math.pow(c, n - c));
    }
  });
  
  return { rho, l, lq, w, wq, p0, pn };
}

// M/M/c/K - Sistema con c servidores y capacidad máxima K
function calculateMMcK(params: QueueParameters, maxN: number): QueueMetrics {
  const { lambda, mu, c, k = 10 } = params;
  validateCommonParameters(params);
  
  if (k < c) {
    throw new Error("La capacidad del sistema (K) debe ser mayor o igual al número de servidores (c)");
  }
  
  const rho = lambda / (mu * c);
  
  // Calcular P0
  let sum = 0;
  for (let n = 0; n <= c; n++) {
    sum += Math.pow(lambda / mu, n) / factorial(n);
  }
  
  if (rho !== 1) {
    sum += Math.pow(lambda / mu, c) / factorial(c) * 
           (1 - Math.pow(rho, k - c + 1)) / (1 - rho);
  } else {
    sum += Math.pow(lambda / mu, c) / factorial(c) * (k - c + 1);
  }
  
  const p0 = 1 / sum;
  
  // Probabilidad de tener k clientes en el sistema (sistema lleno)
  let pk;
  if (rho !== 1) {
    pk = Math.pow(lambda / mu, k) * p0 / (factorial(c) * Math.pow(c, k - c));
  } else {
    pk = Math.pow(lambda / mu, k) * p0 / factorial(c);
  }
  
  // Tasa efectiva de llegada
  const lambdaEff = lambda * (1 - pk);
  
  // Calcular Lq
  let lq = 0;
  if (rho !== 1) {
    lq = p0 * Math.pow(lambda / mu, c) * rho / 
         (factorial(c) * Math.pow(1 - rho, 2)) * 
         (1 - Math.pow(rho, k - c + 1) - (k - c + 1) * Math.pow(rho, k - c) * (1 - rho));
  } else {
    lq = p0 * Math.pow(lambda / mu, c) / factorial(c) * (k - c) * (k - c + 1) / 2;
  }
  
  // Calcular otras métricas
  const l = lq + (1 - p0) - pk * (k - c);
  const wq = lq / lambdaEff;
  const w = wq + 1 / mu;
  
  // Calcular Pn para n = 0, 1, 2, ..., min(maxN, k)
  const pn = Array(Math.min(maxN, k) + 1).fill(0).map((_, n) => {
    if (n <= c) {
      return Math.pow(lambda / mu, n) / factorial(n) * p0;
    } else if (n <= k) {
      return Math.pow(lambda / mu, n) * p0 / (factorial(c) * Math.pow(c, n - c));
    } else {
      return 0;
    }
  });
  
  return { rho, l, lq, w, wq, p0, pn, pk };
}

// M/G/1 - Sistema con llegadas Poisson y servicio con distribución general
function calculateMG1(params: QueueParameters): QueueMetrics {
  const { lambda, mu, sigma = 0.5 } = params;
  validateCommonParameters(params);
  
  const rho = lambda / mu;
  
  if (rho >= 1) {
    throw new Error("Sistema inestable: λ/μ debe ser menor que 1");
  }
  
  const meanService = 1 / mu;
  const varianceService = Math.pow(sigma, 2);
  
  // Fórmula de Pollaczek-Khinchin
  const lq = (lambda * lambda * varianceService + Math.pow(rho, 2)) / 
             (2 * (1 - rho));
  const l = lq + rho;
  const wq = lq / lambda;
  const w = wq + meanService;
  const p0 = 1 - rho;
  
  return { rho, l, lq, w, wq, p0 };
}

// G/M/1 - Sistema con llegadas generales y servicio exponencial
function calculateGM1(params: QueueParameters, maxN: number): QueueMetrics {
    const { lambda, mu, ca = 1 } = params;
    validateCommonParameters(params);
    
    const rho = lambda / mu;
    
    if (rho >= 1) {
      throw new Error("Sistema inestable: λ/μ debe ser menor que 1");
    }
    
    // Para G/M/1, necesitamos resolver la ecuación:
    // z = B*(λ(1-z))
    // donde B*(s) es la transformada de Laplace-Stieltjes de la distribución de servicio
    // Para servicio exponencial, B*(s) = μ/(μ+s)
    
    // Para aproximar G/M/1, usamos el coeficiente de variación de llegadas (Ca)
    // y la fórmula de aproximación de Allen-Cunneen
  
    // Solución de la ecuación para obtener la raíz α
    const alpha = (1 - rho) / (1 + Math.pow(ca, 2) * rho);
    
    // Probabilidad de sistema vacío
    const p0 = 1 - rho;
    
    // Métricas
    const lq = rho * rho * (1 + Math.pow(ca, 2)) / (2 * (1 - rho));
    const l = lq + rho;
    const wq = lq / lambda;
    const w = wq + 1 / mu;
    
    // Calcular Pn para G/M/1 (distribución geométrica modificada)
    const pn = Array(maxN + 1).fill(0).map((_, n) => {
      if (n === 0) {
        return p0;
      } else {
        return p0 * (1 - alpha) * Math.pow(alpha, n - 1);
      }
    });
    
    return { rho, l, lq, w, wq, p0, pn };
  }
  
  // G/G/1 - Sistema con llegadas y servicios de distribución general
  function calculateGG1(params: QueueParameters): QueueMetrics {
    const { lambda, mu, ca = 1, cs = 1 } = params;
    validateCommonParameters(params);
    
    const rho = lambda / mu;
    
    if (rho >= 1) {
      throw new Error("Sistema inestable: λ/μ debe ser menor que 1");
    }
    
    // Aproximación de Kingman para G/G/1
    const lq = rho * rho * (Math.pow(ca, 2) + Math.pow(cs, 2)) / (2 * (1 - rho));
    const l = lq + rho;
    const wq = lq / lambda;
    const w = wq + 1 / mu;
    const p0 = 1 - rho;
    
    return { rho, l, lq, w, wq, p0 };
  }
  
  // M/M/1/K - Sistema con capacidad limitada K
  function calculateMM1K(params: QueueParameters, maxN: number): QueueMetrics {
    const { lambda, mu, k = 10 } = params;
    validateCommonParameters(params);
    
    const rho = lambda / mu;
    let p0, l, lq, w, wq, pk;
    
    if (rho === 1) {
      // Caso especial cuando rho = 1
      p0 = 1 / (k + 1);
      l = k / 2;
      pk = p0;
    } else {
      // Caso general
      p0 = (1 - rho) / (1 - Math.pow(rho, k + 1));
      l = rho * (1 - (k + 1) * Math.pow(rho, k) + k * Math.pow(rho, k + 1)) / 
          ((1 - rho) * (1 - Math.pow(rho, k + 1)));
      pk = Math.pow(rho, k) * p0;
    }
    
    // Tasa efectiva de llegada
    const lambdaEff = lambda * (1 - pk);
    
    // Número promedio en cola
    lq = l - (1 - p0);
    
    // Tiempos promedio
    w = l / lambdaEff;
    wq = lq / lambdaEff;
    
    // Calcular Pn para n = 0, 1, 2, ..., min(maxN, k)
    const pn = Array(Math.min(maxN, k) + 1).fill(0).map((_, n) => {
      if (n <= k) {
        return Math.pow(rho, n) * p0;
      } else {
        return 0;
      }
    });
    
    return { rho, l, lq, w, wq, p0, pn, pk };
  }
  
  // M/G/c/K - Sistema con llegadas Poisson, servicio general, c servidores y capacidad K
  function calculateMGcK(params: QueueParameters): QueueMetrics {
    const { lambda, mu, c, k = 10, sigma = 0.5 } = params;
    validateCommonParameters(params);
    
    if (k < c) {
      throw new Error("La capacidad del sistema (K) debe ser mayor o igual al número de servidores (c)");
    }
    
    const rho = lambda / (mu * c);
    
    // Coeficiente de variación del tiempo de servicio
    const cs = sigma * mu;
    
    // Aproximación de Whitt-Tijms
    // Primero calculamos el sistema M/M/c/K equivalente para obtener p0
    const mmckMetrics = calculateMMcK({ lambda, mu, c, k }, 0);
    const p0 = mmckMetrics.p0;
    const pk = mmckMetrics.pk as number;
    
    // Tasa efectiva de llegada
    const lambdaEff = lambda * (1 - pk);
    
    // Factor de corrección para el tiempo de espera debido a la variabilidad del servicio
    const correctionFactor = (1 + Math.pow(cs, 2)) / 2;
    
    // Ajustamos Lq y Wq con el factor de corrección
    const lq = mmckMetrics.lq * correctionFactor;
    const wq = lq / lambdaEff;
    
    // Los demás parámetros se mantienen igual
    const l = lq + (lambdaEff / mu);
    const w = wq + 1 / mu;
    
    return { rho, l, lq, w, wq, p0, pk };
  }
  
  // Función principal para calcular métricas según el modelo seleccionado
  export function calculateQueueMetrics(
    model: QueueModel, 
    params: QueueParameters, 
    maxN: number = 20
  ): QueueMetrics {
    try {
      switch (model) {
        case 'MM1':
          return calculateMM1(params, maxN);
        case 'MMc':
          return calculateMMc(params, maxN);
        case 'MMcK':
          return calculateMMcK(params, maxN);
        case 'MG1':
          return calculateMG1(params);
        case 'GM1':
          return calculateGM1(params, maxN);
        case 'GG1':
          return calculateGG1(params);
        case 'MM1K':
          return calculateMM1K(params, maxN);
        case 'MGcK':
          return calculateMGcK(params);
        default:
          throw new Error(`Modelo no soportado: ${model}`);
      }
    } catch (error) {
      throw error;
    }
  }
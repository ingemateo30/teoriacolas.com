// src/lib/math/formulas.ts
import { QueueModel } from '@/types/models';

/**
 * Función para el cálculo de fórmulas de teoría de colas
 */
export const calculateMetrics = {
  // Fórmulas para sistema M/M/1
  mm1: (lambda: number, mu: number) => {
    const rho = lambda / mu; // Factor de utilización
    if (rho >= 1) {
      return {
        rho,
        L: Infinity,
        Lq: Infinity,
        W: Infinity,
        Wq: Infinity,
        idle: 0,
        valid: false,
        message: 'El sistema es inestable (λ ≥ μ)'
      };
    }
    
    return {
      rho,                  // Factor de utilización
      L: rho / (1 - rho),   // Promedio de clientes en el sistema
      Lq: rho * rho / (1 - rho), // Promedio de clientes en cola
      W: 1 / (mu - lambda), // Tiempo promedio en el sistema
      Wq: rho / (mu * (1 - rho)), // Tiempo promedio en cola
      idle: 1 - rho,        // Probabilidad de sistema vacío
      valid: true,
      message: 'Cálculo exitoso'
    };
  },
  
  // Fórmulas para sistema M/M/c
  mmc: (lambda: number, mu: number, c: number) => {
    const rho = lambda / (mu * c); // Factor de utilización por servidor
    
    if (rho >= 1) {
      return {
        rho,
        L: Infinity,
        Lq: Infinity,
        W: Infinity,
        Wq: Infinity,
        idle: 0,
        valid: false,
        message: 'El sistema es inestable (λ ≥ cμ)'
      };
    }
    
    // Cálculo de P0 (probabilidad de sistema vacío)
    let sum = 0;
    for (let n = 0; n < c; n++) {
      sum += Math.pow(lambda / mu, n) / factorial(n);
    }
    const lastTerm = Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho));
    const P0 = 1 / (sum + lastTerm);
    
    // Probabilidad de que todos los servidores estén ocupados
    const Pc = Math.pow(lambda / mu, c) * P0 / factorial(c);
    
    // Longitud promedio de la cola
    const Lq = Pc * rho / (1 - rho);
    
    // Número promedio de clientes en el sistema
    const L = Lq + lambda / mu;
    
    // Tiempo promedio de espera en la cola
    const Wq = Lq / lambda;
    
    // Tiempo promedio en el sistema
    const W = Wq + 1 / mu;
    
    return {
      rho,
      L,
      Lq,
      W,
      Wq,
      P0,
      idle: P0,
      valid: true,
      message: 'Cálculo exitoso'
    };
  },
  
  // Fórmulas para sistema M/M/c/K
  mmck: (lambda: number, mu: number, c: number, K: number) => {
    const r = lambda / mu;
    const rho = r / c;
    
    // Cálculo de P0 (probabilidad de sistema vacío)
    let sum1 = 0;
    for (let n = 0; n <= c - 1; n++) {
      sum1 += Math.pow(r, n) / factorial(n);
    }
    
    let sum2 = 0;
    for (let n = c; n <= K; n++) {
      sum2 += Math.pow(r, n) / (factorial(c) * Math.pow(c, n - c));
    }
    
    const P0 = 1 / (sum1 + sum2);
    
    // Cálculo de la probabilidad de bloqueo
    const PK = (Math.pow(r, K) * P0) / (factorial(c) * Math.pow(c, K - c));
    
    // Lambda efectiva (tasa efectiva de llegada)
    const lambdaEff = lambda * (1 - PK);
    
    // Número promedio de clientes en el sistema
    let L = 0;
    for (let n = 1; n <= K; n++) {
      let Pn;
      if (n <= c) {
        Pn = (Math.pow(r, n) * P0) / factorial(n);
      } else {
        Pn = (Math.pow(r, n) * P0) / (factorial(c) * Math.pow(c, n - c));
      }
      L += n * Pn;
    }
    
    // Número promedio de clientes en la cola
    let Lq = 0;
    for (let n = c + 1; n <= K; n++) {
      const Pn = (Math.pow(r, n) * P0) / (factorial(c) * Math.pow(c, n - c));
      Lq += (n - c) * Pn;
    }
    
    // Tiempo promedio en el sistema
    const W = L / lambdaEff;
    
    // Tiempo promedio en la cola
    const Wq = Lq / lambdaEff;
    
    // Utilización del sistema
    const rhoSystem = 1 - P0;
    
    // Utilización por servidor
    const rhoServer = r / c;
    
    return {
      rho: rhoServer,
      rhoSystem,
      L,
      Lq,
      W,
      Wq,
      P0,
      PK,
      lambdaEff,
      idle: P0,
      blockingRate: PK,
      valid: true,
      message: 'Cálculo exitoso'
    };
  },
  
  // Fórmulas para sistema M/G/1 (Fórmula de Pollaczek-Khinchine)
  mg1: (lambda: number, mu: number, variance: number) => {
    const rho = lambda / mu;
    
    if (rho >= 1) {
      return {
        rho,
        L: Infinity,
        Lq: Infinity,
        W: Infinity,
        Wq: Infinity,
        idle: 0,
        valid: false,
        message: 'El sistema es inestable (λ ≥ μ)'
      };
    }
    
    // Cálculo del coeficiente de variación al cuadrado
    const Ca2 = variance * Math.pow(mu, 2);
    
    // Longitud promedio de la cola (Fórmula de Pollaczek-Khinchine)
    const Lq = (rho * rho * (1 + Ca2)) / (2 * (1 - rho));
    
    // Número promedio de clientes en el sistema
    const L = Lq + rho;
    
    // Tiempo promedio de espera en la cola
    const Wq = Lq / lambda;
    
    // Tiempo promedio en el sistema
    const W = Wq + 1 / mu;
    
    return {
      rho,
      L,
      Lq,
      W,
      Wq,
      Ca2,
      idle: 1 - rho,
      valid: true,
      message: 'Cálculo exitoso'
    };
  },
  
  // Fórmulas para sistema G/M/1
  gm1: (lambda: number, mu: number, variance: number) => {
    // Coeficiente de variación al cuadrado para los tiempos entre llegadas
    const Ce2 = variance * Math.pow(lambda, 2);
    const rho = lambda / mu;
    
    if (rho >= 1) {
      return {
        rho,
        L: Infinity,
        Lq: Infinity,
        W: Infinity,
        Wq: Infinity,
        idle: 0,
        valid: false,
        message: 'El sistema es inestable (λ ≥ μ)'
      };
    }
    
    // Resolver la ecuación rho * alpha = r para r
    const alpha = (2 + Ce2) / (Ce2);
    let r = solveRootGM1(rho, alpha);
    
    // Probabilidad de sistema vacío
    const P0 = 1 - rho;
    
    // Longitud promedio de la cola
    const Lq = (rho * rho + lambda * lambda * variance) / (2 * (1 - rho));
    
    // Número promedio de clientes en el sistema
    const L = Lq + rho;
    
    // Tiempo promedio de espera en la cola
    const Wq = Lq / lambda;
    
    // Tiempo promedio en el sistema
    const W = Wq + 1 / mu;
    
    return {
      rho,
      L,
      Lq,
      W,
      Wq,
      Ce2,
      P0,
      idle: P0,
      valid: true,
      message: 'Cálculo exitoso'
    };
  },
  
  // Aproximación para sistema G/G/1 (Fórmula de Kingman)
  gg1: (lambda: number, mu: number, arrivalVariance: number, serviceVariance: number) => {
    const rho = lambda / mu;
    
    if (rho >= 1) {
      return {
        rho,
        L: Infinity,
        Lq: Infinity,
        W: Infinity,
        Wq: Infinity,
        idle: 0,
        valid: false,
        message: 'El sistema es inestable (λ ≥ μ)'
      };
    }
    
    // Coeficientes de variación
    const Ca2 = arrivalVariance * Math.pow(lambda, 2);
    const Cs2 = serviceVariance * Math.pow(mu, 2);
    
    // Tiempo promedio de espera en la cola (Aproximación de Kingman)
    const Wq = (rho / (1 - rho)) * ((Ca2 + Cs2) / 2) * (1 / mu);
    
    // Longitud promedio de la cola
    const Lq = lambda * Wq;
    
    // Tiempo promedio en el sistema
    const W = Wq + 1 / mu;
    
    // Número promedio de clientes en el sistema
    const L = lambda * W;
    
    return {
      rho,
      L,
      Lq,
      W,
      Wq,
      Ca2,
      Cs2,
      idle: 1 - rho,
      valid: true,
      message: 'Cálculo exitoso'
    };
  }
};

// Funciones auxiliares
function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Función para resolver la ecuación para G/M/1
function solveRootGM1(rho: number, alpha: number): number {
  // Implementación simple de Newton-Raphson para encontrar la raíz
  let r = 0.5; // Valor inicial
  const maxIter = 100;
  const tolerance = 1e-6;
  
  for (let i = 0; i < maxIter; i++) {
    const f = Math.pow(r, alpha) - rho * r - (1 - rho);
    const fprime = alpha * Math.pow(r, alpha - 1) - rho;
    
    const delta = f / fprime;
    r = r - delta;
    
    if (Math.abs(delta) < tolerance) {
      break;
    }
  }
  
  return r;
}
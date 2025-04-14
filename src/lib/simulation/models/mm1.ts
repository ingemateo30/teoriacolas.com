
export interface MM1Parameters {
  arrivalRate: number;
  serviceRate: number;
}

export interface MM1Results {
  rho: number;        // Factor de utilización
  L: number;          // Número medio de clientes en el sistema
  Lq: number;         // Longitud media de la cola
  W: number;          // Tiempo medio en el sistema
  Wq: number;         // Tiempo medio en la cola
  Pn: number[];       // Probabilidades de estado (número de clientes)
  P0: number;         // Probabilidad de sistema vacío
}

export const mm1 = (params: MM1Parameters): MM1Results => {
  const { arrivalRate, serviceRate } = params;
  
  // Validar estabilidad
  if (arrivalRate >= serviceRate) {
    throw new Error('El sistema no es estable: λ debe ser menor que μ');
  }
  
  // Cálculo de métricas
  const rho = arrivalRate / serviceRate;
  const L = rho / (1 - rho);
  const Lq = Math.pow(rho, 2) / (1 - rho);
  const W = 1 / (serviceRate - arrivalRate);
  const Wq = rho / (serviceRate - arrivalRate);
  
  // Probabilidades de estado
  const P0 = 1 - rho;
  const Pn = Array(10).fill(0).map((_, i) => P0 * Math.pow(rho, i));
  
  return {
    rho,
    L,
    Lq,
    W,
    Wq,
    Pn,
    P0
  };
};
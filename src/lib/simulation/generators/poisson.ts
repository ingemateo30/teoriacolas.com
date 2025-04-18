/**
 * Genera un valor aleatorio de una distribución de Poisson
 * @param lambda Tasa promedio de ocurrencia (eventos por unidad de tiempo)
 * @returns Número de eventos en un intervalo de tiempo
 */
export function generatePoisson(lambda: number): number {
  // Para generar un tiempo entre llegadas con distribución de Poisson,
  // usamos la distribución exponencial que es el tiempo entre llegadas
  // cuando el número de llegadas sigue una distribución de Poisson
  return generateExponential(lambda);
}

// Función para generar un número entero de eventos según distribución de Poisson
export function generatePoissonCount(lambda: number): number {
  // Algoritmo para generar un número de Poisson directamente
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  
  do {
    k++;
    const u = Math.random();
    p *= u;
  } while (p > L);
  
  return k - 1;
}

// Importamos la función exponencial
import { generateExponential } from './exponential';
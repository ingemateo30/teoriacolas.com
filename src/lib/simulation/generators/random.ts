/**
 * Genera un valor aleatorio de una distribución uniforme
 * @param min Valor mínimo
 * @param max Valor máximo
 * @returns Valor aleatorio uniforme entre min y max
 */
export function generateUniform(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Genera un valor aleatorio de una distribución normal (Gaussiana)
 * usando el método de Box-Muller
 * @param mean Media de la distribución
 * @param stdDev Desviación estándar de la distribución
 * @returns Valor aleatorio con distribución normal
 */
export function generateNormal(mean: number, stdDev: number): number {
  // Implementación de Box-Muller para distribución normal
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // Evitar logaritmo de cero
  while (v === 0) v = Math.random();
  
  // Box-Muller transform
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  
  // Transformar a la media y desviación estándar deseadas
  return mean + z * stdDev;
}

/**
 * Establece una semilla para el generador de números aleatorios (no funcional en JavaScript nativo)
 * @param seed Semilla para el generador
 */
export function setSeed(seed: number): void {
  // JavaScript nativo no permite establecer una semilla para Math.random()
  // Esta función es un placeholder para implementaciones futuras
  console.warn('setSeed no está implementado en JavaScript nativo');
}
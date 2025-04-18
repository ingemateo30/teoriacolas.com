/**
 * Genera un valor aleatorio de una distribución exponencial
 * @param lambda Tasa promedio de ocurrencia (eventos por unidad de tiempo)
 * @returns Tiempo entre eventos
 */
export function generateExponential(lambda: number): number {
  // Para distribución exponencial, generamos con la fórmula:
  // -ln(u) / lambda donde u es un número aleatorio uniforme en (0,1)
  const u = Math.random();
  return -Math.log(u) / lambda;
}

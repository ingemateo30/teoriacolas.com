import { RandomGenerator } from './random';

export class PoissonGenerator {
  private randomGenerator: RandomGenerator;
  private lambda: number;

  constructor(lambda: number, seed?: number) {
    this.lambda = lambda;
    this.randomGenerator = new RandomGenerator(seed);
  }

  /**
   * Genera un número aleatorio con distribución de Poisson
   */
  public next(): number {
    const L = Math.exp(-this.lambda);
    let k = 0;
    let p = 1;
    
    do {
      k += 1;
      p *= this.randomGenerator.random();
    } while (p > L);
    
    return k - 1;
  }

  /**
   * Establece una nueva tasa lambda para la distribución
   */
  public setLambda(lambda: number): void {
    this.lambda = lambda;
  }

  /**
   * Establece una nueva semilla para el generador
   */
  public setSeed(seed: number): void {
    this.randomGenerator.setSeed(seed);
  }
}
  
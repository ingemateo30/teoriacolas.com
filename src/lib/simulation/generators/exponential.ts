import { RandomGenerator } from './random';

export class ExponentialGenerator {
  private randomGenerator: RandomGenerator;
  private lambda: number;

  constructor(lambda: number, seed?: number) {
    this.lambda = lambda;
    this.randomGenerator = new RandomGenerator(seed);
  }

  /**
   * Genera un número aleatorio con distribución exponencial
   */
  public next(): number {
    return -Math.log(this.randomGenerator.random()) / this.lambda;
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


export function exponential(rate: number): number {
    return -Math.log(1.0 - Math.random()) / rate
  }
  
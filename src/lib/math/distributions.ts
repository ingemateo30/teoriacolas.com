export class Distributions {
    // Genera un número aleatorio uniforme entre min y max
    static uniform(min: number, max: number, random = Math.random): number {
      return min + (max - min) * random();
    }
    
    // Genera un número aleatorio exponencial con tasa lambda
    static exponential(lambda: number, random = Math.random): number {
      return -Math.log(random()) / lambda;
    }
    
    // Genera un número aleatorio con distribución normal (Box-Muller)
    static normal(mean: number, stdDev: number, random = Math.random): number {
      const u1 = random();
      const u2 = random();
      const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      return mean + z0 * stdDev;
    }
    
    // Genera un número aleatorio con distribución de Poisson
    static poisson(lambda: number, random = Math.random): number {
      const L = Math.exp(-lambda);
      let k = 0;
      let p = 1;
      
      do {
        k += 1;
        p *= random();
      } while (p > L);
      
      return k - 1;
    }
    
    // Genera un número aleatorio con distribución de Erlang
    static erlang(k: number, lambda: number, random = Math.random): number {
      let product = 1;
      for (let i = 0; i < k; i++) {
        product *= random();
      }
      return -Math.log(product) / lambda;
    }
    
    // Genera un número aleatorio con distribución constante
    static constant(value: number): number {
      return value;
    }
    
    // Genera un número aleatorio con distribución gamma
    static gamma(alpha: number, beta: number, random = Math.random): number {
      // Para alpha entero, utilizamos la suma de exponenciales
      if (Number.isInteger(alpha)) {
        let sum = 0;
        for (let i = 0; i < alpha; i++) {
          sum += this.exponential(1, random);
        }
        return sum / beta;
      }
      
      // Para alpha no entero, utilizamos el algoritmo de Marsaglia y Tsang
      if (alpha < 1) {
        const result = this.gamma(alpha + 1, beta, random) * Math.pow(random(), 1 / alpha);
        return result;
      }
      
      const d = alpha - 1/3;
      const c = 1 / Math.sqrt(9 * d);
      
      while (true) {
        const x = this.normal(0, 1, random);
        const v = Math.pow(1 + c * x, 3);
        
        if (v <= 0) continue;
        
        const u = random();
        if (u < 1 - 0.0331 * Math.pow(x, 4)) {
          return d * v / beta;
        }
        
        if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
          return d * v / beta;
        }
      }
    }
    
    // Genera un número aleatorio con distribución Weibull
    static weibull(alpha: number, beta: number, random = Math.random): number {
      return beta * Math.pow(-Math.log(random()), 1 / alpha);
    }
    
    // Genera un número aleatorio con distribución logarítmica normal
    static logNormal(mu: number, sigma: number, random = Math.random): number {
      return Math.exp(this.normal(mu, sigma, random));
    }
    
    // Genera un número aleatorio con distribución triangular
    static triangular(min: number, mode: number, max: number, random = Math.random): number {
      const u = random();
      const fc = (mode - min) / (max - min);
      
      if (u < fc) {
        return min + Math.sqrt(u * (max - min) * (mode - min));
      } else {
        return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
      }
    }
    
    // Genera un número aleatorio con distribución discreta
    static discrete(values: number[], probabilities: number[], random = Math.random): number {
      if (values.length !== probabilities.length) {
        throw new Error('Los arrays de valores y probabilidades deben tener la misma longitud');
      }
      
      const cumulativeProbabilities = probabilities.reduce((acc, prob, i) => {
        acc.push((acc[i - 1] || 0) + prob);
        return acc;
      }, [] as number[]);
      
      const u = random();
      const index = cumulativeProbabilities.findIndex(cp => u <= cp);
      
      return values[index !== -1 ? index : values.length - 1];
    }
  }
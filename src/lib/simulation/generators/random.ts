// src/lib/generators/random.ts
/**
 * Generador de números aleatorios con soporte para semillas
 */
export class RandomGenerator {
    private seed: number;
    private a: number = 1664525;
    private c: number = 1013904223;
    private m: number = Math.pow(2, 32);
    private state: number;
  
    constructor(seed?: number) {
      this.seed = seed ?? Math.floor(Math.random() * this.m);
      this.state = this.seed;
    }
  
    /**
     * Devuelve un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
     */
    public random(): number {
      this.state = (this.a * this.state + this.c) % this.m;
      return this.state / this.m;
    }
  
    /**
     * Devuelve un número entero aleatorio entre min (inclusive) y max (exclusivo)
     */
    public randomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(this.random() * (max - min)) + min;
    }
  
    /**
     * Establece una nueva semilla para el generador
     */
    public setSeed(seed: number): void {
      this.seed = seed;
      this.state = seed;
    }
  
    /**
     * Devuelve la semilla actual
     */
    public getSeed(): number {
      return this.seed;
    }
  }
  
  // Implementación de Mersenne Twister para mejor calidad estadística
  export class MersenneTwister {
    private N: number = 624;
    private M: number = 397;
    private MATRIX_A: number = 0x9908b0df;
    private UPPER_MASK: number = 0x80000000;
    private LOWER_MASK: number = 0x7fffffff;
    private mt: number[] = new Array(this.N);
    private mti: number = this.N + 1;
    private seed: number;
  
    constructor(seed?: number) {
      this.seed = seed ?? Math.floor(Math.random() * 0xFFFFFFFF);
      this.initGenRand(this.seed);
    }
  
    private initGenRand(s: number): void {
      this.mt[0] = s >>> 0;
      for (this.mti = 1; this.mti < this.N; this.mti++) {
        const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
        this.mt[this.mti] = (
            ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + 
            (s & 0x0000ffff) * 1812433253
        ) + this.mti;
        this.mt[this.mti] >>>= 0;
      }
    }
  
    private genRandInt32(): number {
      let y: number;
      const mag01: number[] = [0x0, this.MATRIX_A];
  
      if (this.mti >= this.N) {
        let kk: number;
  
        if (this.mti === this.N + 1) {
          this.initGenRand(5489);
        }
  
        for (kk = 0; kk < this.N - this.M; kk++) {
          y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
          this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        for (; kk < this.N - 1; kk++) {
          y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
          this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
        this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
  
        this.mti = 0;
      }
  
      y = this.mt[this.mti++];
  
      y ^= (y >>> 11);
      y ^= (y << 7) & 0x9d2c5680;
      y ^= (y << 15) & 0xefc60000;
      y ^= (y >>> 18);
  
      return y >>> 0;
    }
  
    /**
     * Devuelve un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
     */
    public random(): number {
      return this.genRandInt32() * (1.0 / 4294967296.0);
    }
  
    /**
     * Devuelve un número entero aleatorio entre min (inclusive) y max (exclusivo)
     */
    public randomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(this.random() * (max - min)) + min;
    }
  
    /**
     * Establece una nueva semilla para el generador
     */
    public setSeed(seed: number): void {
      this.seed = seed;
      this.initGenRand(seed);
    }
  
    /**
     * Devuelve la semilla actual
     */
    public getSeed(): number {
      return this.seed;
    }
  }
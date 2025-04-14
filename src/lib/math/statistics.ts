export function calculateMean(data: number[]): number {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  }
  
  export function calculateVariance(data: number[]): number {
    if (data.length <= 1) return 0;
    const mean = calculateMean(data);
    const squaredDifferences = data.map(val => Math.pow(val - mean, 2));
    const sum = squaredDifferences.reduce((acc, val) => acc + val, 0);
    return sum / (data.length - 1);
  }
  
  export function calculateStandardDeviation(data: number[]): number {
    return Math.sqrt(calculateVariance(data));
  }
  
  export function calculateConfidenceInterval(data: number[], confidenceLevel = 0.95): [number, number] {
    const mean = calculateMean(data);
    const stdDev = calculateStandardDeviation(data);
    const n = data.length;
    
    // Usando aproximación normal para intervalos de confianza
    // Para 95% de confianza, z = 1.96
    const z = confidenceLevel === 0.95 ? 1.96 : 
              confidenceLevel === 0.99 ? 2.576 : 
              confidenceLevel === 0.90 ? 1.645 : 1.96;
    
    const marginOfError = z * (stdDev / Math.sqrt(n));
    
    return [mean - marginOfError, mean + marginOfError];
  }
  
  export function calculatePercentile(data: number[], percentile: number): number {
    if (data.length === 0) return 0;
    
    const sortedData = [...data].sort((a, b) => a - b);
    const index = (percentile / 100) * (sortedData.length - 1);
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    
    if (lowerIndex === upperIndex) {
      return sortedData[lowerIndex];
    }
    
    const weight = index - lowerIndex;
    return sortedData[lowerIndex] * (1 - weight) + sortedData[upperIndex] * weight;
  }
  
  export function calculateHistogram(data: number[], bins = 10): {binStart: number, binEnd: number, count: number}[] {
    if (data.length === 0) return [];
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binWidth = (max - min) / bins;
    
    const histogram = Array(bins).fill(0).map((_, i) => ({
      binStart: min + i * binWidth,
      binEnd: min + (i + 1) * binWidth,
      count: 0
    }));
    
    data.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
      histogram[binIndex].count++;
    });
    
    return histogram;
  }
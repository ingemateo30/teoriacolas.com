import { useEffect, useRef } from 'react';

interface HistogramChartProps {
  data: number[];
  bins?: number;
  width?: number;
  height?: number;
}

export const HistogramChart = ({
  data,
  bins = 8,
  width = 300,
  height = 200
}: HistogramChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calcular histograma
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const binWidth = range / bins;
    
    const histogram = Array(bins).fill(0);
    
    data.forEach(value => {
      const binIndex = Math.min(bins - 1, Math.floor((value - min) / binWidth));
      histogram[binIndex]++;
    });
    
    const maxFreq = Math.max(...histogram);
    
    // Dibujar barras
    const barWidth = (width - 50) / bins;
    
    histogram.forEach((freq, i) => {
      const x = 40 + i * barWidth;
      const barHeight = (freq / maxFreq) * (height - 40);
      const y = height - 20 - barHeight;
      
      ctx.fillStyle = '#0070f3';
      ctx.fillRect(x, y, barWidth - 2, barHeight);
      
      // Etiqueta del bin
      const binStart = min + i * binWidth;
      ctx.fillStyle = '#333';
      ctx.font = '10px Arial';
      ctx.fillText(binStart.toFixed(1), x, height - 5);
    });
    
    // Etiquetas de los ejes
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('Valor', width / 2, height);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Frecuencia', 0, 0);
    ctx.restore();
    
  }, [data, bins, width, height]);
  
  return (
    <div className="histogram-chart">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};
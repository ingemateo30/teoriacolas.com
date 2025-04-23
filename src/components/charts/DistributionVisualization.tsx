import { useEffect, useRef } from 'react';

interface DistributionVisualizationProps {
  data: number[];
  width?: number;
  height?: number;
}

export const DistributionVisualization = ({
  data,
  width = 300,
  height = 200
}: DistributionVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    
    
    const sortedData = [...data].sort((a, b) => a - b);
    const n = sortedData.length;
    const min = sortedData[0];
    const max = sortedData[n - 1];
    
    
    ctx.beginPath();
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.moveTo(30, 10);
    ctx.lineTo(30, height - 10);
    ctx.lineTo(width - 10, height - 10);
    ctx.stroke();
    
    
    const scaleX = (x: number) => ((x - min) / (max - min)) * (width - 50) + 30;
    const scaleY = (y: number) => height - 20 - y * (height - 40);
    
    
    ctx.beginPath();
    ctx.strokeStyle = '#0070f3';
    ctx.lineWidth = 2;
    
    sortedData.forEach((value, index) => {
      const x = scaleX(value);
      const y = scaleY((index + 1) / n);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('Valor', width / 2, height);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Probabilidad acumulada', 0, 0);
    ctx.restore();
    
    
    ctx.fillText(min.toFixed(1), 30, height - 5);
    ctx.fillText(max.toFixed(1), width - 30, height - 5);
    
  }, [data, width, height]);
  
  return (
    <div className="distribution-visualization">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};
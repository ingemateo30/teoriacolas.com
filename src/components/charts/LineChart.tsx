import { useEffect, useRef } from 'react';

interface LineChartProps {
  data: Array<{ [key: string]: any }>;
  xKey: string;
  yKey: string;
  width?: number;
  height?: number;
}

export const LineChart = ({ 
  data, 
  xKey, 
  yKey, 
  width = 300, 
  height = 200 
}: LineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);
    
    // Encontrar los valores máximos para escalar
    const xMax = Math.max(...data.map(d => d[xKey]));
    const yMax = Math.max(...data.map(d => d[yKey]));
    
    // Función para escalar los valores
    const scaleX = (x: number) => (x / xMax) * (width - 40) + 30;
    const scaleY = (y: number) => height - (y / yMax) * (height - 40) - 10;
    
    // Dibujar ejes
    ctx.beginPath();
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    ctx.moveTo(30, 10);
    ctx.lineTo(30, height - 10);
    ctx.lineTo(width - 10, height - 10);
    ctx.stroke();
    
    // Dibujar la línea de datos
    ctx.beginPath();
    ctx.strokeStyle = '#0070f3';
    ctx.lineWidth = 2;
    
    data.forEach((point, index) => {
      const x = scaleX(point[xKey]);
      const y = scaleY(point[yKey]);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Dibujar puntos
    data.forEach(point => {
      const x = scaleX(point[xKey]);
      const y = scaleY(point[yKey]);
      
      ctx.beginPath();
      ctx.fillStyle = '#0070f3';
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Etiquetas de los ejes
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('Tiempo', width / 2, height - 2);
    ctx.save();
    ctx.translate(10, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Valor', 0, 0);
    ctx.restore();
    
  }, [data, xKey, yKey, width, height]);
  
  return (
    <div className="line-chart">
      <canvas 
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
};

  
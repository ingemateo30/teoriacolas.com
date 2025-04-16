// src/components/calculator/PnDistributionChart.tsx
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

interface PnDistributionChartProps {
  probabilities: number[];
}

const PnDistributionChart: React.FC<PnDistributionChartProps> = ({ probabilities }) => {
  const data = probabilities.map((probability, index) => ({
    n: index,
    probability
  }));

  return (
    <div className="w-full h-96">
      <div className="mb-4">
        <p className="font-medium text-gray-700">
          Probabilidad Pn: Probabilidad de tener exactamente n clientes en el sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80">
          <h4 className="text-center font-medium mb-2">Gráfico de barras</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="n" 
                label={{ value: 'Número de clientes (n)', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis
                label={{ value: 'Probabilidad P(n)', angle: -90, position: 'insideLeft' }}
                domain={[0, Math.max(...probabilities) * 1.1]}
              />
              <Tooltip 
                formatter={(value: number) => value.toFixed(4)}
                labelFormatter={(label) => `n = ${label}`}
              />
              <Legend />
              <Bar dataKey="probability" name="P(n)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80">
          <h4 className="text-center font-medium mb-2">Gráfico de línea</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="n" 
                label={{ value: 'Número de clientes (n)', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis
                label={{ value: 'Probabilidad P(n)', angle: -90, position: 'insideLeft' }}
                domain={[0, Math.max(...probabilities) * 1.1]}
              />
              <Tooltip 
                formatter={(value: number) => value.toFixed(4)}
                labelFormatter={(label) => `n = ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="probability" 
                name="P(n)"
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PnDistributionChart;
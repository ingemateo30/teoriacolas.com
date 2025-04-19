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
    <div className="w-full">
      <div className="mb-4">
        <p className="font-medium text-gray-700 text-sm md:text-base">
          Probabilidad Pn: Probabilidad de tener exactamente n clientes en el sistema
        </p>
      </div>

      {/* En móviles, los gráficos se apilan verticalmente */}
      <div className="flex flex-col space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
        <div className="h-72 md:h-80">
          <h4 className="text-center font-medium mb-2 text-sm md:text-base">Gráfico de barras</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="n" 
                label={{ value: 'n', position: 'insideBottom', offset: -5, fontSize: 12 }} 
                tick={{ fontSize: 10 }}
              />
              <YAxis
                label={{ value: 'P(n)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                domain={[0, Math.max(...probabilities) * 1.1]}
                tick={{ fontSize: 10 }}
                width={30}
              />
              <Tooltip 
                formatter={(value: number) => value.toFixed(4)}
                labelFormatter={(label) => `n = ${label}`}
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="probability" name="P(n)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 md:h-80">
          <h4 className="text-center font-medium mb-2 text-sm md:text-base">Gráfico de línea</h4>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="n" 
                label={{ value: 'n', position: 'insideBottom', offset: -5, fontSize: 12 }} 
                tick={{ fontSize: 10 }}
              />
              <YAxis
                label={{ value: 'P(n)', angle: -90, position: 'insideLeft', fontSize: 12 }}
                domain={[0, Math.max(...probabilities) * 1.1]}
                tick={{ fontSize: 10 }}
                width={30}
              />
              <Tooltip 
                formatter={(value: number) => value.toFixed(4)}
                labelFormatter={(label) => `n = ${label}`}
              />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line 
                type="monotone" 
                dataKey="probability" 
                name="P(n)"
                stroke="#8884d8" 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PnDistributionChart;
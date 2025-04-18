'use client';

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Series {
  key: string;
  label: string;
  color: string;
}

interface LineChartProps {
  data: any[];
  xKey: string;
  series: Series[];
  xLabel?: string;
  yLabel?: string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  series,
  xLabel,
  yLabel,
  height = 300
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md">
        <p className="text-gray-500">No hay datos suficientes para mostrar</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey={xKey} 
          stroke="#6b7280"
          label={{ value: xLabel, position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis 
          stroke="#6b7280"
          label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            borderColor: '#e5e7eb',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        />
        <Legend verticalAlign="top" height={36} />
        
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            activeDot={{ r: 6 }}
            dot={false}
            strokeWidth={2}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
  
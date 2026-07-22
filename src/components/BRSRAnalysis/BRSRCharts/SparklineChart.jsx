import React from 'react';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const SparklineChart = ({ 
  data = [], 
  dataKey = 'value', 
  color = '#10B981', 
  height = 60,
  showArea = false,
  strokeWidth = 2 
}) => {
  if (!data || data.length === 0) return null;

  const Chart = showArea ? AreaChart : LineChart;
  const Series = showArea ? Area : Line;

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <Chart data={data}>
          {showArea ? (
            <Series
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={strokeWidth}
            />
          ) : (
            <Series
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={false}
            />
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export { SparklineChart };

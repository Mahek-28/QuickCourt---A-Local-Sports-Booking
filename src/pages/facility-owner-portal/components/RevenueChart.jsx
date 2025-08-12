import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const RevenueChart = ({ type = 'bar', data, title, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-athletic p-3 shadow-athletic">
          <p className="text-sm font-athletic-medium text-text-primary mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <span className="font-athletic-medium" style={{ color: entry?.color }}>
                {entry?.name}:
              </span>
              {` $${entry?.value?.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-athletic p-6 shadow-athletic">
      <h3 className="text-lg font-athletic-bold text-text-primary mb-6">{title}</h3>
      <div className="w-full" style={{ height }} aria-label={`${title} Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)" 
                fontSize={12}
                fontFamily="Inter"
              />
              <YAxis 
                stroke="var(--color-text-secondary)" 
                fontSize={12}
                fontFamily="Inter"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)" 
                fontSize={12}
                fontFamily="Inter"
              />
              <YAxis 
                stroke="var(--color-text-secondary)" 
                fontSize={12}
                fontFamily="Inter"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                name="Revenue"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { format, subMonths } from 'date-fns';

// Generate mock data for the last 12 months
const generateMockData = () => {
  const therapyTypes = ['Art', 'Music', 'Play', 'Movement', 'Group'];
  return Array.from({ length: 12 }, (_, index) => {
    const date = format(subMonths(new Date(), 11 - index), 'MMM yyyy');
    const data = { date };
    
    therapyTypes.forEach(type => {
      // Generate base value
      let baseValue = Math.floor(Math.random() * 30) + 20;
      
      // Add seasonal variation
      const monthIndex = new Date(date).getMonth();
      if (monthIndex >= 5 && monthIndex <= 7) { // Summer months
        baseValue *= 1.2; // 20% increase in summer
      } else if (monthIndex >= 11 || monthIndex <= 1) { // Winter months
        baseValue *= 0.8; // 20% decrease in winter
      }
      
      data[type] = Math.round(baseValue);
    });
    
    return data;
  });
};

const mockData = generateMockData();

const COLORS = {
  Art: '#8884d8',
  Music: '#82ca9d',
  Play: '#ffc658',
  Movement: '#ff7300',
  Group: '#00C49F',
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ color: entry.color }}
          >
            {entry.name}: {entry.value} sessions
            ({Math.round(entry.value / total * 100)}%)
          </Typography>
        ))}
        <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
          Total: {total} sessions
        </Typography>
      </Paper>
    );
  }
  return null;
}

function StreamGraph() {
  return (
    <Box sx={{ width: '100%', height: 500, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Therapy Trends Over Time
      </Typography>
      <ResponsiveContainer>
        <AreaChart
          data={mockData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          stackOffset="silhouette"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: '#666', fontSize: 10 }}
            label={{
              value: 'Session Distribution',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {Object.entries(COLORS).map(([key, color]) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={color}
              fill={color}
              fillOpacity={0.6}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
        Distribution of therapy types over the past 12 months
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
        * Showing relative proportions of different therapy types
      </Typography>
    </Box>
  );
}

export default StreamGraph;

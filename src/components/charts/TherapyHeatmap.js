import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
} from 'recharts';

// Mock data - will be replaced with real data
const mockData = Array.from({ length: 24 }, (_, hour) =>
  Array.from({ length: 7 }, (_, day) => ({
    hour,
    day,
    value: Math.floor(Math.random() * 10),
  }))
).flat();

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = Array.from({ length: 24 }, (_, i) => 
  i.toString().padStart(2, '0') + ':00'
);

function TherapyHeatmap() {
  const getColor = (value) => {
    const colors = [
      '#ebedf0', // 0
      '#9be9a8', // 1-2
      '#40c463', // 3-5
      '#30a14e', // 6-8
      '#216e39', // 9-10
    ];
    if (value === 0) return colors[0];
    if (value <= 2) return colors[1];
    if (value <= 5) return colors[2];
    if (value <= 8) return colors[3];
    return colors[4];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 1 }}>
          <Typography variant="body2">
            {days[data.day]} {hours[data.hour]}
          </Typography>
          <Typography variant="body2" color="primary">
            {data.value} sessions
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 400, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Session Distribution Heatmap
      </Typography>
      <ResponsiveContainer>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
        >
          <XAxis
            dataKey="day"
            type="number"
            domain={[0, 6]}
            tickFormatter={(value) => days[value]}
            interval={0}
          />
          <YAxis
            dataKey="hour"
            type="number"
            domain={[0, 23]}
            tickFormatter={(value) => hours[value]}
            interval={2}
          />
          <ZAxis dataKey="value" range={[0, 400]} />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={mockData}>
            {mockData.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.value)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default TherapyHeatmap;

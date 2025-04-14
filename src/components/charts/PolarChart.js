import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';

// Mock data - will be replaced with real data
const mockData = [
  {
    emotion: 'Joy',
    before: 45,
    after: 85,
    average: 65,
  },
  {
    emotion: 'Calm',
    before: 30,
    after: 75,
    average: 52,
  },
  {
    emotion: 'Energy',
    before: 55,
    after: 80,
    average: 68,
  },
  {
    emotion: 'Focus',
    before: 40,
    after: 70,
    average: 55,
  },
  {
    emotion: 'Confidence',
    before: 35,
    after: 82,
    average: 58,
  },
  {
    emotion: 'Creativity',
    before: 50,
    after: 88,
    average: 69,
  },
  {
    emotion: 'Social',
    before: 42,
    after: 78,
    average: 60,
  },
  {
    emotion: 'Expression',
    before: 38,
    after: 85,
    average: 61,
  },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {data.emotion}
        </Typography>
        <Typography variant="body2" color="primary">
          Before Session: {data.before}%
        </Typography>
        <Typography variant="body2" color="secondary">
          After Session: {data.after}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Average: {data.average}%
        </Typography>
        <Typography variant="body2" color="success.main">
          Improvement: {data.after - data.before}%
        </Typography>
      </Paper>
    );
  }
  return null;
}

function PolarChart() {
  return (
    <Box sx={{ width: '100%', height: 500, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Emotional States Distribution
      </Typography>
      <ResponsiveContainer>
        <RadarChart
          outerRadius={150}
          data={mockData}
        >
          <PolarGrid gridType="circle" />
          <PolarAngleAxis
            dataKey="emotion"
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#666', fontSize: 10 }}
          />
          <Radar
            name="Before Session"
            dataKey="before"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
          <Radar
            name="After Session"
            dataKey="after"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
          />
          <Radar
            name="Average"
            dataKey="average"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.3}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
        Comparison of emotional states before and after therapy sessions
      </Typography>
    </Box>
  );
}

export default PolarChart;

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Mock data - will be replaced with real data
const mockData = [
  {
    name: 'Drawing Therapy',
    engagementScore: 85,
    emotionalProgress: 78,
    sessions: 120,
    category: 'Art',
  },
  {
    name: 'Music Expression',
    engagementScore: 92,
    emotionalProgress: 85,
    sessions: 90,
    category: 'Music',
  },
  {
    name: 'Dance Movement',
    engagementScore: 88,
    emotionalProgress: 82,
    sessions: 75,
    category: 'Movement',
  },
  {
    name: 'Painting',
    engagementScore: 80,
    emotionalProgress: 75,
    sessions: 100,
    category: 'Art',
  },
  {
    name: 'Puppet Play',
    engagementScore: 95,
    emotionalProgress: 88,
    sessions: 60,
    category: 'Play',
  },
  {
    name: 'Group Singing',
    engagementScore: 90,
    emotionalProgress: 85,
    sessions: 80,
    category: 'Music',
  },
  {
    name: 'Clay Modeling',
    engagementScore: 82,
    emotionalProgress: 79,
    sessions: 70,
    category: 'Art',
  },
  {
    name: 'Role Playing',
    engagementScore: 87,
    emotionalProgress: 83,
    sessions: 85,
    category: 'Play',
  },
];

const categoryColors = {
  Art: '#8884d8',
  Music: '#82ca9d',
  Movement: '#ffc658',
  Play: '#ff7300',
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {data.name}
        </Typography>
        <Typography variant="body2" color="primary">
          Engagement Score: {data.engagementScore}%
        </Typography>
        <Typography variant="body2" color="secondary">
          Emotional Progress: {data.emotionalProgress}%
        </Typography>
        <Typography variant="body2">
          Total Sessions: {data.sessions}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Category: {data.category}
        </Typography>
      </Paper>
    );
  }
  return null;
}

function BubbleChart() {
  const domain = [60, 100];
  const range = [50, 400];

  return (
    <Box sx={{ width: '100%', height: 500, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Therapy Outcomes Analysis
      </Typography>
      <ResponsiveContainer>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="engagementScore"
            name="Engagement Score"
            domain={domain}
            label={{
              value: 'Engagement Score (%)',
              position: 'bottom',
            }}
          />
          <YAxis
            type="number"
            dataKey="emotionalProgress"
            name="Emotional Progress"
            domain={domain}
            label={{
              value: 'Emotional Progress (%)',
              angle: -90,
              position: 'left',
            }}
          />
          <ZAxis
            type="number"
            dataKey="sessions"
            range={range}
            name="Sessions"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {Object.entries(categoryColors).map(([category, color]) => (
            <Scatter
              key={category}
              name={category}
              data={mockData.filter(item => item.category === category)}
              fill={color}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
        Bubble size represents the number of sessions
      </Typography>
    </Box>
  );
}

export default BubbleChart;

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts';
import { format, subMonths } from 'date-fns';

// Generate mock data for the last 12 months
const mockData = Array.from({ length: 12 }, (_, index) => {
  const date = subMonths(new Date(), 11 - index);
  return {
    date: format(date, 'MMM yyyy'),
    sessionCount: Math.floor(Math.random() * 20) + 10,
    avgDuration: Math.floor(Math.random() * 30) + 30,
    moodImprovement: Math.floor(Math.random() * 40) + 30,
    milestones: Math.floor(Math.random() * 3),
    overallProgress: Math.floor(Math.random() * 20) + 60,
  };
});

function ProgressTimeline() {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
              {entry.name === 'Average Duration' ? ' min' : 
                entry.name.includes('Progress') || entry.name.includes('Improvement') ? '%' : ''}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 500, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Comprehensive Progress Timeline
      </Typography>
      <ResponsiveContainer>
        <ComposedChart
          data={mockData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#82ca9d"
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Session count bars */}
          <Bar
            yAxisId="left"
            dataKey="sessionCount"
            name="Sessions"
            fill="#8884d8"
            opacity={0.8}
          />
          
          {/* Average duration line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="avgDuration"
            name="Average Duration"
            stroke="#ff7300"
            strokeWidth={2}
          />
          
          {/* Mood improvement area */}
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="moodImprovement"
            name="Mood Improvement"
            fill="#82ca9d"
            stroke="#82ca9d"
            fillOpacity={0.3}
          />
          
          {/* Overall progress line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="overallProgress"
            name="Overall Progress"
            stroke="#413ea0"
            strokeWidth={2}
          />
          
          {/* Milestone markers */}
          <Scatter
            yAxisId="right"
            dataKey="milestones"
            name="Milestones"
            fill="#ff0000"
            shape="star"
            size={100}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ProgressTimeline;

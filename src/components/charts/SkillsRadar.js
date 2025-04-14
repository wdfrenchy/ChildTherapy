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
    skill: 'Emotional Expression',
    initial: 30,
    current: 75,
    target: 90,
  },
  {
    skill: 'Social Interaction',
    initial: 45,
    current: 80,
    target: 85,
  },
  {
    skill: 'Creative Confidence',
    initial: 20,
    current: 65,
    target: 80,
  },
  {
    skill: 'Communication',
    initial: 35,
    current: 70,
    target: 85,
  },
  {
    skill: 'Problem Solving',
    initial: 40,
    current: 60,
    target: 75,
  },
  {
    skill: 'Self Expression',
    initial: 25,
    current: 70,
    target: 80,
  },
];

function SkillsRadar() {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {payload[0].payload.skill}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {entry.name}: {entry.value}%
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 400, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Skills Assessment Radar
      </Typography>
      <ResponsiveContainer>
        <RadarChart data={mockData}>
          <PolarGrid gridType="circle" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: 'rgba(0, 0, 0, 0.87)', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Radar
            name="Initial Assessment"
            dataKey="initial"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.1}
          />
          <Radar
            name="Current Level"
            dataKey="current"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.3}
          />
          <Radar
            name="Target Level"
            dataKey="target"
            stroke="#ffc658"
            fill="#ffc658"
            fillOpacity={0.1}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default SkillsRadar;

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  ResponsiveContainer,
  Treemap,
  Tooltip,
} from 'recharts';

// Mock data - will be replaced with real data
const mockData = {
  name: 'Therapy Activities',
  children: [
    {
      name: 'Art Therapy',
      children: [
        { name: 'Drawing', size: 35, success: 85 },
        { name: 'Painting', size: 25, success: 78 },
        { name: 'Sculpting', size: 15, success: 82 },
        { name: 'Collage', size: 10, success: 75 },
      ],
    },
    {
      name: 'Music Therapy',
      children: [
        { name: 'Instrument Play', size: 20, success: 88 },
        { name: 'Singing', size: 15, success: 92 },
        { name: 'Rhythm Games', size: 10, success: 85 },
      ],
    },
    {
      name: 'Play Therapy',
      children: [
        { name: 'Role Play', size: 25, success: 80 },
        { name: 'Sand Play', size: 20, success: 85 },
        { name: 'Puppet Play', size: 15, success: 78 },
      ],
    },
    {
      name: 'Movement Therapy',
      children: [
        { name: 'Dance', size: 20, success: 90 },
        { name: 'Yoga', size: 15, success: 82 },
        { name: 'Movement Games', size: 10, success: 88 },
      ],
    },
  ],
};

const COLORS = [
  '#8889DD',
  '#9597E4',
  '#8DC77B',
  '#A5D6A7',
  '#E6EE9C',
  '#FFE082',
  '#FFAB91',
  '#BCAAA4',
  '#B39DDB',
  '#90CAF9',
  '#81D4FA',
  '#80DEEA',
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          {data.name}
        </Typography>
        <Typography variant="body2">
          Sessions: {data.size}
        </Typography>
        {data.success && (
          <Typography variant="body2" color="success.main">
            Success Rate: {data.success}%
          </Typography>
        )}
      </Paper>
    );
  }
  return null;
}

function TherapyTreemap() {
  const renderTreemapCell = (props) => {
    const { x, y, width, height, name, depth, index } = props;
    const fontSize = depth === 1 ? 14 : 12;
    const color = COLORS[index % COLORS.length];
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          stroke="#fff"
          strokeWidth={2}
        />
        {width > 50 && height > 25 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize}
            fontWeight={depth === 1 ? 'bold' : 'normal'}
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <Box sx={{ width: '100%', height: 500, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Therapy Activities Distribution
      </Typography>
      <ResponsiveContainer>
        <Treemap
          data={mockData.children}
          dataKey="size"
          ratio={4/3}
          stroke="#fff"
          content={renderTreemapCell}
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    </Box>
  );
}

export default TherapyTreemap;

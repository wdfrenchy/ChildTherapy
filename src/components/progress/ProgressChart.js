import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data - will be replaced with API calls
const mockProgressData = [
  {
    month: 'Jan',
    emotionalExpression: 45,
    socialInteraction: 30,
    creativeConfidence: 40,
    communication: 35,
  },
  {
    month: 'Feb',
    emotionalExpression: 52,
    socialInteraction: 38,
    creativeConfidence: 48,
    communication: 42,
  },
  {
    month: 'Mar',
    emotionalExpression: 68,
    socialInteraction: 52,
    creativeConfidence: 55,
    communication: 48,
  },
  {
    month: 'Apr',
    emotionalExpression: 80,
    socialInteraction: 65,
    creativeConfidence: 70,
    communication: 60,
  },
];

function ProgressChart() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Skills Development Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={mockProgressData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="emotionalExpression"
              name="Emotional Expression"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="socialInteraction"
              name="Social Interaction"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="creativeConfidence"
              name="Creative Confidence"
              stroke="#ffc658"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="communication"
              name="Communication"
              stroke="#ff7300"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ProgressChart;

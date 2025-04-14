import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data - will be replaced with API calls
const mockData = {
  sessionsByArtType: [
    { name: 'Drawing', sessions: 45 },
    { name: 'Painting', sessions: 30 },
    { name: 'Sculpture', sessions: 25 },
    { name: 'Collage', sessions: 20 },
  ],
  moodImprovement: [
    { name: 'Significant', value: 40 },
    { name: 'Moderate', value: 35 },
    { name: 'Slight', value: 15 },
    { name: 'No Change', value: 10 },
  ],
  therapistPerformance: [
    {
      name: 'Dr. Sarah Johnson',
      sessions: 28,
      avgMoodImprovement: 2.1,
      successRate: 85,
    },
    {
      name: 'Dr. Michael Chen',
      sessions: 24,
      avgMoodImprovement: 1.8,
      successRate: 82,
    },
    {
      name: 'Dr. Emily Brown',
      sessions: 22,
      avgMoodImprovement: 1.9,
      successRate: 80,
    },
  ],
  progressByAge: [
    { age: '6-8', emotional: 75, social: 65, creative: 80 },
    { age: '9-11', emotional: 70, social: 75, creative: 85 },
    { age: '12-14', emotional: 80, social: 70, creative: 75 },
  ],
  monthlyStats: {
    totalSessions: 124,
    averageDuration: 55,
    moodImprovement: '+1.9',
    completionRate: '92%',
  },
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">Last Week</MenuItem>
              <MenuItem value="month">Last Month</MenuItem>
              <MenuItem value="quarter">Last Quarter</MenuItem>
              <MenuItem value="year">Last Year</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Generate Report
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Monthly Statistics */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {Object.entries(mockData.monthlyStats).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {key.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                    </Typography>
                    <Typography variant="h4">
                      {value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Sessions by Art Type */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sessions by Art Type
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData.sessionsByArtType}
                    dataKey="sessions"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {mockData.sessionsByArtType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Mood Improvement Distribution */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mood Improvement Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData.moodImprovement}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {mockData.moodImprovement.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Progress by Age Group */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress by Age Group
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.progressByAge}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="emotional" name="Emotional Progress" fill="#8884d8" />
                  <Bar dataKey="social" name="Social Progress" fill="#82ca9d" />
                  <Bar dataKey="creative" name="Creative Progress" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Therapist Performance */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Therapist Performance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.therapistPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="sessions"
                    name="Sessions Conducted"
                    fill="#8884d8"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="successRate"
                    name="Success Rate (%)"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AnalyticsDashboard;

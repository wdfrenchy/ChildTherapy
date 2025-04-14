import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Info as InfoIcon,
  FileDownload as ExportIcon,
} from '@mui/icons-material';
import TherapyHeatmap from '../charts/TherapyHeatmap';
import SkillsRadar from '../charts/SkillsRadar';
import ProgressTimeline from '../charts/ProgressTimeline';
import ExportButton from '../export/ExportButton';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`insights-tabpanel-${index}`}
      aria-labelledby={`insights-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function TherapyInsights() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const stats = [
    {
      title: 'Average Sessions',
      value: '15.3',
      unit: 'per week',
      change: '+12%',
      info: 'Average number of therapy sessions conducted per week',
    },
    {
      title: 'Success Rate',
      value: '87',
      unit: '%',
      change: '+5%',
      info: 'Percentage of sessions achieving their intended goals',
    },
    {
      title: 'Avg. Mood Improvement',
      value: '2.8',
      unit: 'points',
      change: '+0.5',
      info: 'Average improvement in mood score during sessions',
    },
    {
      title: 'Active Children',
      value: '42',
      unit: 'total',
      change: '+3',
      info: 'Number of children currently receiving therapy',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Therapy Insights
        </Typography>
        <ExportButton defaultType="analytics" />
      </Box>

      {/* Key Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="textSecondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Tooltip title={stat.info}>
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="h4" component="div">
                  {stat.value}
                  <Typography
                    component="span"
                    variant="body2"
                    color="textSecondary"
                    sx={{ ml: 1 }}
                  >
                    {stat.unit}
                  </Typography>
                </Typography>
                <Typography
                  variant="body2"
                  color={stat.change.startsWith('+') ? 'success.main' : 'error.main'}
                >
                  {stat.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Progress Overview" />
          <Tab label="Session Distribution" />
          <Tab label="Skills Assessment" />
        </Tabs>
        <Divider />

        <TabPanel value={activeTab} index={0}>
          <ProgressTimeline />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <TherapyHeatmap />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <SkillsRadar />
        </TabPanel>
      </Paper>

      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        * Data is updated in real-time. Last update: {new Date().toLocaleString()}
      </Typography>
    </Box>
  );
}

export default TherapyInsights;

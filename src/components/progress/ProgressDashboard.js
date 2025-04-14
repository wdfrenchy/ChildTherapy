import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Button,
  Chip,
  LinearProgress,
  Rating,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  TrendingUp as ProgressIcon,
  Palette as ArtIcon,
  Psychology as MoodIcon,
  Assignment as GoalsIcon,
  Star as MilestoneIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockChildren = [
  {
    id: 1,
    name: 'Alex Thompson',
    age: 8,
    startDate: '2025-01-15',
    therapist: 'Dr. Sarah Johnson',
    totalSessions: 12,
    artPreference: 'Drawing',
    overallProgress: 75,
    currentGoals: [
      'Improve emotional expression',
      'Develop social skills',
      'Build self-confidence',
    ],
    recentMilestones: [
      'First time sharing artwork with group',
      'Completed a complex art project',
      'Expressed emotions through color effectively',
    ],
    moodTrend: [4, 3, 4, 5, 4, 5],
    skillProgress: {
      'Emotional Expression': 80,
      'Social Interaction': 65,
      'Creative Confidence': 70,
      'Communication': 60,
    },
    recentSessions: [
      {
        date: '2025-04-10',
        artType: 'Drawing Therapy',
        achievement: 'Created detailed family portrait',
        mood: 5,
      },
      {
        date: '2025-04-03',
        artType: 'Painting Therapy',
        achievement: 'Expressed complex emotions through colors',
        mood: 4,
      },
      {
        date: '2025-03-27',
        artType: 'Sculpture Therapy',
        achievement: 'Collaborated with peers on group project',
        mood: 4,
      },
    ],
  },
  // Add more children here
];

function ProgressDashboard() {
  const [selectedChild, setSelectedChild] = useState(null);
  const [timeRange, setTimeRange] = useState('3months');

  const handleChildChange = (event, newValue) => {
    setSelectedChild(newValue);
  };

  const calculateAverageMood = (moods) => {
    return moods.reduce((acc, curr) => acc + curr, 0) / moods.length;
  };

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Progress Dashboard
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={mockChildren}
              getOptionLabel={(option) => `${option.name} (Age: ${option.age})`}
              value={selectedChild}
              onChange={handleChildChange}
              renderInput={(params) => (
                <TextField {...params} label="Select Child" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['1month', '3months', '6months', '1year'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'contained' : 'outlined'}
                  onClick={() => setTimeRange(range)}
                  size="small"
                >
                  {range.replace(/(\d+)/, '$1 ')}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {selectedChild && (
        <Grid container spacing={3}>
          {/* Overview Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Overview
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Start Date
                    </Typography>
                    <Typography>
                      {new Date(selectedChild.startDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Total Sessions
                    </Typography>
                    <Typography>{selectedChild.totalSessions}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Therapist
                    </Typography>
                    <Typography>{selectedChild.therapist}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Preferred Art
                    </Typography>
                    <Typography>{selectedChild.artPreference}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Overall Progress
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={selectedChild.overallProgress}
                        sx={{ flexGrow: 1 }}
                      />
                      <Typography variant="body2">
                        {selectedChild.overallProgress}%
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Goals Card */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GoalsIcon /> Current Goals
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedChild.currentGoals.map((goal, index) => (
                    <Chip
                      key={index}
                      label={goal}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MilestoneIcon /> Recent Milestones
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedChild.recentMilestones.map((milestone, index) => (
                    <Chip
                      key={index}
                      label={milestone}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Skills Progress */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ProgressIcon /> Skills Progress
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(selectedChild.skillProgress).map(([skill, progress]) => (
                    <Grid item xs={12} sm={6} key={skill}>
                      <Typography variant="subtitle2" gutterBottom>
                        {skill}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{ flexGrow: 1 }}
                        />
                        <Typography variant="body2">
                          {progress}%
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Sessions Timeline */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Sessions
                </Typography>
                <Timeline>
                  {selectedChild.recentSessions.map((session, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="primary">
                          <ArtIcon />
                        </TimelineDot>
                        {index < selectedChild.recentSessions.length - 1 && (
                          <TimelineConnector />
                        )}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2">
                            {new Date(session.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {session.artType}
                          </Typography>
                          <Typography variant="body1">
                            {session.achievement}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <MoodIcon fontSize="small" color="action" />
                            <Rating value={session.mood} readOnly size="small" />
                          </Box>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {!selectedChild && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography variant="h6" color="textSecondary">
            Select a child to view their progress
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default ProgressDashboard;

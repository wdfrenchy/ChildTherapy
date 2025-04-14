import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const notificationTypes = [
  {
    id: 'sessions',
    title: 'Session Notifications',
    description: 'Updates about upcoming and completed sessions',
    options: [
      { id: 'upcoming', label: 'Upcoming Sessions' },
      { id: 'reminders', label: 'Session Reminders' },
      { id: 'changes', label: 'Schedule Changes' },
      { id: 'completion', label: 'Session Completion' },
    ],
  },
  {
    id: 'progress',
    title: 'Progress Updates',
    description: 'Notifications about therapy progress and milestones',
    options: [
      { id: 'milestones', label: 'Achievement Milestones' },
      { id: 'goals', label: 'Goal Completion' },
      { id: 'assessments', label: 'Progress Assessments' },
      { id: 'reports', label: 'Progress Reports' },
    ],
  },
  {
    id: 'system',
    title: 'System Notifications',
    description: 'Important system updates and announcements',
    options: [
      { id: 'maintenance', label: 'System Maintenance' },
      { id: 'updates', label: 'Feature Updates' },
      { id: 'security', label: 'Security Alerts' },
      { id: 'announcements', label: 'General Announcements' },
    ],
  },
];

function NotificationPreferences({ open, onClose }) {
  const [preferences, setPreferences] = useState({
    sessions: {
      enabled: true,
      method: 'all',
      options: {
        upcoming: true,
        reminders: true,
        changes: true,
        completion: true,
      },
    },
    progress: {
      enabled: true,
      method: 'email',
      options: {
        milestones: true,
        goals: true,
        assessments: true,
        reports: true,
      },
    },
    system: {
      enabled: true,
      method: 'app',
      options: {
        maintenance: true,
        updates: true,
        security: true,
        announcements: false,
      },
    },
  });

  const handleToggleCategory = (categoryId) => {
    setPreferences((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        enabled: !prev[categoryId].enabled,
      },
    }));
  };

  const handleToggleOption = (categoryId, optionId) => {
    setPreferences((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        options: {
          ...prev[categoryId].options,
          [optionId]: !prev[categoryId].options[optionId],
        },
      },
    }));
  };

  const handleMethodChange = (categoryId, method) => {
    setPreferences((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        method,
      },
    }));
  };

  const handleSave = () => {
    // Will implement preferences saving
    console.log('Saving preferences:', preferences);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Notification Preferences</DialogTitle>
      <DialogContent>
        <List>
          {notificationTypes.map((category) => (
            <React.Fragment key={category.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1">{category.title}</Typography>
                      <Switch
                        checked={preferences[category.id].enabled}
                        onChange={() => handleToggleCategory(category.id)}
                      />
                    </Box>
                  }
                  secondary={category.description}
                />
              </ListItem>

              {preferences[category.id].enabled && (
                <Box sx={{ pl: 3, pr: 2, pb: 2 }}>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Notification Method</InputLabel>
                    <Select
                      value={preferences[category.id].method}
                      onChange={(e) => handleMethodChange(category.id, e.target.value)}
                      label="Notification Method"
                    >
                      <MenuItem value="all">All Methods</MenuItem>
                      <MenuItem value="email">Email Only</MenuItem>
                      <MenuItem value="app">In-App Only</MenuItem>
                      <MenuItem value="sms">SMS Only</MenuItem>
                    </Select>
                  </FormControl>

                  <List dense>
                    {category.options.map((option) => (
                      <ListItem key={option.id} sx={{ py: 0 }}>
                        <ListItemText primary={option.label} />
                        <Switch
                          size="small"
                          checked={preferences[category.id].options[option.id]}
                          onChange={() => handleToggleOption(category.id, option.id)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotificationPreferences;

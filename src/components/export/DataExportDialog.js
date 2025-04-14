import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const exportTypes = [
  {
    id: 'sessions',
    name: 'Therapy Sessions',
    formats: ['csv', 'excel', 'pdf'],
    fields: [
      { id: 'date', label: 'Session Date', required: true },
      { id: 'child', label: 'Child Information', required: true },
      { id: 'therapist', label: 'Therapist Information', required: true },
      { id: 'artType', label: 'Art Type', required: true },
      { id: 'duration', label: 'Duration', required: true },
      { id: 'mood', label: 'Mood Ratings', optional: true },
      { id: 'notes', label: 'Session Notes', optional: true },
      { id: 'progress', label: 'Progress Notes', optional: true },
    ],
  },
  {
    id: 'progress',
    name: 'Progress Reports',
    formats: ['pdf', 'word'],
    fields: [
      { id: 'childInfo', label: 'Child Information', required: true },
      { id: 'timeframe', label: 'Report Timeframe', required: true },
      { id: 'goals', label: 'Therapy Goals', required: true },
      { id: 'achievements', label: 'Achievements', required: true },
      { id: 'artworks', label: 'Artwork Details', optional: true },
      { id: 'recommendations', label: 'Recommendations', optional: true },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics Data',
    formats: ['csv', 'excel', 'json'],
    fields: [
      { id: 'sessionStats', label: 'Session Statistics', required: true },
      { id: 'progressMetrics', label: 'Progress Metrics', required: true },
      { id: 'moodData', label: 'Mood Analysis', optional: true },
      { id: 'therapistMetrics', label: 'Therapist Performance', optional: true },
    ],
  },
];

function DataExportDialog({ open, onClose }) {
  const [exportConfig, setExportConfig] = useState({
    type: '',
    format: '',
    dateRange: {
      start: null,
      end: null,
    },
    selectedFields: [],
    includeMetadata: true,
    password: '',
    recipients: '',
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleChange = (field) => (event) => {
    setExportConfig((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleDateChange = (field) => (date) => {
    setExportConfig((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: date,
      },
    }));
  };

  const handleFieldToggle = (field) => {
    setExportConfig((prev) => {
      const fields = [...prev.selectedFields];
      const index = fields.indexOf(field);
      if (index === -1) {
        fields.push(field);
      } else {
        fields.splice(index, 1);
      }
      return {
        ...prev,
        selectedFields: fields,
      };
    });
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setExportConfig((prev) => ({
      ...prev,
      type,
      format: '',
      selectedFields: [],
    }));
  };

  const selectedType = exportTypes.find((type) => type.id === exportConfig.type);

  const validateConfig = () => {
    if (!exportConfig.type || !exportConfig.format) {
      setError('Please select an export type and format');
      return false;
    }
    if (!exportConfig.dateRange.start || !exportConfig.dateRange.end) {
      setError('Please select a date range');
      return false;
    }
    const requiredFields = selectedType.fields
      .filter((field) => field.required)
      .map((field) => field.id);
    const missingRequired = requiredFields.some(
      (field) => !exportConfig.selectedFields.includes(field)
    );
    if (missingRequired) {
      setError('Please select all required fields');
      return false;
    }
    return true;
  };

  const handleExport = async () => {
    if (!validateConfig()) return;

    setIsExporting(true);
    setError(null);

    try {
      // Simulate export process
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setExportProgress(i);
      }

      // Will implement actual export functionality
      console.log('Exporting with config:', exportConfig);
      onClose();
    } catch (err) {
      setError('Export failed: ' + err.message);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Export Data</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Export Type</InputLabel>
              <Select
                value={exportConfig.type}
                onChange={handleTypeChange}
                label="Export Type"
              >
                {exportTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {selectedType && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Format</InputLabel>
                <Select
                  value={exportConfig.format}
                  onChange={handleChange('format')}
                  label="Format"
                >
                  {selectedType.formats.map((format) => (
                    <MenuItem key={format} value={format}>
                      {format.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={exportConfig.dateRange.start}
                onChange={handleDateChange('start')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={exportConfig.dateRange.end}
                onChange={handleDateChange('end')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          {selectedType && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select Fields to Export
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  {selectedType.fields.map((field) => (
                    <Grid item xs={12} sm={6} key={field.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={exportConfig.selectedFields.includes(field.id)}
                            onChange={() => handleFieldToggle(field.id)}
                          />
                        }
                        label={
                          <Box>
                            {field.label}
                            {field.required && (
                              <Typography
                                component="span"
                                color="error"
                                sx={{ ml: 1 }}
                              >
                                *
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Grid>
          )}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={exportConfig.includeMetadata}
                  onChange={(e) =>
                    setExportConfig((prev) => ({
                      ...prev,
                      includeMetadata: e.target.checked,
                    }))
                  }
                />
              }
              label="Include metadata (creation date, last modified, etc.)"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Security & Distribution
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Export Password (Optional)"
                  value={exportConfig.password}
                  onChange={handleChange('password')}
                  helperText="Password protect the exported file"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Recipients (Optional)"
                  value={exportConfig.recipients}
                  onChange={handleChange('recipients')}
                  helperText="Email addresses separated by commas"
                />
              </Grid>
            </Grid>
          </Grid>

          {isExporting && (
            <Grid item xs={12}>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={exportProgress} />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  Exporting... {exportProgress}%
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleExport}
          variant="contained"
          color="primary"
          disabled={isExporting}
        >
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DataExportDialog;

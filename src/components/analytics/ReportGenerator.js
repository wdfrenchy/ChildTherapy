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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const reportTypes = [
  {
    id: 'progress',
    name: 'Progress Report',
    sections: [
      'Overall Progress',
      'Emotional Development',
      'Social Skills',
      'Creative Expression',
      'Session Attendance',
    ],
  },
  {
    id: 'therapy',
    name: 'Therapy Analysis',
    sections: [
      'Art Type Effectiveness',
      'Mood Improvements',
      'Behavioral Changes',
      'Therapeutic Goals',
      'Recommendations',
    ],
  },
  {
    id: 'performance',
    name: 'Performance Metrics',
    sections: [
      'Therapist Performance',
      'Session Success Rate',
      'Child Engagement',
      'Parent Feedback',
      'Resource Utilization',
    ],
  },
];

function ReportGenerator({ open, onClose }) {
  const [reportConfig, setReportConfig] = useState({
    type: '',
    startDate: null,
    endDate: null,
    format: 'pdf',
    includedSections: [],
    recipients: '',
    comments: '',
  });

  const handleChange = (field) => (event) => {
    setReportConfig((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleDateChange = (field) => (date) => {
    setReportConfig((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSectionToggle = (section) => {
    setReportConfig((prev) => {
      const sections = [...prev.includedSections];
      const index = sections.indexOf(section);
      if (index === -1) {
        sections.push(section);
      } else {
        sections.splice(index, 1);
      }
      return {
        ...prev,
        includedSections: sections,
      };
    });
  };

  const handleSelectAll = (sections) => {
    setReportConfig((prev) => ({
      ...prev,
      includedSections: sections,
    }));
  };

  const handleGenerate = () => {
    // Will implement report generation
    console.log('Generating report with config:', reportConfig);
    onClose();
  };

  const selectedReportType = reportTypes.find((type) => type.id === reportConfig.type);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Generate Analytics Report</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportConfig.type}
                onChange={handleChange('type')}
                label="Report Type"
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={reportConfig.startDate}
                onChange={handleDateChange('startDate')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={reportConfig.endDate}
                onChange={handleDateChange('endDate')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Export Format</InputLabel>
              <Select
                value={reportConfig.format}
                onChange={handleChange('format')}
                label="Export Format"
              >
                <MenuItem value="pdf">PDF Document</MenuItem>
                <MenuItem value="excel">Excel Spreadsheet</MenuItem>
                <MenuItem value="word">Word Document</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {selectedReportType && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Include Sections
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Button
                  size="small"
                  onClick={() => handleSelectAll(selectedReportType.sections)}
                >
                  Select All
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSelectAll([])}
                  sx={{ ml: 1 }}
                >
                  Clear All
                </Button>
              </Box>
              <FormGroup>
                <Grid container spacing={2}>
                  {selectedReportType.sections.map((section) => (
                    <Grid item xs={12} sm={6} key={section}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={reportConfig.includedSections.includes(section)}
                            onChange={() => handleSectionToggle(section)}
                          />
                        }
                        label={section}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Grid>
          )}

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Distribution Options
            </Typography>
            <TextField
              fullWidth
              label="Recipients (Email addresses)"
              value={reportConfig.recipients}
              onChange={handleChange('recipients')}
              placeholder="Enter email addresses separated by commas"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Additional Comments"
              value={reportConfig.comments}
              onChange={handleChange('comments')}
              multiline
              rows={3}
              placeholder="Add any comments or notes to include with the report"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleGenerate}
          variant="contained"
          color="primary"
          disabled={!reportConfig.type || !reportConfig.startDate || !reportConfig.endDate}
        >
          Generate Report
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReportGenerator;

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Autocomplete,
  Rating,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

// Mock data - will be replaced with API calls
const mockChildren = [
  { id: 1, name: 'Alex Thompson', age: 8 },
  { id: 2, name: 'Emma Davis', age: 10 },
];

const mockTherapists = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Art Therapy' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Child Psychology' },
];

const mockArtTypes = [
  'Drawing Therapy',
  'Painting Therapy',
  'Sculpture Therapy',
  'Collage Making',
  'Digital Art Therapy',
];

const initialFormData = {
  date: new Date(),
  time: new Date(),
  childId: null,
  therapistId: null,
  artType: '',
  duration: 60,
  moodBefore: 3,
  moodAfter: 3,
  artworkCreated: '',
  notes: '',
  progress: [],
};

function SessionForm({ open, onClose, session = null }) {
  const [formData, setFormData] = useState(session || initialFormData);
  const [newProgress, setNewProgress] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleTimeChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      time,
    }));
  };

  const handleChildChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      childId: newValue?.id || null,
    }));
  };

  const handleTherapistChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      therapistId: newValue?.id || null,
    }));
  };

  const handleAddProgress = (e) => {
    e.preventDefault();
    if (newProgress.trim()) {
      setFormData((prev) => ({
        ...prev,
        progress: [...prev.progress, newProgress.trim()],
      }));
      setNewProgress('');
    }
  };

  const handleDeleteProgress = (progressToDelete) => {
    setFormData((prev) => ({
      ...prev,
      progress: prev.progress.filter((item) => item !== progressToDelete),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will implement form submission
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {session ? 'Edit Session' : 'New Therapy Session'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Session Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Session Time"
                  value={formData.time}
                  onChange={handleTimeChange}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="duration"
                label="Duration (minutes)"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={mockArtTypes}
                value={formData.artType}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({ ...prev, artType: newValue }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Art Type" required />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={mockChildren}
                getOptionLabel={(option) => `${option.name} (Age: ${option.age})`}
                value={mockChildren.find((child) => child.id === formData.childId) || null}
                onChange={handleChildChange}
                renderInput={(params) => (
                  <TextField {...params} label="Child" required />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={mockTherapists}
                getOptionLabel={(option) => `${option.name} (${option.specialization})`}
                value={mockTherapists.find((therapist) => therapist.id === formData.therapistId) || null}
                onChange={handleTherapistChange}
                renderInput={(params) => (
                  <TextField {...params} label="Therapist" required />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography component="legend">Mood Before Session</Typography>
                <Rating
                  name="moodBefore"
                  value={formData.moodBefore}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({ ...prev, moodBefore: newValue }));
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <Typography component="legend">Mood After Session</Typography>
                <Rating
                  name="moodAfter"
                  value={formData.moodAfter}
                  onChange={(event, newValue) => {
                    setFormData((prev) => ({ ...prev, moodAfter: newValue }));
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="artworkCreated"
                label="Artwork Created"
                value={formData.artworkCreated}
                onChange={handleChange}
                fullWidth
                required
                placeholder="Describe the artwork created during the session"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Progress Notes
              </Typography>
              <Box sx={{ mb: 2 }}>
                {formData.progress.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => handleDeleteProgress(item)}
                    color="secondary"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
              <Box component="form" onSubmit={handleAddProgress} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={newProgress}
                  onChange={(e) => setNewProgress(e.target.value)}
                  placeholder="Add progress note"
                  size="small"
                  fullWidth
                />
                <Button type="submit" variant="outlined">
                  Add
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="notes"
                label="Session Notes"
                value={formData.notes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                placeholder="Enter detailed notes about the session"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {session ? 'Update' : 'Create'} Session
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SessionForm;

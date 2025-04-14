import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Autocomplete,
  Chip,
} from '@mui/material';

const artForms = [
  'Drawing',
  'Painting',
  'Sculpture',
  'Digital Art',
  'Coloring',
  'Mixed Media',
  'Other',
];

const personalityTraits = [
  'Creative',
  'Energetic',
  'Quiet',
  'Sensitive',
  'Curious',
  'Artistic',
  'Social',
  'Independent',
  'Anxious',
  'Confident',
];

const initialFormData = {
  name: '',
  age: '',
  gender: '',
  preferredArt: '',
  chronicCondition: '',
  personalityTraits: [],
  contextAwareReplies: '',
};

function ChildForm({ open, onClose, child = null }) {
  const [formData, setFormData] = useState(child || initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePersonalityTraitsChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      personalityTraits: newValue,
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
        {child ? 'Edit Child Profile' : 'Add New Child'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0, max: 18 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gender"
                label="Gender"
                select
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="preferredArt"
                label="Preferred Art Form"
                select
                value={formData.preferredArt}
                onChange={handleChange}
                fullWidth
                required
              >
                {artForms.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="chronicCondition"
                label="Chronic Condition"
                value={formData.chronicCondition}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={personalityTraits}
                value={formData.personalityTraits}
                onChange={handlePersonalityTraitsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Personality Traits"
                    placeholder="Select traits"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contextAwareReplies"
                label="Context-Aware Notes"
                value={formData.contextAwareReplies}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                placeholder="Add any specific context or notes about the child's communication preferences"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {child ? 'Update' : 'Add'} Child Profile
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ChildForm;

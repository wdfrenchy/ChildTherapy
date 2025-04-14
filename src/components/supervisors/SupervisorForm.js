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
  Chip,
} from '@mui/material';
import { Person as TherapistIcon } from '@mui/icons-material';

// Mock therapists data - will be replaced with API call
const availableTherapists = [
  { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Art Therapy' },
  { id: 2, name: 'Dr. Michael Chen', specialization: 'Child Psychology' },
  { id: 3, name: 'Dr. Emily Brown', specialization: 'Art Therapy' },
  { id: 4, name: 'Dr. David Wilson', specialization: 'Child Psychology' },
];

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  personalInfo: '',
  assignedTherapists: [],
};

function SupervisorForm({ open, onClose, supervisor = null }) {
  const [formData, setFormData] = useState(supervisor || initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTherapistsChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      assignedTherapists: newValue,
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
        {supervisor ? 'Edit Supervisor' : 'Add New Supervisor'}
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
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="personalInfo"
                label="Additional Information"
                value={formData.personalInfo}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                placeholder="Add any relevant information about the supervisor"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableTherapists}
                getOptionLabel={(option) => `${option.name} (${option.specialization})`}
                value={formData.assignedTherapists}
                onChange={handleTherapistsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assigned Therapists"
                    placeholder="Select therapists to supervise"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      icon={<TherapistIcon />}
                      label={`${option.name} (${option.specialization})`}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {supervisor ? 'Update' : 'Add'} Supervisor
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SupervisorForm;

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
import { Person as PersonIcon } from '@mui/icons-material';

const relationships = [
  'Mother',
  'Father',
  'Grandmother',
  'Grandfather',
  'Aunt',
  'Uncle',
  'Legal Guardian',
  'Foster Parent',
  'Other',
];

// Mock children data - will be replaced with API call
const availableChildren = [
  { id: 1, name: 'Alex Thompson' },
  { id: 2, name: 'Emily Chen' },
  { id: 3, name: 'Michael Chen' },
  { id: 4, name: 'Sarah Williams' },
];

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  relationship: '',
  personalInfo: '',
  associatedChildren: [],
};

function GuardianForm({ open, onClose, guardian = null }) {
  const [formData, setFormData] = useState(guardian || initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChildrenChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      associatedChildren: newValue,
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
        {guardian ? 'Edit Guardian' : 'Add New Guardian'}
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
            <Grid item xs={12} sm={6}>
              <TextField
                name="relationship"
                label="Relationship"
                select
                value={formData.relationship}
                onChange={handleChange}
                fullWidth
                required
              >
                {relationships.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
                placeholder="Add any relevant information about the guardian"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableChildren}
                getOptionLabel={(option) => option.name}
                value={formData.associatedChildren}
                onChange={handleChildrenChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Associated Children"
                    placeholder="Select children"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      icon={<PersonIcon />}
                      label={option.name}
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
            {guardian ? 'Update' : 'Add'} Guardian
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default GuardianForm;

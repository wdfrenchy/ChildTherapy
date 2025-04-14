import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Chip,
  Box,
  Typography,
} from '@mui/material';

const initialFormData = {
  artType: '',
  medium: '',
  benefits: [],
  resources: [],
  prompt: '',
};

function ArtTherapyForm({ open, onClose, artTherapy = null }) {
  const [formData, setFormData] = useState(artTherapy || initialFormData);
  const [newBenefit, setNewBenefit] = useState('');
  const [newResource, setNewResource] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBenefit = (e) => {
    e.preventDefault();
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit('');
    }
  };

  const handleDeleteBenefit = (benefitToDelete) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit !== benefitToDelete),
    }));
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (newResource.trim()) {
      setFormData((prev) => ({
        ...prev,
        resources: [...prev.resources, newResource.trim()],
      }));
      setNewResource('');
    }
  };

  const handleDeleteResource = (resourceToDelete) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.filter((resource) => resource !== resourceToDelete),
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
        {artTherapy ? 'Edit Art Therapy' : 'Add New Art Therapy'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="artType"
                label="Art Therapy Type"
                value={formData.artType}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="medium"
                label="Medium"
                value={formData.medium}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g., Colored Pencils, Watercolors, Clay"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Benefits
              </Typography>
              <Box sx={{ mb: 2 }}>
                {formData.benefits.map((benefit, index) => (
                  <Chip
                    key={index}
                    label={benefit}
                    onDelete={() => handleDeleteBenefit(benefit)}
                    color="primary"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
              <Box component="form" onSubmit={handleAddBenefit} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add a benefit"
                  size="small"
                  fullWidth
                />
                <Button type="submit" variant="outlined">
                  Add
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Resources
              </Typography>
              <Box sx={{ mb: 2 }}>
                {formData.resources.map((resource, index) => (
                  <Chip
                    key={index}
                    label={resource}
                    onDelete={() => handleDeleteResource(resource)}
                    color="secondary"
                    variant="outlined"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
              <Box component="form" onSubmit={handleAddResource} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={newResource}
                  onChange={(e) => setNewResource(e.target.value)}
                  placeholder="Add a resource"
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
                name="prompt"
                label="Sample Prompt"
                value={formData.prompt}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
                placeholder="Enter a sample therapy prompt"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {artTherapy ? 'Update' : 'Add'} Art Therapy
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ArtTherapyForm;

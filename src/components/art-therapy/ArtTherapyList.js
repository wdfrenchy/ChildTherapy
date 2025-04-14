import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Chip,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Palette as PaletteIcon,
  Psychology as BenefitsIcon,
  Extension as ResourcesIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockArtTherapies = [
  {
    id: 1,
    artType: 'Drawing Therapy',
    medium: 'Colored Pencils, Markers',
    benefits: [
      'Improves fine motor skills',
      'Enhances self-expression',
      'Reduces anxiety',
    ],
    resources: [
      'Professional art supplies',
      'Drawing templates',
      'Instructional guides',
    ],
    prompt: 'Draw your favorite place where you feel safe and happy',
  },
  {
    id: 2,
    artType: 'Painting Therapy',
    medium: 'Watercolors, Acrylics',
    benefits: [
      'Promotes emotional release',
      'Develops creativity',
      'Builds confidence',
    ],
    resources: [
      'Paint sets',
      'Canvas boards',
      'Brushes of various sizes',
    ],
    prompt: 'Paint your emotions using different colors',
  },
  {
    id: 3,
    artType: 'Sculpture Therapy',
    medium: 'Clay, Play-Doh',
    benefits: [
      'Enhances tactile awareness',
      'Improves concentration',
      'Develops problem-solving skills',
    ],
    resources: [
      'Modeling clay',
      'Sculpting tools',
      'Work surfaces',
    ],
    prompt: 'Create a figure that represents how you are feeling today',
  },
];

function ArtTherapyList() {
  const [artTherapies] = useState(mockArtTherapies);

  const handleEdit = (id) => {
    // Will implement edit functionality
    console.log('Edit art therapy:', id);
  };

  const handleDelete = (id) => {
    // Will implement delete functionality
    console.log('Delete art therapy:', id);
  };

  const handleAdd = () => {
    // Will implement add functionality
    console.log('Add new art therapy');
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Art Therapy Types</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Art Therapy
        </Button>
      </Box>

      <Grid container spacing={3}>
        {artTherapies.map((therapy) => (
          <Grid item xs={12} md={6} lg={4} key={therapy.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {therapy.artType}
                  </Typography>
                  <Box>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(therapy.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(therapy.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    <PaletteIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Medium
                  </Typography>
                  <Typography variant="body2">{therapy.medium}</Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    <BenefitsIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Benefits
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {therapy.benefits.map((benefit, index) => (
                      <Chip
                        key={index}
                        label={benefit}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    <ResourcesIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Resources
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {therapy.resources.map((resource, index) => (
                      <Chip
                        key={index}
                        label={resource}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Sample Prompt
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    "{therapy.prompt}"
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ArtTherapyList;

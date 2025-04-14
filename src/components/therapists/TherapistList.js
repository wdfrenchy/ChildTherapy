import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockTherapists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Art Therapy',
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    preferredArtForm: 'Painting',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Child Psychology',
    email: 'michael.c@example.com',
    phone: '(555) 234-5678',
    preferredArtForm: 'Sculpture',
  },
];

function TherapistList() {
  const [therapists] = useState(mockTherapists);

  const handleEdit = (id) => {
    // Will implement edit functionality
    console.log('Edit therapist:', id);
  };

  const handleDelete = (id) => {
    // Will implement delete functionality
    console.log('Delete therapist:', id);
  };

  const handleAdd = () => {
    // Will implement add functionality
    console.log('Add new therapist');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">Therapists</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Therapist
        </Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Preferred Art Form</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {therapists.map((therapist) => (
              <TableRow key={therapist.id}>
                <TableCell>{therapist.name}</TableCell>
                <TableCell>{therapist.specialization}</TableCell>
                <TableCell>{therapist.email}</TableCell>
                <TableCell>{therapist.phone}</TableCell>
                <TableCell>{therapist.preferredArtForm}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(therapist.id)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(therapist.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TherapistList;

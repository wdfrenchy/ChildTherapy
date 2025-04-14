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
  Chip,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  RateReview as FeedbackIcon,
  Person as TherapistIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockSupervisors = [
  {
    id: 1,
    name: 'Dr. Maria Rodriguez',
    email: 'maria.r@example.com',
    phone: '(555) 111-2233',
    assignedTherapists: [
      { id: 1, name: 'Dr. Sarah Johnson', feedback: 'Excellent progress in art therapy techniques' },
      { id: 2, name: 'Dr. Michael Chen', feedback: 'Good communication with children' },
    ],
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    email: 'james.w@example.com',
    phone: '(555) 444-5566',
    assignedTherapists: [
      { id: 3, name: 'Dr. Emily Brown', feedback: 'Needs more focus on documentation' },
    ],
  },
];

function SupervisorList() {
  const [supervisors] = useState(mockSupervisors);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const handleEdit = (id) => {
    // Will implement edit functionality
    console.log('Edit supervisor:', id);
  };

  const handleDelete = (id) => {
    // Will implement delete functionality
    console.log('Delete supervisor:', id);
  };

  const handleAdd = () => {
    // Will implement add functionality
    console.log('Add new supervisor');
  };

  const handleFeedback = (supervisorId, therapistId) => {
    // Will implement feedback functionality
    console.log('Add/Edit feedback for therapist:', therapistId, 'by supervisor:', supervisorId);
  };

  const handleViewTherapist = (therapistId) => {
    // Will implement view therapist functionality
    console.log('View therapist:', therapistId);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">Training Supervisors</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Supervisor
        </Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Supervised Therapists</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supervisors.map((supervisor) => (
              <TableRow key={supervisor.id}>
                <TableCell>{supervisor.name}</TableCell>
                <TableCell>{supervisor.email}</TableCell>
                <TableCell>{supervisor.phone}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {supervisor.assignedTherapists.map((therapist) => (
                      <Tooltip key={therapist.id} title={`Feedback: ${therapist.feedback}`}>
                        <Chip
                          icon={<TherapistIcon />}
                          label={therapist.name}
                          color="primary"
                          variant="outlined"
                          onClick={() => handleViewTherapist(therapist.id)}
                          onDelete={() => handleFeedback(supervisor.id, therapist.id)}
                          deleteIcon={<FeedbackIcon />}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(supervisor.id)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(supervisor.id)} color="error" size="small">
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

export default SupervisorList;

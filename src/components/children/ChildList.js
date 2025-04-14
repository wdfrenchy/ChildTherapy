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
  Assignment as AssignIcon,
  Psychology as TherapyIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockChildren = [
  {
    id: 1,
    name: 'Alex Thompson',
    age: 8,
    gender: 'Male',
    preferredArt: 'Drawing',
    chronicCondition: 'ADHD',
    personalityTraits: ['Creative', 'Energetic', 'Curious'],
    assignedTherapist: 'Dr. Sarah Johnson',
  },
  {
    id: 2,
    name: 'Emily Chen',
    age: 10,
    gender: 'Female',
    preferredArt: 'Painting',
    chronicCondition: 'Anxiety',
    personalityTraits: ['Quiet', 'Artistic', 'Sensitive'],
    assignedTherapist: 'Dr. Michael Chen',
  },
];

function ChildList() {
  const [children] = useState(mockChildren);

  const handleEdit = (id) => {
    // Will implement edit functionality
    console.log('Edit child:', id);
  };

  const handleDelete = (id) => {
    // Will implement delete functionality
    console.log('Delete child:', id);
  };

  const handleAdd = () => {
    // Will implement add functionality
    console.log('Add new child');
  };

  const handleAssignTherapist = (id) => {
    // Will implement therapist assignment
    console.log('Assign therapist to child:', id);
  };

  const handleViewSessions = (id) => {
    // Will implement therapy sessions view
    console.log('View therapy sessions for child:', id);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">Children</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Child
        </Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Preferred Art</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Personality Traits</TableCell>
              <TableCell>Assigned Therapist</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {children.map((child) => (
              <TableRow key={child.id}>
                <TableCell>{child.name}</TableCell>
                <TableCell>{child.age}</TableCell>
                <TableCell>{child.gender}</TableCell>
                <TableCell>{child.preferredArt}</TableCell>
                <TableCell>{child.chronicCondition}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {child.personalityTraits.map((trait) => (
                      <Chip
                        key={trait}
                        label={trait}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{child.assignedTherapist}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(child.id)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Assign Therapist">
                    <IconButton onClick={() => handleAssignTherapist(child.id)} color="secondary" size="small">
                      <AssignIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Sessions">
                    <IconButton onClick={() => handleViewSessions(child.id)} color="info" size="small">
                      <TherapyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(child.id)} color="error" size="small">
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

export default ChildList;

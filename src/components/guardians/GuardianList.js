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
  Person as PersonIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockGuardians = [
  {
    id: 1,
    name: 'John Thompson',
    email: 'john.t@example.com',
    phone: '(555) 123-4567',
    relationship: 'Father',
    children: [
      { id: 1, name: 'Alex Thompson' },
    ],
  },
  {
    id: 2,
    name: 'Linda Chen',
    email: 'linda.c@example.com',
    phone: '(555) 987-6543',
    relationship: 'Mother',
    children: [
      { id: 2, name: 'Emily Chen' },
      { id: 3, name: 'Michael Chen' },
    ],
  },
];

function GuardianList() {
  const [guardians] = useState(mockGuardians);

  const handleEdit = (id) => {
    // Will implement edit functionality
    console.log('Edit guardian:', id);
  };

  const handleDelete = (id) => {
    // Will implement delete functionality
    console.log('Delete guardian:', id);
  };

  const handleAdd = () => {
    // Will implement add functionality
    console.log('Add new guardian');
  };

  const handleViewChild = (childId) => {
    // Will implement view child functionality
    console.log('View child:', childId);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="h4">Guardians</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Guardian
        </Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Relationship</TableCell>
              <TableCell>Associated Children</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guardians.map((guardian) => (
              <TableRow key={guardian.id}>
                <TableCell>{guardian.name}</TableCell>
                <TableCell>{guardian.email}</TableCell>
                <TableCell>{guardian.phone}</TableCell>
                <TableCell>{guardian.relationship}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {guardian.children.map((child) => (
                      <Chip
                        key={child.id}
                        label={child.name}
                        color="primary"
                        variant="outlined"
                        onClick={() => handleViewChild(child.id)}
                        icon={<PersonIcon />}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(guardian.id)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(guardian.id)} color="error" size="small">
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

export default GuardianList;

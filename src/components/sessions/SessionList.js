import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Rating,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Assignment as NotesIcon,
  Palette as ArtIcon,
  Psychology as MoodIcon,
} from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockSessions = [
  {
    id: 1,
    date: '2025-04-13',
    time: '14:00',
    child: {
      id: 1,
      name: 'Alex Thompson',
      age: 8,
    },
    therapist: {
      id: 1,
      name: 'Dr. Sarah Johnson',
    },
    artType: 'Drawing Therapy',
    duration: 60,
    mood: {
      before: 2,
      after: 4,
    },
    artworkCreated: 'Self-portrait in safe space',
    notes: 'Alex showed increased comfort with color expression. Particularly responsive to blue tones.',
    progress: ['Improved color usage', 'More detailed expressions', 'Increased session engagement'],
  },
  {
    id: 2,
    date: '2025-04-13',
    time: '15:30',
    child: {
      id: 2,
      name: 'Emma Davis',
      age: 10,
    },
    therapist: {
      id: 2,
      name: 'Dr. Michael Chen',
    },
    artType: 'Sculpture Therapy',
    duration: 45,
    mood: {
      before: 3,
      after: 5,
    },
    artworkCreated: 'Clay family figures',
    notes: 'Emma demonstrated improved family dynamics understanding through sculpture placement.',
    progress: ['Better spatial awareness', 'Enhanced emotional expression', 'Family relationship insights'],
  },
];

function SessionList() {
  const [sessions] = useState(mockSessions);

  const handleEdit = (id) => {
    // Will implement edit functionality
    console.log('Edit session:', id);
  };

  const handleDelete = (id) => {
    // Will implement delete functionality
    console.log('Delete session:', id);
  };

  const handleAdd = () => {
    // Will implement add functionality
    console.log('Add new session');
  };

  const handleViewNotes = (id) => {
    // Will implement notes view functionality
    console.log('View notes for session:', id);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Therapy Sessions</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          New Session
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell>Child</TableCell>
              <TableCell>Therapist</TableCell>
              <TableCell>Art Type</TableCell>
              <TableCell>Mood Change</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <Typography variant="body2" color="textPrimary">
                    {new Date(session.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {session.time} ({session.duration} min)
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {session.child.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Age: {session.child.age}
                  </Typography>
                </TableCell>
                <TableCell>{session.therapist.name}</TableCell>
                <TableCell>
                  <Chip
                    icon={<ArtIcon />}
                    label={session.artType}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="textSecondary">Before:</Typography>
                      <Rating value={session.mood.before} readOnly size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="textSecondary">After:</Typography>
                      <Rating value={session.mood.after} readOnly size="small" />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {session.progress.map((item, index) => (
                      <Chip
                        key={index}
                        label={item}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="View Notes">
                    <IconButton
                      onClick={() => handleViewNotes(session.id)}
                      color="primary"
                      size="small"
                    >
                      <NotesIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => handleEdit(session.id)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDelete(session.id)}
                      color="error"
                      size="small"
                    >
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

export default SessionList;

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
  Rating,
} from '@mui/material';
import {
  Palette as ArtIcon,
  Psychology as MoodIcon,
  Assignment as NotesIcon,
} from '@mui/icons-material';

function NotesDialog({ open, onClose, session }) {
  if (!session) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Session Notes</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Date & Time
          </Typography>
          <Typography variant="body1">
            {new Date(session.date).toLocaleDateString()} at {session.time}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Duration: {session.duration} minutes
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Participants
          </Typography>
          <Typography variant="body1">
            Child: {session.child.name} (Age: {session.child.age})
          </Typography>
          <Typography variant="body1">
            Therapist: {session.therapist.name}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArtIcon fontSize="small" /> Art Activity
          </Typography>
          <Chip
            label={session.artType}
            color="primary"
            variant="outlined"
            sx={{ my: 1 }}
          />
          <Typography variant="body1">
            Artwork Created: {session.artworkCreated}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MoodIcon fontSize="small" /> Mood Assessment
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 1 }}>
            <Box>
              <Typography variant="body2" color="textSecondary">Before Session:</Typography>
              <Rating value={session.mood.before} readOnly />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">After Session:</Typography>
              <Rating value={session.mood.after} readOnly />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Progress Notes
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 1 }}>
            {session.progress.map((item, index) => (
              <Chip
                key={index}
                label={item}
                color="secondary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotesIcon fontSize="small" /> Detailed Notes
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
            {session.notes}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotesDialog;

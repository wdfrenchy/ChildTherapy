import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
} from '@mui/material';

function FeedbackDialog({ open, onClose, supervisor, therapist, initialFeedback = '' }) {
  const [feedback, setFeedback] = useState(initialFeedback);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will implement feedback submission
    console.log('Feedback:', {
      supervisorId: supervisor?.id,
      therapistId: therapist?.id,
      feedback,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Supervision Feedback</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Supervisor: {supervisor?.name}
              </Typography>
              <Typography variant="subtitle1">
                Therapist: {therapist?.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
                placeholder="Enter supervision feedback, observations, and recommendations"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Feedback
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FeedbackDialog;

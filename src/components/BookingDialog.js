import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material';
import { format } from 'date-fns';

const BookingDialog = ({ open, onClose, selectedSlot, bookingForm, setBookingForm, onSubmit }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(45deg, #2563EB 30%, #3B82F6 90%)',
          color: 'white',
          py: 3
        }}
      >
        <Typography variant="h6" component="div">
          Book Presentation Slot
        </Typography>
        {selectedSlot && (
          <Typography variant="subtitle2" sx={{ mt: 1, opacity: 0.9 }}>
            {format(selectedSlot.time, 'EEEE, MMMM d, h:mm a')}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            autoFocus
            label="Name"
            fullWidth
            required
            value={bookingForm.name}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Student Number"
            fullWidth
            required
            value={bookingForm.studentNumber}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, studentNumber: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Company Name (Optional)"
            fullWidth
            value={bookingForm.company}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, company: e.target.value })
            }
            helperText="Please specify the company your presentation will analyze"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Notes (Optional)"
            fullWidth
            multiline
            rows={3}
            value={bookingForm.notes}
            onChange={(e) =>
              setBookingForm({ ...bookingForm, notes: e.target.value })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: 'text.secondary',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSubmit}
          variant="contained"
          disabled={!bookingForm.name || !bookingForm.studentNumber}
          sx={{
            background: 'linear-gradient(45deg, #2563EB 30%, #3B82F6 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #1D4ED8 30%, #2563EB 90%)',
            }
          }}
        >
          Book Slot
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDialog;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Paper,
  Fade,
  IconButton,
  Alert,
  Zoom,
} from '@mui/material';
import { format, addWeeks, isSameDay } from 'date-fns';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Home() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    studentNumber: '',
    company: '',
    notes: '',
  });
  const [bookings, setBookings] = useState([]);
  const [openManageDialog, setOpenManageDialog] = useState(false);
  const [manageForm, setManageForm] = useState({
    referenceCode: '',
  });
  const [manageError, setManageError] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [cancelledBooking, setCancelledBooking] = useState(null);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings).map(booking => ({
        ...booking,
        date: new Date(booking.date)
      })));
    }
  }, []);

  // Generate the three weeks starting from Jan 25
  const startDate = new Date('2025-01-25');
  const weeks = [
    { sat: new Date('2025-01-25'), sun: new Date('2025-01-26') },
    { sat: new Date('2025-02-01'), sun: new Date('2025-02-02') },
    { sat: new Date('2025-02-08'), sun: new Date('2025-02-09') },
  ];

  // Generate time slots for a selected date
  const generateTimeSlots = (date) => {
    if (!date) return [];
    
    const slots = [];
    let currentTime = new Date(date);
    
    // Morning slots (9:10 AM - 1:00 PM)
    currentTime.setHours(9, 10, 0);
    while (currentTime.getHours() < 13) {
      const slotTime = new Date(currentTime);
      const existingBooking = bookings.find(
        booking => booking.date.getTime() === slotTime.getTime()
      );
      
      slots.push({
        time: slotTime,
        available: !existingBooking,
        booking: existingBooking,
      });
      currentTime.setMinutes(currentTime.getMinutes() + 25);
    }

    // Afternoon slots (2:10 PM - 5:00 PM)
    currentTime.setHours(14, 10, 0);
    while (currentTime.getHours() < 17) {
      const slotTime = new Date(currentTime);
      const existingBooking = bookings.find(
        booking => booking.date.getTime() === slotTime.getTime()
      );
      
      slots.push({
        time: slotTime,
        available: !existingBooking,
        booking: existingBooking,
      });
      currentTime.setMinutes(currentTime.getMinutes() + 25);
    }

    return slots;
  };

  const getAvailableSlotCount = (date) => {
    const daySlots = generateTimeSlots(date);
    return daySlots.filter(slot => slot.available).length;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setOpenDialog(true);
    } else {
      // If slot is booked, show the manage dialog with the booking's reference code
      setManageForm({ referenceCode: slot.booking.referenceCode });
      setOpenManageDialog(true);
    }
  };

  const handleBookingSubmit = () => {
    if (!bookingForm.name || !bookingForm.studentNumber) {
      return;
    }
    
    const bookingCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      ...bookingForm,
      date: selectedSlot.time,
      referenceCode: bookingCode,
    };

    // Update bookings in state and localStorage
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    // Navigate to confirmation page with booking details
    navigate('/booking-confirmation', {
      state: {
        booking: newBooking,
      },
    });

    // Clear form data only after successful navigation
    setOpenDialog(false);
    setBookingForm({
      name: '',
      studentNumber: '',
      company: '',
      notes: '',
    });
  };

  const handleCancelBooking = () => {
    const bookingToCancel = bookings.find(
      booking => booking.referenceCode === manageForm.referenceCode
    );

    if (!bookingToCancel) {
      setManageError('Invalid reference code. Please check and try again.');
      return;
    }

    // Store the cancelled booking details for the success message
    setCancelledBooking(bookingToCancel);

    // Remove the booking
    const updatedBookings = bookings.filter(
      booking => booking.referenceCode !== manageForm.referenceCode
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // Close manage dialog and show success dialog
    setOpenManageDialog(false);
    setManageForm({ referenceCode: '' });
    setOpenSuccessDialog(true);
  };

  const slots = generateTimeSlots(selectedDate);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Book Your Presentation Slot
        </Typography>
        <IconButton 
          onClick={() => setOpenManageDialog(true)}
          color="primary"
          size="large"
        >
          <SettingsIcon />
        </IconButton>
      </Box>

      {/* Week Selection */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {weeks.map((week, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Week {index + 1}
              </Typography>
              <Grid container spacing={2}>
                {['Saturday', 'Sunday'].map((day, i) => {
                  const date = i === 0 ? week.sat : week.sun;
                  const isSelected = selectedDate && isSameDay(selectedDate, date);
                  const availableCount = getAvailableSlotCount(date);
                  
                  return (
                    <Grid item xs={12} key={day}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          bgcolor: isSelected ? 'primary.main' : 'background.paper',
                          color: isSelected ? 'primary.contrastText' : 'text.primary',
                          '&:hover': {
                            bgcolor: isSelected ? 'primary.dark' : 'action.hover',
                          },
                        }}
                        onClick={() => handleDateSelect(date)}
                      >
                        <CardContent>
                          <Typography variant="h6">
                            {day}
                          </Typography>
                          <Typography>
                            {format(date, 'MMMM d, yyyy')}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Available slots: {availableCount}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Time Slots */}
      {selectedDate && (
        <Fade in={true}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Available Slots for {format(selectedDate, 'EEEE, MMMM d')}
            </Typography>
            <Grid container spacing={2}>
              {slots.map((slot, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      opacity: slot.available ? 1 : 0.8,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        bgcolor: slot.available ? 'background.paper' : 'error.50',
                      },
                      minHeight: '120px',
                    }}
                    onClick={() => handleSlotSelect(slot)}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        {format(slot.time, 'h:mm a')}
                      </Typography>
                      {slot.available ? (
                        <Typography 
                          color="primary"
                          sx={{ fontWeight: 'medium' }}
                        >
                          Available
                        </Typography>
                      ) : (
                        <>
                          <Typography 
                            color="error"
                            sx={{ fontWeight: 'medium' }}
                          >
                            Reserved by:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {slot.booking.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            #{slot.booking.studentNumber}
                          </Typography>
                          {slot.booking.company && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                              {slot.booking.company}
                            </Typography>
                          )}
                          <Typography 
                            variant="caption" 
                            color="primary"
                            sx={{ 
                              display: 'block', 
                              mt: 1,
                              fontStyle: 'italic'
                            }}
                          >
                            Click to manage booking
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      )}

      {/* Booking Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Book Presentation Slot for {selectedSlot && format(selectedSlot.time, 'EEEE, MMMM d, h:mm a')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              required
              value={bookingForm.name}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Student Number"
              fullWidth
              required
              value={bookingForm.studentNumber}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, studentNumber: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Company Name (Optional)"
              fullWidth
              value={bookingForm.company}
              onChange={(e) =>
                setBookingForm({ ...bookingForm, company: e.target.value })
              }
              helperText="Please specify the company your presentation will analyze. This helps ensure each presentation covers a different company."
            />
            <TextField
              margin="dense"
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
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleBookingSubmit} 
            variant="contained"
            disabled={!bookingForm.name || !bookingForm.studentNumber}
          >
            Book Slot
          </Button>
        </DialogActions>
      </Dialog>

      {/* Manage Booking Dialog */}
      <Dialog
        open={openManageDialog}
        onClose={() => {
          setOpenManageDialog(false);
          setManageError('');
          setManageForm({ referenceCode: '' });
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Manage Your Booking</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {manageError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {manageError}
              </Alert>
            )}
            <Typography variant="body1" gutterBottom>
              Enter your booking reference code to cancel your presentation slot.
            </Typography>
            <TextField
              margin="dense"
              label="Reference Code"
              fullWidth
              required
              value={manageForm.referenceCode}
              onChange={(e) =>
                setManageForm({ ...manageForm, referenceCode: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setOpenManageDialog(false);
              setManageError('');
              setManageForm({ referenceCode: '' });
            }}
          >
            Close
          </Button>
          <Button 
            onClick={handleCancelBooking}
            variant="contained"
            color="error"
            disabled={!manageForm.referenceCode}
          >
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Zoom in={true}>
              <CheckCircleOutlineIcon
                color="success"
                sx={{ fontSize: 64, mb: 2 }}
              />
            </Zoom>
            <Typography variant="h5" gutterBottom>
              Booking Cancelled Successfully
            </Typography>
            {cancelledBooking && (
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  Your booking for {format(cancelledBooking.date, 'EEEE, MMMM d')} at{' '}
                  {format(cancelledBooking.date, 'h:mm a')} has been cancelled.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  The slot is now available for booking again.
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              onClick={() => setOpenSuccessDialog(false)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Home; 
import React, { useState, useEffect } from 'react';
import { getSchedules, saveSchedule, deleteSchedule } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Container,
  Alert,
  CardHeader,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import { format, isSameDay } from 'date-fns';
import BookingDialog from '../components/BookingDialog';
import TimeSlotCard from '../components/TimeSlotCard';

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

  // Load bookings from GitHub on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const savedBookings = await getSchedules();
        setBookings(savedBookings.map(booking => ({
          ...booking,
          date: new Date(booking.date)
        })));
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  // Define the three weeks
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
    }
  };

  const handleBookingSubmit = async () => {
    if (!bookingForm.name || !bookingForm.studentNumber) {
      return;
    }
    
    const bookingCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      ...bookingForm,
      date: selectedSlot.time,
      referenceCode: bookingCode,
    };

    try {
      const updatedBookings = await saveSchedule(newBooking);
      setBookings(updatedBookings.map(booking => ({
        ...booking,
        date: new Date(booking.date)
      })));
      
      navigate('/booking-confirmation', {
        state: {
          booking: newBooking,
        },
      });

      setOpenDialog(false);
      setBookingForm({
        name: '',
        studentNumber: '',
        company: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const slots = generateTimeSlots(selectedDate);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Book Your Presentation Slot
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose your preferred time slot for the presentation
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {weeks.map((week, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper 
              elevation={2}
              sx={{ 
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #2563EB 30%, #3B82F6 90%)',
                  p: 2,
                  color: 'white'
                }}
              >
                <Typography variant="h6">Week {index + 1}</Typography>
              </Box>
              <Box p={2}>
                {['Saturday', 'Sunday'].map((day, i) => {
                  const date = i === 0 ? week.sat : week.sun;
                  const isSelected = selectedDate && isSameDay(selectedDate, date);
                  const availableCount = getAvailableSlotCount(date);
                  
                  return (
                    <Card
                      key={day}
                      onClick={() => handleDateSelect(date)}
                      sx={{
                        cursor: 'pointer',
                        mb: i === 0 ? 2 : 0,
                        borderLeft: isSelected ? '4px solid #2563EB' : 'none',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: '#F3F4F6',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" color={isSelected ? 'primary' : 'text.primary'}>
                          {day}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {format(date, 'MMMM d, yyyy')}
                        </Typography>
                        <Chip
                          label={`${availableCount} slots available`}
                          color={availableCount > 0 ? 'success' : 'error'}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedDate && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              Available Slots for {format(selectedDate, 'EEEE, MMMM d')}
            </Typography>
            <Divider />
          </Box>
          
          <Grid container spacing={2}>
            {slots.map((slot, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <TimeSlotCard slot={slot} onSelect={handleSlotSelect} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <BookingDialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedSlot={selectedSlot}
        bookingForm={bookingForm}
        setBookingForm={setBookingForm}
        onSubmit={handleBookingSubmit}
      />
    </Container>
  );
}

export default Home;
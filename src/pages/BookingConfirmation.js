import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Zoom,
  Grow,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { format } from 'date-fns';

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  
  const { booking } = location.state || {
    booking: {
      studentName: 'John Doe',
      studentNumber: '12345',
      date: new Date(),
      referenceCode: '1234',
      notes: '',
    },
  };

  useEffect(() => {
    // Show details after the check animation
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Zoom in={true} timeout={800}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <CheckCircleOutlineIcon
                color="success"
                sx={{ fontSize: 80, mb: 2 }}
              />
              <Typography variant="h4" gutterBottom align="center">
                Booking Confirmed!
              </Typography>
            </Box>
          </Zoom>

          <Divider sx={{ my: 2 }} />

          <Grow in={showDetails} timeout={800}>
            <Box>
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Booking Details
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Student Name:</strong> {booking.studentName}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Student Number:</strong> {booking.studentNumber}
                </Typography>
                {booking.company && (
                  <Typography variant="body1" paragraph>
                    <strong>Company:</strong> {booking.company}
                  </Typography>
                )}
                <Typography variant="body1" paragraph>
                  <strong>Date & Time:</strong>{' '}
                  {format(booking.date, 'EEEE, MMMM d, yyyy')} at{' '}
                  {format(booking.date, 'h:mm a')}
                </Typography>
                {booking.notes && (
                  <Typography variant="body1" paragraph>
                    <strong>Notes:</strong> {booking.notes}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ mt: 3 }}>
                  <strong>Reference Code:</strong>{' '}
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      letterSpacing: '2px',
                    }}
                  >
                    {booking.referenceCode}
                  </Box>
                </Typography>
              </Box>

              <Typography 
                color="text.secondary" 
                sx={{ mt: 2, bgcolor: 'action.hover', p: 2, borderRadius: 1 }}
              >
                Please save your reference code. You'll need it to modify or cancel
                your booking.
              </Typography>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={{ minWidth: 200 }}
                >
                  Back to Home
                </Button>
              </Box>
            </Box>
          </Grow>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BookingConfirmation; 
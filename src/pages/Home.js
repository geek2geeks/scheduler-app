import React, { useState, useEffect } from 'react';
import { getSchedules, saveSchedule, deleteSchedule } from '../utils/storage';
import TimeSlotCard from '../components/TimeSlotCard';
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
  Container,
  CircularProgress,
  Alert,
  Snackbar,
  CardHeader,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import { format, isSameDay } from 'date-fns';

function Home() {
  // ... existing state declarations ...

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

      {/* Week Selection */}
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

      {/* Time Slots */}
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

      {/* Booking Dialog - Keep existing dialog code */}
      
      {/* Add Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;
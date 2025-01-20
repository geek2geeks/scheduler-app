import React from 'react';
import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import { format } from 'date-fns';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const TimeSlotCard = ({ slot, onSelect }) => (
  <Card
    onClick={() => onSelect(slot)}
    sx={{
      cursor: 'pointer',
      height: '100%',
      transition: 'all 0.2s',
      border: slot.available ? '1px solid #E5E7EB' : '1px solid #EF4444',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      },
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '4px',
        background: slot.available 
          ? 'linear-gradient(90deg, #10B981 0%, #34D399 100%)'
          : 'linear-gradient(90deg, #EF4444 0%, #F87171 100%)',
      }}
    />
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{format(slot.time, 'h:mm a')}</Typography>
        {slot.available ? (
          <Chip 
            icon={<EventAvailableIcon />}
            label="Available" 
            color="success" 
            size="small"
            sx={{ borderRadius: '4px' }}
          />
        ) : (
          <Chip 
            icon={<EventBusyIcon />}
            label="Booked" 
            color="error" 
            size="small"
            sx={{ borderRadius: '4px' }}
          />
        )}
      </Box>
      {!slot.available && (
        <Box 
          sx={{ 
            mt: 1,
            p: 1,
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '4px'
          }}
        >
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Reserved by: {slot.booking.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            #{slot.booking.studentNumber}
          </Typography>
          {slot.booking.company && (
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ display: 'block', mt: 0.5 }}
            >
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
        </Box>
      )}
    </CardContent>
  </Card>
);

export default TimeSlotCard;
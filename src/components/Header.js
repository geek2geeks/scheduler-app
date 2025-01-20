import React from 'react';
import { AppBar, Box, Container, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ 
      background: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Container maxWidth="lg">
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          py={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon sx={{ fontSize: 28 }} />
            <Typography variant="h6" component="div" fontWeight="500">
              Presentation Booking
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button 
              component={Link} 
              to="/" 
              color="inherit"
              sx={{ 
                fontWeight: 500,
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              HOME
            </Button>
            <Button 
              component={Link} 
              to="/admin" 
              color="inherit"
              sx={{ 
                fontWeight: 500,
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              ADMIN
            </Button>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
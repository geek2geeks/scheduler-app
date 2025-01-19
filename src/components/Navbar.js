import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <CalendarTodayIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Presentation Booking
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin"
          >
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 
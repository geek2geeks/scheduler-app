import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import Home from './pages/Home';
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: '#F9FAFB'
      }}>
        <Header />
        <Box component="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
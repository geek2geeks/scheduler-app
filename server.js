const express = require('express');
const cors = require('cors');
const bookingService = require('./src/services/bookingService');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all bookings
app.get('/api/bookings', (req, res) => {
  const bookings = bookingService.getAllBookings();
  res.json(bookings);
});

// Add a new booking
app.post('/api/bookings', (req, res) => {
  const booking = req.body;
  const success = bookingService.addBooking(booking);
  
  if (success) {
    res.status(201).json(booking);
  } else {
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Delete a booking
app.delete('/api/bookings/:referenceCode', (req, res) => {
  const { referenceCode } = req.params;
  const success = bookingService.deleteBooking(referenceCode);
  
  if (success) {
    res.status(200).json({ message: 'Booking deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
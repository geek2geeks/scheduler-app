const fs = require('fs');
const path = require('path');

const BOOKINGS_FILE = path.join(__dirname, '../../data/bookings.json');

// Helper function to read bookings
const readBookings = () => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data).bookings;
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
};

// Helper function to write bookings
const writeBookings = (bookings) => {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify({ bookings }, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing bookings:', error);
    return false;
  }
};

// Get all bookings
const getAllBookings = () => {
  return readBookings();
};

// Add a new booking
const addBooking = (booking) => {
  const bookings = readBookings();
  bookings.push(booking);
  return writeBookings(bookings);
};

// Delete a booking
const deleteBooking = (referenceCode) => {
  const bookings = readBookings();
  const updatedBookings = bookings.filter(b => b.referenceCode !== referenceCode);
  return writeBookings(updatedBookings);
};

module.exports = {
  getAllBookings,
  addBooking,
  deleteBooking,
}; 
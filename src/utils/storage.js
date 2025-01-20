import { getBookings, updateBookings } from './github';

export const getSchedules = async () => {
  try {
    // First try to get from GitHub
    const { bookings } = await getBookings();
    
    // Update local cache
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    return bookings;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    // Fallback to local cache
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }
};

export const saveSchedule = async (schedule) => {
  try {
    // Get current bookings
    const currentBookings = await getSchedules();
    const newSchedule = { ...schedule, id: Date.now() };
    
    // Check for double booking
    const isSlotTaken = currentBookings.some(booking => 
      booking.date === schedule.date && booking.time === schedule.time
    );
    
    if (isSlotTaken) {
      throw new Error('This slot has already been booked');
    }
    
    // Add new booking
    const newBookings = [...currentBookings, newSchedule];
    
    // Update GitHub
    await updateBookings(newBookings, `Add booking: ${schedule.name || 'Anonymous'}`);
    
    // Update local cache
    localStorage.setItem('bookings', JSON.stringify(newBookings));
    
    return newBookings;
  } catch (error) {
    console.error('Error saving schedule:', error);
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  try {
    // Get current bookings
    const currentBookings = await getSchedules();
    
    // Remove booking
    const newBookings = currentBookings.filter(booking => booking.id !== id);
    
    // Update GitHub
    await updateBookings(newBookings, `Delete booking ${id}`);
    
    // Update local cache
    localStorage.setItem('bookings', JSON.stringify(newBookings));
    
    return newBookings;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    throw error;
  }
};
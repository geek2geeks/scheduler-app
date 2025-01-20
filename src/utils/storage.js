import { getBookings, updateBookings } from './github';

const OWNER = 'geek2geeks';
const REPO = 'scheduler-app';
const FILE_PATH = 'data/bookings.json';

export const getSchedules = async () => {
  try {
<<<<<<< Updated upstream
    // First try to get from GitHub
    const { bookings } = await getBookings();
    
    // Update local cache
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    return bookings;
  } catch (error) {
    console.error('Error fetching schedules:', error);
    // Fallback to local cache
=======
    // Fetch from GitHub first
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`);
    const data = await response.json();
    const bookings = JSON.parse(atob(data.content));
    
    // Update local storage with latest data
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookings;
  } catch (error) {
    // Fallback to localStorage only if fetch fails
    console.error('Error fetching from GitHub:', error);
>>>>>>> Stashed changes
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  }
};

export const saveSchedule = async (schedule) => {
  try {
<<<<<<< Updated upstream
    // Get current bookings
    const currentBookings = await getSchedules();
    const newSchedule = { ...schedule, id: Date.now() };
=======
    // Get latest bookings from GitHub
    const currentBookings = await getSchedules();
    
    // Check for conflicts
    const isSlotTaken = currentBookings.some(booking => 
      new Date(booking.date).getTime() === new Date(schedule.date).getTime()
    );
    
    if (isSlotTaken) {
      throw new Error('This slot is already booked');
    }

    const newSchedule = { ...schedule, id: Date.now() };
    const newContent = [...currentBookings, newSchedule];
>>>>>>> Stashed changes
    
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
<<<<<<< Updated upstream
    console.error('Error saving schedule:', error);
=======
>>>>>>> Stashed changes
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  try {
<<<<<<< Updated upstream
    // Get current bookings
    const currentBookings = await getSchedules();
=======
    // Get latest bookings from GitHub
    const currentBookings = await getSchedules();
    const newContent = currentBookings.filter(schedule => schedule.id !== id);
>>>>>>> Stashed changes
    
    // Remove booking
    const newBookings = currentBookings.filter(booking => booking.id !== id);
    
    // Update GitHub
    await updateBookings(newBookings, `Delete booking ${id}`);
    
    // Update local cache
    localStorage.setItem('bookings', JSON.stringify(newBookings));
    
    return newBookings;
  } catch (error) {
<<<<<<< Updated upstream
    console.error('Error deleting schedule:', error);
=======
>>>>>>> Stashed changes
    throw error;
  }
};
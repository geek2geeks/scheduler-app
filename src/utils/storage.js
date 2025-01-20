import { updateBookings } from './github';

export const getSchedules = async () => {
  // Use localStorage as backup
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};

export const saveSchedule = async (schedule) => {
  try {
    const currentSchedules = await getSchedules();
    const newSchedule = { ...schedule, id: Date.now() };
    const newContent = [...currentSchedules, newSchedule];
    
    // Update GitHub immediately
    await updateBookings(newContent, `Add booking: ${schedule.name}`);
    
    // Update local storage as backup
    localStorage.setItem('bookings', JSON.stringify(newContent));
    
    return newContent;
  } catch (error) {
    throw new Error('Failed to save booking');
  }
};

export const deleteSchedule = async (id) => {
  try {
    const currentSchedules = await getSchedules();
    const newContent = currentSchedules.filter(schedule => schedule.id !== id);
    
    // Update GitHub immediately
    await updateBookings(newContent, `Delete booking ${id}`);
    
    // Update local storage as backup
    localStorage.setItem('bookings', JSON.stringify(newContent));
    
    return newContent;
  } catch (error) {
    throw new Error('Failed to delete booking');
  }
};
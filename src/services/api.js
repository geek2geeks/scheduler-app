import axios from 'axios';

// GitHub API configuration
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_OWNER = process.env.REACT_APP_GITHUB_OWNER;
const GITHUB_REPO = process.env.REACT_APP_GITHUB_REPO;
const GITHUB_PATH = 'data/bookings.json';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
});

const api = {
  // Get current file SHA (needed for updates)
  getFileSha: async () => {
    try {
      const response = await githubApi.get(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`
      );
      return response.data.sha;
    } catch (error) {
      console.error('Error getting file SHA:', error);
      return null;
    }
  },

  // Get all bookings
  getBookings: async () => {
    try {
      const response = await githubApi.get(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`
      );
      const content = JSON.parse(atob(response.data.content));
      return content.bookings.map(booking => ({
        ...booking,
        date: new Date(booking.date)
      }));
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  },

  // Update bookings file
  updateBookings: async (bookings) => {
    try {
      const sha = await api.getFileSha();
      const content = btoa(JSON.stringify({ bookings }, null, 2));
      
      await githubApi.put(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`,
        {
          message: 'Update bookings',
          content,
          sha,
        }
      );
      return true;
    } catch (error) {
      console.error('Error updating bookings:', error);
      return false;
    }
  },

  // Add a new booking
  addBooking: async (booking) => {
    try {
      const currentBookings = await api.getBookings();
      const updatedBookings = [...currentBookings, booking];
      const success = await api.updateBookings(updatedBookings);
      return success ? booking : null;
    } catch (error) {
      console.error('Error adding booking:', error);
      return null;
    }
  },

  // Delete a booking
  deleteBooking: async (referenceCode) => {
    try {
      const currentBookings = await api.getBookings();
      const updatedBookings = currentBookings.filter(
        b => b.referenceCode !== referenceCode
      );
      return await api.updateBookings(updatedBookings);
    } catch (error) {
      console.error('Error deleting booking:', error);
      return false;
    }
  }
};

export default api; 
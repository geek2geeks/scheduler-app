const OWNER = 'geek2geeks';
const REPO = 'scheduler-app';
const FILE_PATH = 'data/bookings.json';

export const getBookings = async () => {
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    
    const data = await response.json();
    const content = JSON.parse(atob(data.content));
    return {
      bookings: content.bookings,
      sha: data.sha
    };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return { bookings: [], sha: null };
  }
};

export const updateBookings = async (bookings, message) => {
  try {
    const current = await getBookings();
    
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message,
        content: btoa(JSON.stringify({ bookings }, null, 2)),
        sha: current.sha
      })
    });

    if (!response.ok) throw new Error('Failed to update bookings');
    return true;
  } catch (error) {
    console.error('Error updating bookings:', error);
    throw error;
  }
};
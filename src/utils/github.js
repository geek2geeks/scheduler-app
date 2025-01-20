const OWNER = 'geek2geeks';
const REPO = 'scheduler-app';
const FILE_PATH = 'data/bookings.json';

export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('github_token');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  };
};

export const updateBookings = async (bookings, message) => {
  try {
    // First get the current file to get its SHA
    const currentFile = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
      headers: getAuthHeaders()
    }).then(res => res.json());

    // Update the file
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        message,
        content: btoa(JSON.stringify(bookings, null, 2)),
        sha: currentFile.sha
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error updating bookings:', error);
    throw error;
  }
};
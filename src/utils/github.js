const OWNER = 'geek2geeks';
const REPO = 'scheduler-app';
const FILE_PATH = 'data/bookings.json';

const getAuthHeaders = () => {
  return {
    'Accept': 'application/vnd.github.v3+json'
  };
};

export const getFileContent = async () => {
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (response.status === 404) return null;
    return {
      content: JSON.parse(atob(data.content)),
      sha: data.sha
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
};

// For write operations, we'll use GitHub's Web UI
export const updateFile = async (content) => {
  // Instead of writing directly, we'll store in localStorage temporarily
  localStorage.setItem('pending_changes', JSON.stringify(content));
  // Return true to maintain API compatibility
  return true;
};
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN; 
const OWNER = 'geek2geeks';
const REPO = 'scheduler-app';
const FILE_PATH = 'data/bookings.json';

export const getFileContent = async () => {
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
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

export const updateFile = async (content, sha, message) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message,
        content: btoa(JSON.stringify(content, null, 2)),
        sha: sha || ''
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating file:', error);
    return false;
  }
};
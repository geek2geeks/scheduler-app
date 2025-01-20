import React from 'react';
import { Button } from '@mui/material';

const GitHubAuth = () => {
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo`;
  };

  return (
    <Button 
      variant="contained" 
      onClick={handleLogin}
      sx={{ mt: 2 }}
    >
      Login with GitHub to Enable Bookings
    </Button>
  );
};

export default GitHubAuth;
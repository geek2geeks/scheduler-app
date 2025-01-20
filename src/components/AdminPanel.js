import React from 'react';
import { Box, Typography } from '@mui/material';
import GitHubAuth from './GitHubAuth';

const AdminPanel = () => {
  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Admin Panel
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        Authenticate with GitHub to manage bookings.
      </Typography>
      
      <GitHubAuth />
    </Box>
  );
};

export default AdminPanel;
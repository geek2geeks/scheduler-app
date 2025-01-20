import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { getPendingChanges, clearPendingChanges } from '../utils/storage';

const AdminPanel = () => {
  const [pendingChanges, setPendingChanges] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadPendingChanges = async () => {
      const changes = await getPendingChanges();
      setPendingChanges(changes);
    };
    loadPendingChanges();
  }, []);

  const handleExportChanges = () => {
    const dataStr = JSON.stringify(pendingChanges, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const syncInstructions = [
    '1. Click "Export Changes" to download the latest bookings.json',
    '2. Go to GitHub repository: geek2geeks/scheduler-app',
    '3. Navigate to data/bookings.json',
    '4. Click "Edit" (pencil icon)',
    '5. Replace content with the downloaded file',
    '6. Commit changes with message "Update bookings"',
  ];

  return (
    <Box sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Admin Panel
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        Pending Changes: {pendingChanges.length}
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={handleExportChanges}
        disabled={!pendingChanges.length}
      >
        Export Changes
      </Button>
      
      {showSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Changes exported successfully!
        </Alert>
      )}

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Sync Instructions</Typography>
        {syncInstructions.map((instruction, index) => (
          <Typography key={index} variant="body2" sx={{ mt: 1 }}>
            {instruction}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default AdminPanel;
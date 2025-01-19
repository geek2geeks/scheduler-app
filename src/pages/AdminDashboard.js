import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data for bookings
  const [bookings] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentNumber: '12345',
      date: new Date('2024-02-10T09:00:00'),
      referenceCode: '1234',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentNumber: '67890',
      date: new Date('2024-02-10T09:25:00'),
      referenceCode: '5678',
    },
    // Add more mock bookings as needed
  ]);

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    // TODO: Implement edit logic
    setOpenEditDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box sx={{ mb: 4 }}>
          <DatePicker
            label="Filter by Date"
            value={selectedDate}
            onChange={setSelectedDate}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Student Number</TableCell>
                <TableCell>Reference Code</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    {booking.date.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>{booking.studentName}</TableCell>
                  <TableCell>{booking.studentNumber}</TableCell>
                  <TableCell>{booking.referenceCode}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleEditClick(booking)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  label="Student Name"
                  fullWidth
                  margin="normal"
                  defaultValue={selectedBooking.studentName}
                />
                <TextField
                  label="Student Number"
                  fullWidth
                  margin="normal"
                  defaultValue={selectedBooking.studentNumber}
                />
                <DatePicker
                  label="Date and Time"
                  value={selectedBooking.date}
                  onChange={() => {}}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "normal"
                    },
                  }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}

export default AdminDashboard; 
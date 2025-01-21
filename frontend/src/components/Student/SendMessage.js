import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [recipientRole, setRecipientRole] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    // Replace with actual sender_id from session or local storage
    const senderId = JSON.parse(localStorage.getItem('user'))?.id;

    if (!senderId) {
      setError('Sender ID not found. Please log in.');
      return;
    }

    try {
      const response = await fetch('/http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id: senderId, recipient_id: recipientId, recipient_role: recipientRole, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess('Message sent successfully');
      setMessage('');
      setRecipientId('');
      setRecipientRole('');
    } catch (err) {
      setError(err.message || 'An error occurred while sending the message');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          boxShadow: 2,
          border: '1px solid #ddd',
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Send Message
        </Typography>

        {success && (
          <Typography
            sx={{ color: '#4caf50', marginBottom: 2, textAlign: 'center' }}
          >
            {success}
          </Typography>
        )}
        {error && (
          <Typography
            sx={{ color: '#f44336', marginBottom: 2, textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipient ID"
                variant="outlined"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Recipient Role</InputLabel>
                <Select
                  value={recipientRole}
                  onChange={(e) => setRecipientRole(e.target.value)}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="parent">Parent</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#007bff',
                  ':hover': { backgroundColor: '#0056b3' },
                }}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default SendMessage;

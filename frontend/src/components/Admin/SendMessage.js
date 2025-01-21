import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';

const SendMessage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState(''); // recipient ID
  const [recipientRole, setRecipientRole] = useState('student'); // recipient role
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setConfirmationMessage(''); // Clear any previous messages

    try {
      // Assuming the senderId comes from the authenticated user
      const senderId = 1; // Replace with actual sender ID from the authenticated user

      // Make API request to send message
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: senderId,          // Pass senderId as the ID of the authenticated user
          recipient: recipient,        // Pass recipient as ID (not username)
          message: message,            // Send the message content
          recipientRole: recipientRole // Send recipient role (student, teacher, parent, admin)
        }),
      });

      const responseBody = await response.json();
      setLoading(false);

      console.log(responseBody); // Log the response for debugging

      if (response.ok) {
        setConfirmationMessage('✅ Message sent successfully!');
        setMessage('');   // Clear message input
        setRecipient(''); // Clear recipient input
        setRecipientRole('student'); // Reset recipient role
      } else {
        setConfirmationMessage(responseBody.message || '❌ Failed to send the message. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error occurred while sending message:', error);
      setConfirmationMessage('❌ An unexpected error occurred. Please try again later.');
    }
  };

  const formStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '30px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '20px',
  };

  return (
    <Container maxWidth="sm" style={formStyle}>
      <h2 style={{ textAlign: 'center' }}>Send a Message</h2>

      {confirmationMessage && (
        <p style={{ color: confirmationMessage.includes('✅') ? 'green' : 'red', fontWeight: 'bold', textAlign: 'center' }}>
          {confirmationMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <label htmlFor="recipient" style={{ display: 'block', marginBottom: '5px' }}>Recipient ID</label>
          <input
            id="recipient"
            type="number"  // Ensure the recipient is entered as a number (ID)
            placeholder="Enter recipient's ID"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            style={inputStyle}
          />
        </Box>
        <Box mb={2}>
          <label htmlFor="recipientRole" style={{ display: 'block', marginBottom: '5px' }}>Recipient Role</label>
          <select
            id="recipientRole"
            value={recipientRole}
            onChange={(e) => setRecipientRole(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>
        </Box>
        <Box mb={2}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message Content</label>
          <textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              ...inputStyle,
              minHeight: '100px',
            }}
          />
        </Box>
        <Box style={buttonContainerStyle}>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/Dashboard')}
            style={{ ...buttonStyle, backgroundColor: '#f44336' }} // Red for Cancel button
          >
            Cancel
          </button>
        </Box>
      </form>
    </Container>
  );
};

export default SendMessage;

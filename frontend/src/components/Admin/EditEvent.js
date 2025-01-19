import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Box)`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 30px;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
`;

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Error fetching event details');
        }
        const data = await response.json();
        setEvent(data); // Assuming data contains event properties like title, description, and date
      } catch (error) {
        setError(error.message || 'Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Event updated successfully!' });
        navigate('/admin/manage-events'); // Redirect to events management page after update
      } else {
        setFlashMessage({ type: 'error', message: 'Error updating event' });
      }
    } catch (error) {
      setFlashMessage({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFlashMessage(null), 3000);
    }
  };

  return (
    <div>
      <Box my={2} textAlign="center">
        <h2>Edit Event</h2>
      </Box>

      {flashMessage && (
        <Box my={2} textAlign="center">
          <Box
            sx={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: flashMessage.type === 'error' ? '#f8d7da' : '#d4edda',
              color: flashMessage.type === 'error' ? '#721c24' : '#155724',
              border: `1px solid ${flashMessage.type === 'error' ? '#f5c6cb' : '#c3e6cb'}`,
            }}
          >
            {flashMessage.message}
          </Box>
        </Box>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Title"
                name="title"
                value={event.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Description"
                name="description"
                value={event.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
            </div>
            <div>
              <TextField
                label="Date"
                name="date"
                value={event.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="date"
                required
              />
            </div>

            <Box my={2} display="flex" justifyContent="space-between" gap="10px">
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Event'}
              </Button>
              <CancelButton variant="contained" onClick={() => navigate('/admin/manage-events')}>
                Cancel
              </CancelButton>
            </Box>
          </form>
        </FormContainer>
      )}
    </div>
  );
};

export default EditEvent;

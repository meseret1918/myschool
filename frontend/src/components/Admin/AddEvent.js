import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Box)`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 48%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: white;
`;

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!eventData.title || !eventData.date) {
      setErrorMessage('Title and Date are required');
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      setSuccessMessage('Event added successfully!');
      setEventData({ title: '', description: '', date: '' });
      setErrorMessage(null);
      setTimeout(() => navigate('/admin/manage-events'), 2000);
    } catch (error) {
      setErrorMessage('Error adding event. Please try again later.');
      setSuccessMessage(null);
    }
  };

  return (
    <FormContainer>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Event</h3>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <div>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={eventData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          as="textarea"
          name="description"
          placeholder="Description"
          value={eventData.description}
          onChange={handleChange}
          style={{ height: '100px' }}
        />
      </div>
      <div>
        <Input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleSubmit}
          style={{ backgroundColor: '#007bff' }}
        >
          Add Event
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/admin/manage-events')}
          style={{ backgroundColor: '#f44336' }}
        >
          Cancel
        </Button>
      </div>
    </FormContainer>
  );
};

export default AddEvent;

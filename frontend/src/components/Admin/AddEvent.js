import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/AddEvent.css'; // Correctly import the CSS file

const AddEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      // Reset form or redirect after successful event creation
      alert('Event added successfully');
      setEvent({ title: '', description: '', date: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Buttons for submit and back to Manage Events */}
        <div className="form-buttons">
          <button type="submit">Add Event</button>
          <Link to="/admin/manage-events" className="btn back-to-home">Back to Manage Events</Link>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;

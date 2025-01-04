import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DeleteEvent = ({ eventId }) => {
  const navigate = useNavigate();  // Use navigate instead of useHistory

  const handleDelete = () => {
    // Handle the event deletion logic (e.g., API call to delete event)
    
    // After deletion, navigate back to the events list or another page
    navigate('/events'); // Update the path as needed
  };

  return (
    <div className="delete-event-container">
      <h2>Delete Event</h2>
      <p>Are you sure you want to delete this event?</p>
      <button onClick={handleDelete}>Delete Event</button>
      <button onClick={() => navigate('/events')}>Cancel</button>
    </div>
  );
};

export default DeleteEvent;

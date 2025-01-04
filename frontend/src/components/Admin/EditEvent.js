import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Use useParams to get eventId from URL
import './styles/EditEvent.css'; // Import the CSS file

const EditEvent = () => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const navigate = useNavigate(); // Use navigate instead of useHistory
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [flashMessage, setFlashMessage] = useState('');
  const [flashMessageType, setFlashMessageType] = useState(''); // success or error

  useEffect(() => {
    // Fetch event data for editing using the eventId from URL
    fetch(`http://localhost:5000/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setEvent({
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
        }); // Set event data if available
      })
      .catch((error) => {
        setFlashMessage('Failed to load event data. Please try again later.');
        setFlashMessageType('error');
      });
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the event with the provided data using the eventId in the URL
    fetch(`http://localhost:5000/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: event.title,
        description: event.description,
        date: event.date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setFlashMessage('Event updated successfully!');
        setFlashMessageType('success');

        // Redirect to manage events page after a short delay
        setTimeout(() => {
          navigate('/manage-events');
        }, 2000); // Delay for 2 seconds
      })
      .catch((error) => {
        setFlashMessage('Failed to update event. Please try again.');
        setFlashMessageType('error');
      });
  };

  return (
    <div className="edit-event-container">
      <h2>Edit Event</h2>
      {flashMessage && (
        <div className={`flash-message ${flashMessageType}`}>
          {flashMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
        />
        <textarea
          placeholder="Event Description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
        <input
          type="date"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
        />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;

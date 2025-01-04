import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/ManageEvents.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error('Error fetching events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete event action with confirmation
  const handleDelete = async (eventId) => {
    const userResponse = window.confirm('Are you sure you want to delete this event? Click "OK" for Yes or "Cancel" for No.');

    if (userResponse) { // User clicked "OK" (Yes)
      try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Filter out the deleted event from the state
          setEvents(events.filter(event => event.id !== eventId));
          alert('Event deleted successfully.');
        } else {
          alert('Failed to delete event.');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again later.');
      }
    } else { // User clicked "Cancel" (No)
      alert('Event deletion cancelled.');
    }
  };

  return (
    <div className="manage-events-container">
      <h2>Manage Events</h2>
      <h3>List of Events</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Add</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{event.description || 'N/A'}</td>
                <td>{new Date(event.date).toLocaleDateString() || 'Invalid Date'}</td>
                <td>
                  <Link to="/admin/add-event">
                    <button className="add-button">Add</button>
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/edit-event/${event.id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageEvents;

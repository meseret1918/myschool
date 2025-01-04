import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

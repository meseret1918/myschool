import React, { useState, useEffect } from 'react';

const ViewEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/events');
            const data = await response.json();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>View Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event._id}>{event.name} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewEvents;

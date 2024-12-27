import React, { useState, useEffect } from 'react';

const ViewTransport = () => {
    const [transport, setTransport] = useState(null);

    useEffect(() => {
        const fetchTransport = async () => {
            const response = await fetch('/api/transport');
            const data = await response.json();
            setTransport(data);
        };

        fetchTransport();
    }, []);

    return (
        <div>
            <h1>View Transport</h1>
            {transport ? (
                <div>
                    <p>Transport Mode: {transport.mode}</p>
                    <p>Pickup Location: {transport.pickupLocation}</p>
                    <p>Drop-off Location: {transport.dropoffLocation}</p>
                </div>
            ) : (
                <p>No transport data available</p>
            )}
        </div>
    );
};

export default ViewTransport;

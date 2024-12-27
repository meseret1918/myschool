import React, { useState, useEffect } from 'react';

const ManageTransport = () => {
    const [transport, setTransport] = useState([]);

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
            <h1>Manage Transport</h1>
            <table>
                <thead>
                    <tr>
                        <th>Route Name</th>
                        <th>Bus Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transport.map(route => (
                        <tr key={route._id}>
                            <td>{route.routeName}</td>
                            <td>{route.busNumber}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTransport;

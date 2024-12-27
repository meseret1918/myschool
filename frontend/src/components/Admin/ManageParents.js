import React, { useState, useEffect } from 'react';
import './ManageStudents.css';

const ManageParents = () => {
    const [parents, setParents] = useState([]);

    useEffect(() => {
        const fetchParents = async () => {
            const response = await fetch('/api/parents');
            const data = await response.json();
            setParents(data);
        };

        fetchParents();
    }, []);

    return (
        <div>
            <h1>Manage Parents</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parents.map(parent => (
                        <tr key={parent._id}>
                            <td>{parent.name}</td>
                            <td>{parent.email}</td>
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

export default ManageParents;

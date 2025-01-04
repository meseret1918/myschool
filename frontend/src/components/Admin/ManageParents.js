import React, { useState, useEffect } from 'react';
import './styles/ManageParents.css'; // Import the CSS file

const ManageParents = () => {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/parents');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setParents(data);
                } else {
                    console.error('Expected an array of parents but got:', data);
                    setParents([]);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching parents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParents();
    }, []);

    if (loading) {
        return <p>Loading parents...</p>;
    }

    if (error) {
        return <p>Error fetching parents: {error}</p>;
    }

    return (
        <div className="manage-parents">
            <h1>Manage Parents</h1>
            {parents.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Add</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parents.map((parent) => (
                            <tr key={parent.parent_id}>
                                <td>{parent.parent_id}</td>
                                <td>{parent.name}</td>
                                <td>{parent.email}</td>
                                <td>{parent.phone}</td>
                                <td>
                                    <button className="add-button">Add</button>
                                </td>
                                <td>
                                    <button className="edit-button">Edit</button>
                                </td>
                                <td>
                                    <button className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No parents available to display.</p>
            )}
        </div>
    );
};

export default ManageParents;

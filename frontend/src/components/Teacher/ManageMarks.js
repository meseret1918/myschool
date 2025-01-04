import React, { useState, useEffect } from 'react';

const ManageMarks = () => {
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const response = await fetch('/api/marks');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setMarks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/marks/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setMarks((prevMarks) => prevMarks.filter(mark => mark._id !== id));
            } else {
                alert('Failed to delete mark');
            }
        } catch (err) {
            alert('An error occurred while deleting the mark');
        }
    };

    const handleEdit = (id) => {
        // Logic for editing marks can be implemented here
        alert(`Edit functionality for mark ID: ${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Manage Marks</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map(mark => (
                        <tr key={mark._id}>
                            <td>{mark.studentName}</td>
                            <td>{mark.subject}</td>
                            <td>{mark.marks}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEdit(mark._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(mark._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageMarks;

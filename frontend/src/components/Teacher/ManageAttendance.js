import React, { useState, useEffect } from 'react';

const ManageAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch('/api/attendance');
                if (!response.ok) {
                    throw new Error('Failed to fetch attendance data');
                }
                const data = await response.json();
                setAttendance(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    const handleEdit = (id) => {
        // Handle edit logic here (e.g., open a modal or navigate to an edit page)
        console.log('Edit record with id:', id);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/attendance/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setAttendance(attendance.filter(record => record._id !== id));
                } else {
                    throw new Error('Error deleting record');
                }
            } catch (err) {
                console.error(err.message);
            }
        }
    };

    if (loading) {
        return <div>Loading attendance data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Manage Attendance</h1>
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.length > 0 ? (
                        attendance.map(record => (
                            <tr key={record._id}>
                                <td>{record.studentName}</td>
                                <td>{record.date}</td>
                                <td>{record.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(record._id)}>Edit</button>
                                    <button onClick={() => handleDelete(record._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No attendance records available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAttendance;

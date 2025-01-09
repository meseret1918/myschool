import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        index_number: '',
        date: '',
        month: '',
        year: '',
        time: '',
        status1: '',
        status2: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null); // Record to be deleted
    const navigate = useNavigate();

    // Fetch attendance data
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/attendance');
                if (!response.ok) {
                    throw new Error(`Failed to fetch attendance data. Status: ${response.status}`);
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

    // Handle edit action
    const handleEdit = (id) => {
        const recordToEdit = attendance.find((record) => record.id === id);
        setFormData({
            ...recordToEdit
        });
        setEditingRecord(id);
    };

    // Handle form field change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle save action
    const handleSave = async () => {
        try {
            const recordExists = attendance.find((record) => record.id === formData.id);
            if (!recordExists) {
                throw new Error('Record not found');
            }

            const response = await fetch(`http://localhost:5000/api/attendance/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update record. Status: ${response.status}`);
            }

            const updatedAttendance = attendance.map((record) =>
                record.id === formData.id ? formData : record
            );
            setAttendance(updatedAttendance);
            setSuccessMessage('Record updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/manage-attendance');
            }, 3000);
            setEditingRecord(null); // Close the edit form after saving
        } catch (err) {
            console.error(err.message);
            alert(`Failed to update record: ${err.message}`);
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        setEditingRecord(null); // Close the edit form
    };

    // Handle delete action
    const handleDelete = (id) => {
        setRecordToDelete(id);
        setIsModalOpen(true); // Show the confirmation modal
    };

    const confirmDelete = async () => {
        if (recordToDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/attendance/${recordToDelete}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setAttendance((prev) => prev.filter((record) => record.id !== recordToDelete));
                    setIsModalOpen(false); // Close the modal after delete
                } else {
                    throw new Error(`Error deleting record. Status: ${response.status}`);
                }
            } catch (err) {
                console.error(err.message);
                alert(`Failed to delete record: ${err.message}`);
            }
        }
    };

    const cancelDelete = () => {
        setIsModalOpen(false); // Close the confirmation modal without deleting
    };

    // Conditional rendering for loading, error, or empty states
    if (loading) {
        return <div>Loading attendance data...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', fontSize: '16px' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Attendance</h1>

            {/* Success Message */}
            {successMessage && (
                <div style={{ color: 'green', fontSize: '18px', marginBottom: '20px' }}>
                    {successMessage}
                </div>
            )}

            {/* Edit Form */}
            {editingRecord && (
                <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                    <h3>Edit Attendance Record</h3>
                    <form>
                        <div style={{ marginBottom: '10px' }}>
                            <label>ID: </label>
                            <input
                                type="text"
                                name="id"
                                value={formData.id}
                                disabled
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Index Number: </label>
                            <input
                                type="text"
                                name="index_number"
                                value={formData.index_number}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Date: </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Month: </label>
                            <input
                                type="text"
                                name="month"
                                value={formData.month}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Year: </label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Time: </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Status 1: </label>
                            <input
                                type="text"
                                name="status1"
                                value={formData.status1}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Status 2: </label>
                            <input
                                type="text"
                                name="status2"
                                value={formData.status2}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                type="button"
                                onClick={handleSave}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    padding: '10px 20px',
                                    margin: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                style={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    padding: '10px 20px',
                                    margin: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Attendance Table */}
            {attendance.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Index Number</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Month</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Year</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Time</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status 1</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status 2</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record) => (
                            <tr key={record.id}>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.id}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.index_number}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.date}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.month}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.year}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.time}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.status1}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{record.status2}</td>
                                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                    <button
                                        onClick={() => handleEdit(record.id)}
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            padding: '5px 10px',
                                            margin: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        style={{
                                            backgroundColor: '#f44336',
                                            color: 'white',
                                            padding: '5px 10px',
                                            margin: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No attendance records found.</div>
            )}

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            maxWidth: '300px',
                            width: '100%',
                        }}
                    >
                        <h3>Are you sure you want to delete this record?</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                onClick={confirmDelete}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={cancelDelete}
                                style={{
                                    backgroundColor: '#f44336',
                                    color: 'white',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAttendance;

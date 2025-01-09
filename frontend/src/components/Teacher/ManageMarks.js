import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageMarks = () => {
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        student_id: '',
        subject: '',
        marks: '',
        exam_type: '',
        date: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Fetch marks data
    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/marks');
                if (!response.ok) {
                    throw new Error(`Failed to fetch marks data. Status: ${response.status}`);
                }
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

    // Handle edit action
    const handleEdit = (id) => {
        const recordToEdit = marks.find((record) => record.id === id);
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
        // Basic validation for required fields
        if (!formData.student_id || !formData.subject || !formData.marks || !formData.exam_type || !formData.date) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            const recordExists = marks.find((record) => record.id === formData.id);

            if (!recordExists) {
                throw new Error('Record not found');
            }

            const response = await fetch(`http://localhost:5000/api/marks/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update record. Status: ${response.status}`);
            }

            const updatedMarks = marks.map((record) =>
                record.id === formData.id ? formData : record
            );
            setMarks(updatedMarks);
            setSuccessMessage('Record updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/ManageMarks');
            }, 3000); // Redirect after 3 seconds
            setEditingRecord(null);
        } catch (err) {
            console.error(err.message);
            alert(`Failed to update record: ${err.message}`);
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        setEditingRecord(null);
    };

    // Handle delete action
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/marks/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setMarks((prev) => prev.filter((record) => record.id !== id));
                } else {
                    throw new Error(`Error deleting record. Status: ${response.status}`);
                }
            } catch (err) {
                console.error(err.message);
                alert(`Failed to delete record: ${err.message}`);
            }
        }
    };

    if (loading) {
        return <div>Loading marks data...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', fontSize: '16px' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Marks</h1>

            {successMessage && (
                <div style={{ color: 'green', fontSize: '18px', marginBottom: '20px' }}>
                    {successMessage}
                </div>
            )}

            {editingRecord && (
                <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                    <h3>Edit Marks Record</h3>
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
                            <label>Student ID: </label>
                            <input
                                type="text"
                                name="student_id"
                                value={formData.student_id}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Subject: </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Marks: </label>
                            <input
                                type="number"
                                name="marks"
                                value={formData.marks}
                                onChange={handleInputChange}
                                style={{ padding: '5px', marginLeft: '10px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Exam Type: </label>
                            <input
                                type="text"
                                name="exam_type"
                                value={formData.exam_type}
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

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <hr style={{ flex: 1, marginRight: '10px', border: '1px solid #ccc' }} />
                            <button
                                type="button"
                                onClick={handleSave}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    padding: '10px 20px',
                                    border: 'none',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    margin: '0 10px',
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
                                    border: 'none',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    margin: '0 10px',
                                }}
                            >
                                Cancel
                            </button>
                            <hr style={{ flex: 1, marginLeft: '10px', border: '1px solid #ccc' }} />
                        </div>
                    </form>
                </div>
            )}

            {marks.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Student ID</th>
                            <th>Subject</th>
                            <th>Marks</th>
                            <th>Exam Type</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.student_id}</td>
                                <td>{record.subject}</td>
                                <td>{record.marks}</td>
                                <td>{record.exam_type}</td>
                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(record.id)}>Edit</button>
                                    <button onClick={() => handleDelete(record.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No marks records available.</div>
            )}
        </div>
    );
};

export default ManageMarks;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        subject: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Fetch class data
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/classes');
                if (!response.ok) {
                    throw new Error(`Failed to fetch class data. Status: ${response.status}`);
                }
                const data = await response.json();
                setClasses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    // Handle edit action
    const handleEdit = (id) => {
        const recordToEdit = classes.find((record) => record.id === id);
        setFormData({
            ...recordToEdit,
        });
        setEditingRecord(id);
    };

    // Handle form field change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle save action
    const handleSave = async () => {
        if (editingRecord) {
            // Update existing class
            try {
                const response = await fetch(`http://localhost:5000/api/classes/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(`Failed to update record. Status: ${response.status}`);
                }

                const updatedClasses = classes.map((record) =>
                    record.id === formData.id ? formData : record
                );
                setClasses(updatedClasses);
                setSuccessMessage('Record updated successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/teacher/manage-classes');
                }, 3000); // Redirect after 3 seconds
                setEditingRecord(null); // Close the edit form after saving
            } catch (err) {
                console.error(err.message);
                alert(`Failed to update record: ${err.message}`);
            }
        } else {
            // Add new class
            try {
                const response = await fetch('http://localhost:5000/api/classes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(`Failed to add new record. Status: ${response.status}`);
                }

                const newClass = await response.json();
                setClasses((prev) => [...prev, newClass]);
                setSuccessMessage('New class added successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    setFormData({ id: '', name: '', subject: '' }); // Reset form
                }, 3000); // Reset after 3 seconds
            } catch (err) {
                console.error(err.message);
                alert(`Failed to add new record: ${err.message}`);
            }
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        setEditingRecord(null); // Close the edit form
        setFormData({ id: '', name: '', subject: '' }); // Reset form
    };

    // Handle delete action
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/classes/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setClasses((prev) => prev.filter((record) => record.id !== id));
                } else {
                    throw new Error(`Error deleting record. Status: ${response.status}`);
                }
            } catch (err) {
                console.error(err.message);
                alert(`Failed to delete record: ${err.message}`);
            }
        }
    };

    // Conditional rendering for loading, error, or empty states
    if (loading) {
        return <div>Loading class data...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', fontSize: '16px' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Manage Classes</h1>

            {/* Success Message */}
            {successMessage && (
                <div style={{ color: 'green', fontSize: '18px', marginBottom: '20px' }}>
                    {successMessage}
                </div>
            )}

            {/* Add New Class Button */}
            {!editingRecord && (
                <button
                    onClick={() => setEditingRecord('new')}
                    style={{ ...buttonStyle, backgroundColor: '#008CBA', marginBottom: '20px' }}
                >
                    Add New Class
                </button>
            )}

            {/* Add New Class Form */}
            {editingRecord === 'new' && (
                <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                    <h3>Add New Class</h3>
                    <form>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
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

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <button
                                type="button"
                                onClick={handleSave}
                                style={{ ...buttonStyle, backgroundColor: '#008CBA' }}
                            >
                                Add Class
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                style={{ ...buttonStyle, backgroundColor: '#f44336' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Edit Form */}
            {editingRecord && editingRecord !== 'new' && (
                <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
                    <h3>Edit Class Record</h3>
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
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
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

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <button
                                type="button"
                                onClick={handleSave}
                                style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                style={{ ...buttonStyle, backgroundColor: '#f44336' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Classes Table */}
            {!editingRecord && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.name}</td>
                                <td>{record.subject}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(record.id)}
                                        style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        style={{ ...buttonStyle, backgroundColor: '#f44336' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Button style
const buttonStyle = {
    color: 'white',
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default ManageClasses;

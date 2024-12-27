import React, { useState, useEffect } from 'react';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);  // For tracking the student being edited
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        address: '',
    });

    // Fetch students when the component mounts
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/students');  // API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // Handle student update
    const handleEditClick = (student) => {
        setEditingStudent(student);  // Set the student being edited
        setNewStudent(student);  // Pre-fill the form with current student data
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!newStudent.name || !newStudent.email || !newStudent.phone) {
            setError('Please fill in all required fields');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/students/${editingStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            });

            if (!response.ok) {
                throw new Error('Failed to update student');
            }

            // Update the student in the list
            setStudents((prev) =>
                prev.map((student) =>
                    student.id === editingStudent.id ? { ...student, ...newStudent } : student
                )
            );

            setEditingStudent(null);  // Clear editing mode
            setNewStudent({
                name: '',
                email: '',
                phone: '',
                date_of_birth: '',
                address: '',
            });
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle student delete
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/students/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            // Remove the deleted student from the list
            setStudents((prev) => prev.filter((student) => student.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    // Display loading, error, or student data
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Manage Students</h1>

            {/* Form for editing or adding student */}
            <div>
                <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
                <form onSubmit={editingStudent ? handleUpdate : handleAdd}>
                    <input
                        type="text"
                        name="name"
                        value={newStudent.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={newStudent.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <input
                        type="phone"
                        name="phone"
                        value={newStudent.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                    />
                    <input
                        type="date"
                        name="date_of_birth"
                        value={newStudent.date_of_birth}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="address"
                        value={newStudent.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                    />
                    <button type="submit">{editingStudent ? 'Update' : 'Add'}</button>
                </form>
            </div>

            {/* Student List */}
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                                <td>{student.address}</td>
                                <td>
                                    <button onClick={() => handleEditClick(student)}>Edit</button>
                                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No students found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageStudents;

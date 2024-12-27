import React, { useState, useEffect } from 'react';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch('http://localhost:5000/api/students');

            const data = await response.json();
            setStudents(data);
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <h1>Manage Students</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Parent ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                            <td>{student.address}</td>
                            <td>{student.parent_id ? student.parent_id : 'N/A'}</td>
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

export default ManageStudents;

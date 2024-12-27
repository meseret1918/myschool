import React, { useState, useEffect } from 'react';

const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        // Fetch the list of teachers from the API
        const fetchTeachers = async () => {
            const response = await fetch('/api/teachers');
            const data = await response.json();
            setTeachers(data);
        };

        fetchTeachers();
    }, []);

    return (
        <div>
            <h1>Manage Teachers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
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

export default ManageTeachers;

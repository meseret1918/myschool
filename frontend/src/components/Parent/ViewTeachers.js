import React, { useState, useEffect } from 'react';

const ViewTeachers = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            const response = await fetch('/api/teachers');
            const data = await response.json();
            setTeachers(data);
        };

        fetchTeachers();
    }, []);

    return (
        <div>
            <h1>View Teachers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTeachers;

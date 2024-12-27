import React, { useState, useEffect } from 'react';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await fetch('/api/classes');
            const data = await response.json();
            setClasses(data);
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <h1>Manage Classes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map(cls => (
                        <tr key={cls._id}>
                            <td>{cls.name}</td>
                            <td>{cls.subject}</td>
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

export default ManageClasses;

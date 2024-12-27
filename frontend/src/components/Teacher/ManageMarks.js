import React, { useState, useEffect } from 'react';

const ManageMarks = () => {
    const [marks, setMarks] = useState([]);

    useEffect(() => {
        const fetchMarks = async () => {
            const response = await fetch('/api/marks');
            const data = await response.json();
            setMarks(data);
        };

        fetchMarks();
    }, []);

    return (
        <div>
            <h1>Manage Marks</h1>
            <table>
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

export default ManageMarks;

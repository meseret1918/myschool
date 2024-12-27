import React, { useState, useEffect } from 'react';

const ManageExams = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchExams = async () => {
            const response = await fetch('/api/exams');
            const data = await response.json();
            setExams(data);
        };

        fetchExams();
    }, []);

    return (
        <div>
            <h1>Manage Exams</h1>
            <table>
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map(exam => (
                        <tr key={exam._id}>
                            <td>{exam.name}</td>
                            <td>{exam.date}</td>
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

export default ManageExams;

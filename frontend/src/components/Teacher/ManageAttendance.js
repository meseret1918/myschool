import React, { useState, useEffect } from 'react';

const ManageAttendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            const response = await fetch('/api/attendance');
            const data = await response.json();
            setAttendance(data);
        };

        fetchAttendance();
    }, []);

    return (
        <div>
            <h1>Manage Attendance</h1>
            <table>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map(record => (
                        <tr key={record._id}>
                            <td>{record.studentName}</td>
                            <td>{record.date}</td>
                            <td>{record.status}</td>
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

export default ManageAttendance;

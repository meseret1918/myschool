import React, { useState, useEffect } from 'react';

const ViewAttendance = () => {
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
            <h1>View Attendance</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map(record => (
                        <tr key={record._id}>
                            <td>{record.date}</td>
                            <td>{record.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAttendance;

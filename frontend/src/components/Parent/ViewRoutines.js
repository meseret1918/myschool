import React, { useState, useEffect } from 'react';

const ViewRoutines = () => {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const fetchRoutines = async () => {
            const response = await fetch('/api/routines');
            const data = await response.json();
            setRoutines(data);
        };

        fetchRoutines();
    }, []);

    return (
        <div>
            <h1>View Routines</h1>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Class</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {routines.map(routine => (
                        <tr key={routine._id}>
                            <td>{routine.day}</td>
                            <td>{routine.className}</td>
                            <td>{routine.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewRoutines;

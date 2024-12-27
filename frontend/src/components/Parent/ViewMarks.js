import React, { useState, useEffect } from 'react';

const ViewMarks = () => {
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
            <h1>View Marks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {marks.map(mark => (
                        <tr key={mark._id}>
                            <td>{mark.subject}</td>
                            <td>{mark.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewMarks;

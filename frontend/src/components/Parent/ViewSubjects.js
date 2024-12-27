import React, { useState, useEffect } from 'react';

const ViewSubjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await fetch('/api/subjects');
            const data = await response.json();
            setSubjects(data);
        };

        fetchSubjects();
    }, []);

    return (
        <div>
            <h1>View Subjects</h1>
            <ul>
                {subjects.map(subject => (
                    <li key={subject._id}>{subject.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewSubjects;

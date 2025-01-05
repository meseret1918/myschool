import React, { useState, useEffect } from 'react';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('/api/teachers');  // Ensure this path matches the backend route
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched teachers:', data); // Debugging: log fetched data
        setTeachers(data);  // Set the teachers data in the state
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      }
    };

    fetchTeachers();
  }, []);  // Empty dependency array ensures this runs once on component mount

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#007ACC',
    fontWeight: 'bold',
  };

  const noDataStyle = {
    textAlign: 'center',
    padding: '20px',
    fontSize: '16px',
    color: '#888',
  };

  return (
    <div>
      <h1>View Teachers</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Date of Birth</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Contact Number</th>
            <th style={thStyle}>Qualification</th>
            <th style={thStyle}>Experience (Years)</th>
            <th style={thStyle}>Hire Date</th>
            <th style={thStyle}>Subjects Taught</th>
            <th style={thStyle}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher.TeacherID}>
                <td style={thTdStyle}>{`${teacher.FirstName} ${teacher.LastName}`}</td>
                <td style={thTdStyle}>{teacher.Email}</td>
                <td style={thTdStyle}>{teacher.DateOfBirth}</td>
                <td style={thTdStyle}>{teacher.Gender}</td>
                <td style={thTdStyle}>{teacher.ContactNumber}</td>
                <td style={thTdStyle}>{teacher.Qualification}</td>
                <td style={thTdStyle}>{teacher.ExperienceYears}</td>
                <td style={thTdStyle}>{teacher.HireDate}</td>
                <td style={thTdStyle}>{teacher.SubjectsTaught}</td>
                <td style={thTdStyle}>{teacher.Salary}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={noDataStyle}>
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeachers;

import React, { useState, useEffect } from 'react';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('/api/teachers');  // Ensure this path is correct and pointing to the backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTeachers(data); // Set the teachers data in the state
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      }
    };

    fetchTeachers();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div>
      <h1>View Teachers</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Qualification</th>
            <th>Experience (Years)</th>
            <th>Hire Date</th>
            <th>Subjects Taught</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <tr key={teacher.TeacherID}>
                <td>{`${teacher.FirstName} ${teacher.LastName}`}</td>
                <td>{teacher.Email}</td>
                <td>{teacher.DateOfBirth}</td>
                <td>{teacher.Gender}</td>
                <td>{teacher.ContactNumber}</td>
                <td>{teacher.Qualification}</td>
                <td>{teacher.ExperienceYears}</td>
                <td>{teacher.HireDate}</td>
                <td>{teacher.SubjectsTaught}</td>
                <td>{teacher.Salary}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>
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

import React, { useState, useEffect } from 'react';
import './teacher.css'; // Custom styles

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Replace with your backend API URL
        const response = await fetch('http://localhost:5000/api/students');

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch students. HTTP status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>View Students</h1>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Parent ID</th>
              <th>Class Name</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                  <td>{student.address}</td>
                  <td>{student.parent_id || 'N/A'}</td>
                  <td>{student.class_name}</td>
                  <td>{new Date(student.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudents;

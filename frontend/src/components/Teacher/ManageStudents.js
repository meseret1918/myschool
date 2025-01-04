import React, { useState, useEffect } from 'react';
import './teacher.css'; // Custom styles

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for capturing error messages

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students`);

        // Check if the response is not OK (non-2xx status)
        if (!response.ok) {
          throw new Error(`Failed to fetch students. HTTP status: ${response.status}`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students: ", err);
        setError(err.message); // Update state with error message
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/students/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setStudents(students.filter(student => student.id !== id));
          alert('Student deleted successfully');
        } else {
          alert('Failed to delete student');
        }
      } catch (err) {
        console.error("Error deleting student: ", err);
        alert('Error deleting student');
      }
    }
  };

  return (
    <div>
      <h1>Manage Students</h1>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p> // Display error message if there's an error
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Parent ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{new Date(student.dob).toLocaleDateString()}</td>
                  <td>{student.address}</td>
                  <td>{student.parent_id || 'N/A'}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageStudents;

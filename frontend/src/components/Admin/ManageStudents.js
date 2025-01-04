import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './styles/ManageStudents.css'; // Import the CSS file

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        if (!response.ok) {
          throw new Error('Error fetching students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle Add button click
  const handleAddClick = () => {
    navigate('/admin/add-student'); // Navigate to AddStudentForm page
  };

  return (
    <div className="manage-students-container">
      <h2>Manage Students</h2>
      <h3>List of Students</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Parent ID</th>
              <th>Created At</th>
              <th>Add</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.class_name}</td>
                <td>{student.parent_id || 'N/A'}</td>
                <td>{new Date(student.created_at).toLocaleString()}</td>
                <td>
                  <button className="add-button" onClick={handleAddClick}>Add</button>
                </td>
                <td>
                  <button className="edit-button">Edit</button>
                </td>
                <td>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageStudents;

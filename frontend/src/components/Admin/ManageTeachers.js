import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './styles/ManageTeachers.css'; // Importing external CSS file

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the teacher data on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/teachers')
      .then((response) => {
        console.log('Response status:', response.status); // Debugging log
        if (!response.ok) {
          throw new Error(`Failed to fetch teachers: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setTeachers(data))
      .catch((error) => {
        setError('Error fetching teachers. Please try again later.');
        console.error('Error fetching teachers:', error);
      });
  }, []);

  // Handle Delete Teacher
  const handleDeleteTeacher = (id) => {
    fetch(`http://localhost:5000/api/teachers/${id}`, { method: 'DELETE' })
      .then((response) => {
        console.log('Delete response status:', response.status); // Debugging log
        if (!response.ok) {
          throw new Error(`Failed to delete teacher: ${response.statusText}`);
        }
        setTeachers((prev) => prev.filter((teacher) => teacher.TeacherID !== id));
      })
      .catch((error) => {
        setError('Error deleting teacher. Please try again later.');
        console.error('Error deleting teacher:', error);
      });
  };

  return (
    <div className="manage-teachers">
      <div className="header">
        <Link to="/admin/add-teacher" className="btn add-btn">Add New Teacher</Link>
        <Link to="/admin" className="back-to-dashboard">Back to Dashboard</Link>
      </div>
      <h2 className="title">Manage Teachers</h2>
      {error && <p className="error">{error}</p>}

      <h3>Teacher List</h3>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Qualification</th>
            <th>Experience (Years)</th>
            <th>Hire Date</th>
            <th>Subjects Taught</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher.TeacherID}>
              <td>{index + 1}</td>
              <td>{teacher.FirstName}</td>
              <td>{teacher.LastName}</td>
              <td>{teacher.DateOfBirth}</td>
              <td>{teacher.Gender}</td>
              <td>{teacher.ContactNumber}</td>
              <td>{teacher.Email}</td>
              <td>{teacher.Qualification}</td>
              <td>{teacher.ExperienceYears}</td>
              <td>{teacher.HireDate}</td>
              <td>{teacher.SubjectsTaught}</td>
              <td>{teacher.Salary}</td>
              <td>
                <Link to={`/admin/edit-teacher/${teacher.TeacherID}`} className="btn update-btn">Edit</Link>
              </td>
              <td>
                <button onClick={() => handleDeleteTeacher(teacher.TeacherID)} className="btn delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTeachers;

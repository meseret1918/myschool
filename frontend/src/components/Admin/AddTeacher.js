import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './styles/AddTeacher.css'; // Importing external CSS file

const AddTeacher = () => {
  const [newTeacher, setNewTeacher] = useState({
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    Gender: '',
    ContactNumber: '',
    Email: '',
    Qualification: '',
    ExperienceYears: '',
    HireDate: '',
    SubjectsTaught: '',
    Salary: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add Teacher
  const handleAddTeacher = () => {
    fetch('http://localhost:5000/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeacher),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate('/admin/manage-teachers'); // Redirect to ManageTeachers after adding
      })
      .catch((error) => {
        setError('Error adding teacher. Please try again later.');
        console.error('Error adding teacher:', error);
      });
  };

  return (
    <div className="add-teacher">
      <h2>Add New Teacher</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-container">
        {Object.keys(newTeacher).map((key) => (
          <input
            key={key}
            type={key === 'DateOfBirth' || key === 'HireDate' ? 'date' : 'text'}
            name={key}
            value={newTeacher[key]}
            placeholder={key}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <button onClick={handleAddTeacher} className="btn add-btn">Add Teacher</button>
      <Link to="/admin/manage-teachers" className="back-to-dashboard">Back to Manage Teachers</Link>
    </div>
  );
};

export default AddTeacher;

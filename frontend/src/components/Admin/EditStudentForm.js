import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: '',
    email: '',
    class_name: '',
    parent_id: '',
    phone: '',
    date_of_birth: '',
    address: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching student');
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(student),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Error updating student');
      }

      navigate('/admin/manage-students');
    } catch (error) {
      setError(error.message);
    }
  };

  const formStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '30px'  // Added margin to create space between footer and form
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={formStyle}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="class_name">Class</label>
          <input
            type="text"
            id="class_name"
            name="class_name"
            value={student.class_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="parent_id">Parent ID</label>
          <input
            type="number"
            id="parent_id"
            name="parent_id"
            value={student.parent_id || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={student.phone || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={student.date_of_birth || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={student.address || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>Update Student</button>
      </form>
    </div>
  );
};

export default EditStudentForm;

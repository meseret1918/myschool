import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTeacher = () => {
  const { id } = useParams(); // Extract the teacher ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [teacher, setTeacher] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    Age: '', 
    ContactNumber: '',
    Email: '',
    Qualification: '',
    ExperienceYears: '',
    HireDate: '',
    SubjectsTaught: '',
    Salary: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Fetch the teacher data on component mount
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/teachers/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError('Error fetching teacher. Please try again later.');
        console.error('Error fetching teacher:', err);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTeacher();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update Teacher
  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Get the response text for detailed error
        throw new Error(`Failed to update: ${response.statusText}. Details: ${errorDetails}`);
      }

      setSuccessMessage('Teacher successfully updated!');
      setTimeout(() => {
        navigate('/admin/manage-teachers');
      }, 2000);
    } catch (err) {
      setError(`Error updating teacher: ${err.message}`); // Show detailed error message
      console.error('Error updating teacher:', err);
    }
  };

  if (loading) return <p>Loading teacher data...</p>;
  if (error) return <p style={{ color: 'red', fontSize: '16px' }}>{error}</p>;

  const formStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '30px',
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

  const successStyle = {
    color: 'green',
    fontSize: '18px',
    marginBottom: '20px',
  };

  return (
    <div style={formStyle}>
      <h2>Edit Teacher</h2>

      {successMessage && <p style={successStyle}>{successMessage}</p>} {/* Success message */}

      <form onSubmit={handleUpdateTeacher}>
        {Object.keys(teacher).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={
                key === 'Age' || key === 'ExperienceYears' || key === 'Salary'
                  ? 'number'
                  : key === 'HireDate'
                  ? 'date'
                  : 'text'
              }
              id={key}
              name={key}
              value={teacher[key]}
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
          </div>
        ))}
        <button type="submit" style={buttonStyle}>Update Teacher</button>
      </form>
    </div>
  );
};

export default EditTeacher;

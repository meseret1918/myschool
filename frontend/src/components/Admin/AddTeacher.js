import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Validation
    const requiredFields = [
      'FirstName',
      'LastName',
      'Gender',
      'Age',
      'ContactNumber',
      'Email',
      'Qualification',
      'ExperienceYears',
      'HireDate',
      'SubjectsTaught',
      'Salary',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage(`${field} is required.`);
        setLoading(false);
        return;
      }
    }

    if (isNaN(formData.Age) || formData.Age <= 0) {
      setErrorMessage('Age must be a valid positive number.');
      setLoading(false);
      return;
    }

    if (isNaN(formData.Salary) || formData.Salary <= 0) {
      setErrorMessage('Salary must be a valid positive number.');
      setLoading(false);
      return;
    }

    if (isNaN(formData.ExperienceYears) || formData.ExperienceYears < 0) {
      setErrorMessage('Experience Years must be a valid number.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse response JSON

      if (!response.ok) {
        console.error('Error response from server:', data);
        setErrorMessage(data.message || 'Error adding teacher. Please try again later.');
        setLoading(false);
        return;
      }

      setSuccessMessage('Teacher added successfully!');
      setFormData({
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

      setTimeout(() => navigate('/admin/manage-teachers'), 2000);
    } catch (error) {
      console.error('Caught error:', error);
      setErrorMessage(error.message || 'Error adding teacher. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        marginBottom: '50px',
      }}
    >
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Teacher</h3>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      {Object.keys(formData).map((field) => (
        <input
          key={field}
          type={
            field === 'Age' || field === 'ExperienceYears' || field === 'Salary'
              ? 'number'
              : field === 'HireDate'
              ? 'date'
              : 'text'
          }
          name={field}
          placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
          value={formData[field]}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      ))}

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Add Teacher'}
      </button>
    </div>
  );
};

export default AddTeacher;

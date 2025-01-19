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
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({
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

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Check required fields
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
        valid = false;
      }
    });

    // Validate numbers
    if (isNaN(formData.Age) || formData.Age <= 0) {
      newErrors.Age = 'Age must be a valid positive number';
      valid = false;
    }
    if (isNaN(formData.Salary) || formData.Salary <= 0) {
      newErrors.Salary = 'Salary must be a valid positive number';
      valid = false;
    }
    if (isNaN(formData.ExperienceYears) || formData.ExperienceYears < 0) {
      newErrors.ExperienceYears = 'Experience Years must be a valid number';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        setError(errorDetails.message || 'Error adding teacher. Please try again later.');
        return;
      }

      const addedTeacher = await response.json();
      setSuccessMessage(`Teacher ${addedTeacher.FirstName} ${addedTeacher.LastName} added successfully!`);
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
      setFormErrors({
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
      setError(error.message || 'Error adding teacher. Please try again later.');
    }
  };

  const renderError = (field) => {
    return formErrors[field] ? <p style={{ color: 'red' }}>{formErrors[field]}</p> : null;
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '50px' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Teacher</h3>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      {Object.keys(formData).map((field) => (
        <div key={field}>
          <input
            type={field === 'Age' || field === 'ExperienceYears' || field === 'Salary' ? 'number' : field === 'HireDate' ? 'date' : 'text'}
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError(field)}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '48%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Add Teacher
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/manage-teachers')}
          style={{
            width: '48%',
            padding: '12px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTeacher;

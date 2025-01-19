import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Box)`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 48%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: white;
`;

const AddParentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
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

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Validate phone number format (10-14 digits)
    if (formData.phone && !/^\d{10,14}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be between 10 and 14 digits';
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
      const response = await fetch('http://localhost:5000/api/parents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        setError(errorDetails.message || 'Error adding parent. Please try again later.');
        return;
      }

      const addedParent = await response.json();
      setSuccessMessage(`Parent ${addedParent.name} added successfully!`);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
      });
      setFormErrors({
        name: '',
        phone: '',
        email: '',
        address: '',
      });
      setTimeout(() => navigate('/admin/manage-parents'), 2000);
    } catch (error) {
      setError(error.message || 'Error adding parent. Please try again later.');
    }
  };

  const renderError = (field) => {
    return formErrors[field] ? <p style={{ color: 'red' }}>{formErrors[field]}</p> : null;
  };

  return (
    <FormContainer>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Parent</h3>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      {Object.keys(formData).map((field) => (
        <div key={field}>
          <Input
            type={field === 'phone' ? 'text' : field === 'email' ? 'email' : 'text'}
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
          {renderError(field)}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#007bff',
          }}
        >
          Add Parent
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/admin/manage-parents')}
          style={{
            backgroundColor: '#f44336',
          }}
        >
          Cancel
        </Button>
      </div>
    </FormContainer>
  );
};

export default AddParentForm;

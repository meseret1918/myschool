import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddParentForm = () => {
  const [newParent, setNewParent] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [placeholders, setPlaceholders] = useState({
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const navigate = useNavigate();

  // Check for required fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Check name
    if (!newParent.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Check email format
    if (!newParent.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(newParent.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Check phone number validity (only digits, 10-14 characters)
    if (!newParent.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10,14}$/.test(newParent.phone)) {
      newErrors.phone = 'Phone number must be between 10 and 14 digits';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  // Handle adding a parent
  const handleAddParent = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/parents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParent),
      });

      if (!response.ok) {
        const errorDetails = await response.json(); // Parse error details
        Object.keys(errorDetails).forEach((key) => {
          setPlaceholders((prev) => ({ ...prev, [key]: errorDetails[key] }));
        });
        throw new Error('Validation errors occurred.');
      }

      const addedParent = await response.json();
      setSuccessMessage(`Parent ${addedParent.name} added successfully!`);
      setNewParent({
        name: '',
        phone: '',
        email: '',
        address: '',
      }); // Reset form fields after successful addition
      setPlaceholders({
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
      });
      setFormErrors({
        name: '',
        phone: '',
        email: '',
        address: '',
      });
      navigate('/admin/manage-parents');
    } catch (error) {
      setError(error.message);
    }
  };

  const renderError = (field) => {
    return formErrors[field] ? <p style={{ color: 'red' }}>{formErrors[field]}</p> : null;
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '50px' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Parent</h3>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <input
        type="text"
        placeholder={placeholders.name}
        value={newParent.name}
        onChange={(e) => setNewParent({ ...newParent, name: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('name')}

      <input
        type="email"
        placeholder={placeholders.email}
        value={newParent.email}
        onChange={(e) => setNewParent({ ...newParent, email: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('email')}

      <input
        type="text"
        placeholder={placeholders.phone}
        value={newParent.phone}
        onChange={(e) => setNewParent({ ...newParent, phone: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('phone')}

      <input
        type="text"
        placeholder={placeholders.address}
        value={newParent.address}
        onChange={(e) => setNewParent({ ...newParent, address: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <button
        onClick={handleAddParent}
        style={{
          width: '100%',
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
        Add Parent
      </button>
    </div>
  );
};

export default AddParentForm;

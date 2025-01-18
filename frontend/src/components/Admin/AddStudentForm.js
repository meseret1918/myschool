import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    class_name: '',
    parent_id: '',
    phone: '',
    date_of_birth: '',
    address: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    class_name: '',
    parent_id: '',
    phone: '',
    date_of_birth: '',
    address: '',
  });

  const navigate = useNavigate();

  // Check for required fields and apply the new validation rules
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Check name
    if (!newStudent.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Check email format
    if (!newStudent.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(newStudent.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Check class name
    if (!newStudent.class_name) {
      newErrors.class_name = 'Class name is required';
      valid = false;
    }

    // Check parent ID (minimum length 1)
    if (!newStudent.parent_id) {
      newErrors.parent_id = 'Parent ID is required';
      valid = false;
    } else if (newStudent.parent_id.length < 1) {
      newErrors.parent_id = 'Parent ID must be at least 1 character';
      valid = false;
    }

    // Check phone number validity (minimum 10 digits)
    if (!newStudent.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (newStudent.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
      valid = false;
    } else if (!/^\d{10,14}$/.test(newStudent.phone)) {
      newErrors.phone = 'Phone number must be between 10 and 14 digits and contain only numbers';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  // Handle adding a student
  const handleAddStudent = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorDetails = await response.json(); // Parse error details
        setError('Validation errors occurred.');
        throw new Error('Validation errors occurred.');
      }

      const addedStudent = await response.json();
      setSuccessMessage(`Student ${addedStudent.name} added successfully!`);
      setNewStudent({
        name: '',
        email: '',
        class_name: '',
        parent_id: '',
        phone: '',
        date_of_birth: '',
        address: '',
      }); // Reset form fields after successful addition
      setFormErrors({
        name: '',
        email: '',
        class_name: '',
        parent_id: '',
        phone: '',
        date_of_birth: '',
        address: '',
      });
      navigate('/admin/manage-students');
    } catch (error) {
      setError(error.message);
    }
  };

  const renderError = (field) => {
    return formErrors[field] ? <p style={{ color: 'red' }}>{formErrors[field]}</p> : null;
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '50px' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Student</h3>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <input
        type="text"
        placeholder="Name"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('name')}

      <input
        type="email"
        placeholder="Email"
        value={newStudent.email}
        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('email')}

      <input
        type="text"
        placeholder="Class"
        value={newStudent.class_name}
        onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('class_name')}

      <input
        type="text"
        placeholder="Parent ID"
        value={newStudent.parent_id}
        onChange={(e) => setNewStudent({ ...newStudent, parent_id: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('parent_id')}

      <input
        type="text"
        placeholder="Phone"
        value={newStudent.phone}
        onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {renderError('phone')}

      <input
        type="date"
        placeholder="Date of Birth"
        value={newStudent.date_of_birth}
        onChange={(e) => setNewStudent({ ...newStudent, date_of_birth: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <input
        type="text"
        placeholder="Address"
        value={newStudent.address}
        onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleAddStudent}
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
          Add Student
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/manage-students')}
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

export default AddStudentForm;

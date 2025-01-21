import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddFee = () => {
  const [formData, setFormData] = useState({
    index_number: '',
    year: '',
    month: '',
    date: '',
    paid: '',
    _status: '',
    student_status: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({
    index_number: '',
    year: '',
    month: '',
    date: '',
    paid: '',
    _status: '',
    student_status: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Set default values or any initialization if needed
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
        valid = false;
      }
    });

    setFormErrors(newErrors);
    return valid;
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/fee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        setError(errorDetails.message || 'Error adding fee. Please try again later.');
        return;
      }

      const addedFee = await response.json();
      setSuccessMessage(`Fee for index number ${addedFee.index_number} added successfully!`);
      setFormData({
        index_number: '',
        year: '',
        month: '',
        date: '',
        paid: '',
        _status: '',
        student_status: ''
      });
      setFormErrors({
        index_number: '',
        year: '',
        month: '',
        date: '',
        paid: '',
        _status: '',
        student_status: ''
      });
      setTimeout(() => navigate('/admin/manage-fee'), 2000);
    } catch (error) {
      setError(error.message || 'Error adding fee. Please try again later.');
    }
  };

  // Render error message for form fields
  const renderError = (field) => {
    return formErrors[field] ? <p style={{ color: 'red' }}>{formErrors[field]}</p> : null;
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '50px' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Fee</h3>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <div>
        <div>
          <label>Index Number</label>
          <input
            type="text"
            name="index_number"
            placeholder="Index Number"
            value={formData.index_number}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('index_number')}
        </div>

        <div>
          <label>Year</label>
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('year')}
        </div>

        <div>
          <label>Month</label>
          <input
            type="text"
            name="month"
            placeholder="Month"
            value={formData.month}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('month')}
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('date')}
        </div>

        <div>
          <label>Paid</label>
          <input
            type="number"
            name="paid"
            placeholder="Amount Paid"
            value={formData.paid}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('paid')}
        </div>

        <div>
          <label>Status</label>
          <input
            type="text"
            name="_status"
            placeholder="Status"
            value={formData._status}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('_status')}
        </div>

        <div>
          <label>Student Status</label>
          <input
            type="text"
            name="student_status"
            placeholder="Student Status"
            value={formData.student_status}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('student_status')}
        </div>

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
            Add Fee
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/manage-fee')}
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
    </div>
  );
};

export default AddFee;

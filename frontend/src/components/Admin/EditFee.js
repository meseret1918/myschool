import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import styled from 'styled-components';

const EditFee = () => {
  const { id } = useParams(); // Get the fee ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
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
  const [loading, setLoading] = useState(true); // Add loading state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Fetch fee data on component mount
  useEffect(() => {
    const fetchFee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fee/${id}`);
        if (!response.ok) {
          const errorDetails = await response.text(); // Get the error message from the response
          console.error('Error fetching fee:', errorDetails);
          setError(`Error fetching fee: ${errorDetails}`);
        } else {
          const data = await response.json();
          setFormData(data);
        }
      } catch (err) {
        setError('Error fetching fee. Please try again later.');
        console.error('Error fetching fee:', err);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchFee();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update Fee
  const handleUpdateFee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/fee/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Get response text for detailed error
        throw new Error(`Failed to update: ${response.statusText}. Details: ${errorDetails}`);
      }

      setSuccessMessage('Fee successfully updated!');
      setTimeout(() => {
        navigate('/admin/manage-fee');
      }, 2000);
    } catch (err) {
      setError(`Error updating fee: ${err.message}`); // Show detailed error message
      console.error('Error updating fee:', err);
    }
  };

  if (loading) return <p>Loading fee data...</p>;
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

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Space between buttons
    gap: '10px', // Optional gap between buttons
    marginTop: '20px',
  };

  return (
    <div style={formStyle}>
      <h2>Edit Fee</h2>

      {successMessage && <p style={successStyle}>{successMessage}</p>} {/* Success message */}

      <form onSubmit={handleUpdateFee}>
        <div className="form-group">
          <label htmlFor="index_number">Index Number</label>
          <input
            type="text"
            id="index_number"
            name="index_number"
            value={formData.index_number}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="month">Month</label>
          <input
            type="text"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="paid">Amount Paid</label>
          <input
            type="number"
            id="paid"
            name="paid"
            value={formData.paid}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="_status">Status</label>
          <input
            type="text"
            id="_status"
            name="_status"
            value={formData._status}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="student_status">Student Status</label>
          <input
            type="text"
            id="student_status"
            name="student_status"
            value={formData.student_status}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={buttonContainerStyle}>
          <button type="submit" style={buttonStyle}>Update Fee</button>
          <button
            type="button"
            onClick={() => navigate('/admin/manage-fee')}
            style={{ ...buttonStyle, backgroundColor: '#f44336' }} // Red for Cancel button
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFee;

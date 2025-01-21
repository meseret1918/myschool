import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import styled from 'styled-components';

const EditTimetable = () => {
  const { id } = useParams(); // Get the timetable ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    day: '',
    start_time: '',
    end_time: '',
    subject: '',
    teacher_id: '',
    class_id: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [successMessage, setSuccessMessage] = useState(null); // Success message state

  // Fetch timetable data on component mount
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/timetable/${id}`);
        if (!response.ok) {
          const errorDetails = await response.text(); // Get the error message from the response
          console.error('Error fetching timetable:', errorDetails);
          setError(`Error fetching timetable: ${errorDetails}`);
        } else {
          const data = await response.json();
          setFormData(data);
        }
      } catch (err) {
        setError('Error fetching timetable. Please try again later.');
        console.error('Error fetching timetable:', err);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTimetable();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update Timetable
  const handleUpdateTimetable = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/timetable/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Get response text for detailed error
        throw new Error(`Failed to update: ${response.statusText}. Details: ${errorDetails}`);
      }

      setSuccessMessage('Timetable successfully updated!');
      setTimeout(() => {
        navigate('/admin/manage-timetable');
      }, 2000);
    } catch (err) {
      setError(`Error updating timetable: ${err.message}`); // Show detailed error message
      console.error('Error updating timetable:', err);
    }
  };

  if (loading) return <p>Loading timetable data...</p>;
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
      <h2>Edit Timetable</h2>

      {successMessage && <p style={successStyle}>{successMessage}</p>} {/* Success message */}

      <form onSubmit={handleUpdateTimetable}>
        <div className="form-group">
          <label htmlFor="day">Day</label>
          <input
            type="text"
            id="day"
            name="day"
            value={formData.day}
            placeholder="Day"
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="start_time">Start Time</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_time">End Time</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            placeholder="Subject"
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="teacher_id">Teacher ID</label>
          <input
            type="number"
            id="teacher_id"
            name="teacher_id"
            value={formData.teacher_id}
            placeholder="Teacher ID"
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="class_id">Class ID</label>
          <input
            type="number"
            id="class_id"
            name="class_id"
            value={formData.class_id}
            placeholder="Class ID"
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={buttonContainerStyle}>
          <button type="submit" style={buttonStyle}>Update Timetable</button>
          <button
            type="button"
            onClick={() => navigate('/admin/manage-timetable')}
            style={{ ...buttonStyle, backgroundColor: '#f44336' }} // Red for Cancel button
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTimetable;

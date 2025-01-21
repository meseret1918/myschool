import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTimetable = () => {
  const [formData, setFormData] = useState({
    day: '',
    start_time: '',
    end_time: '',
    subject: '',
    teacher_id: '',
    class_id: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({
    day: '',
    start_time: '',
    end_time: '',
    subject: '',
    teacher_id: '',
    class_id: '',
  });

  const navigate = useNavigate();

  // Set default time for start_time and end_time
  const setDefaultTime = (start = '08:00', end = '09:00') => {
    setFormData({
      ...formData,
      start_time: start,
      end_time: end,
    });
  };

  useEffect(() => {
    // Set default time when component is loaded
    setDefaultTime();
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
      const response = await fetch('http://localhost:5000/api/timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        setError(errorDetails.message || 'Error adding timetable. Please try again later.');
        return;
      }

      const addedTimetable = await response.json();
      setSuccessMessage(`Timetable for ${addedTimetable.subject} added successfully!`);
      setFormData({
        day: '',
        start_time: '',
        end_time: '',
        subject: '',
        teacher_id: '',
        class_id: '',
      });
      setFormErrors({
        day: '',
        start_time: '',
        end_time: '',
        subject: '',
        teacher_id: '',
        class_id: '',
      });
      setTimeout(() => navigate('/admin/manage-timetable'), 2000);
    } catch (error) {
      setError(error.message || 'Error adding timetable. Please try again later.');
    }
  };

  // Render error message for form fields
  const renderError = (field) => {
    return formErrors[field] ? <p style={{ color: 'red' }}>{formErrors[field]}</p> : null;
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '50px' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Timetable</h3>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <div>
        <div>
          <label>Day</label>
          <select name="day" value={formData.day} onChange={handleChange} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          {renderError('day')}
        </div>

        <div>
          <label>Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('start_time')}
        </div>

        <div>
          <label>End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('end_time')}
        </div>

        <div>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {renderError('subject')}
        </div>

        <div>
          <label>Teacher ID</label>
          <input
            type="number"
            name="teacher_id"
            placeholder="Teacher ID"
            value={formData.teacher_id}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          {renderError('teacher_id')}
        </div>

        <div>
          <label>Class ID</label>
          <input
            type="number"
            name="class_id"
            placeholder="Class ID"
            value={formData.class_id}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          {renderError('class_id')}
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
            Add Timetable
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/manage-timetable')}
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

export default AddTimetable;

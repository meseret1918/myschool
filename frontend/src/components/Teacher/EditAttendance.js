import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Box)`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 30px;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
`;

const EditAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState({
    student_id: '',
    subject: '',
    status: '', // Present, Absent, or any status you define
    date: '',
  });
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/attendance/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching attendance details');
        }
        const data = await response.json();
        setAttendance(data); // Assuming data contains student_id, subject, status, and date
      } catch (error) {
        setError(error.message || 'Failed to load attendance details');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/attendance/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendance),
      });

      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Attendance updated successfully!' });
        navigate('/teacher/manage-attendance'); // Redirect to attendance management page after update
      } else {
        setFlashMessage({ type: 'error', message: 'Error updating attendance' });
      }
    } catch (error) {
      setFlashMessage({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFlashMessage(null), 3000);
    }
  };

  return (
    <div>
      <Box my={2} textAlign="center">
        <h2>Edit Attendance</h2>
      </Box>

      {flashMessage && (
        <Box my={2} textAlign="center">
          <Box
            sx={{
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: flashMessage.type === 'error' ? '#f8d7da' : '#d4edda',
              color: flashMessage.type === 'error' ? '#721c24' : '#155724',
              border: `1px solid ${flashMessage.type === 'error' ? '#f5c6cb' : '#c3e6cb'}`,
            }}
          >
            {flashMessage.message}
          </Box>
        </Box>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Student ID"
                name="student_id"
                value={attendance.student_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Subject"
                name="subject"
                value={attendance.subject}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Status"
                name="status"
                value={attendance.status}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Date"
                name="date"
                value={attendance.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="date"
                required
              />
            </div>

            <Box my={2} display="flex" justifyContent="space-between" gap="10px">
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Attendance'}
              </Button>
              <CancelButton variant="contained" onClick={() => navigate('/teacher/manage-attendance')}>
                Cancel
              </CancelButton>
            </Box>
          </form>
        </FormContainer>
      )}
    </div>
  );
};

export default EditAttendance;

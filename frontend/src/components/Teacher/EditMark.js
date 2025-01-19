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

const EditMark = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mark, setMark] = useState({
    student_id: '',
    subject: '',
    marks: '',
    exam_type: '',
    date: '',
  });
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMarkDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/marks/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching mark details');
        }
        const data = await response.json();
        setMark(data); // Assuming data contains student_id, subject, marks, exam_type, and date
      } catch (error) {
        setError(error.message || 'Failed to load mark details');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMark((prevMark) => ({
      ...prevMark,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/marks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mark),
      });

      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Mark updated successfully!' });
        navigate('/teacher/manage-marks'); // Redirect to marks management page after update
      } else {
        setFlashMessage({ type: 'error', message: 'Error updating mark' });
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
        <h2>Edit Mark</h2>
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
                value={mark.student_id}
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
                value={mark.subject}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Marks"
                name="marks"
                value={mark.marks}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                required
              />
            </div>
            <div>
              <TextField
                label="Exam Type"
                name="exam_type"
                value={mark.exam_type}
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
                value={mark.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="date"
                required
              />
            </div>

            <Box my={2} display="flex" justifyContent="space-between" gap="10px">
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Mark'}
              </Button>
              <CancelButton variant="contained" onClick={() => navigate('/teacher/manage-marks')}>
                Cancel
              </CancelButton>
            </Box>
          </form>
        </FormContainer>
      )}
    </div>
  );
};

export default EditMark;

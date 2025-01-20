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

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState({
    class_name: '',
    subject: '',
    teacher: '',
    time: '',
    date: '',
  });
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/classes/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching class details');
        }
        const data = await response.json();
        setClassData(data); // Assuming data contains class_name, subject, teacher, time, and date
      } catch (error) {
        setError(error.message || 'Failed to load class details');
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Class updated successfully!' });
        navigate('/teacher/manage-classes'); // Redirect to classes management page after update
      } else {
        setFlashMessage({ type: 'error', message: 'Error updating class' });
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
        <h2>Edit Class</h2>
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
                label="Class Name"
                name="class_name"
                value={classData.class_name}
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
                value={classData.subject}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Teacher Name"
                name="teacher"
                value={classData.teacher}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div>
              <TextField
                label="Time"
                name="time"
                value={classData.time}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="time"
                required
              />
            </div>
            <div>
              <TextField
                label="Date"
                name="date"
                value={classData.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="date"
                required
              />
            </div>

            <Box my={2} display="flex" justifyContent="space-between" gap="10px">
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Class'}
              </Button>
              <CancelButton variant="contained" onClick={() => navigate('/teacher/manage-classes')}>
                Cancel
              </CancelButton>
            </Box>
          </form>
        </FormContainer>
      )}
    </div>
  );
};

export default EditClass;

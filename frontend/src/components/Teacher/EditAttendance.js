import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const { id } = useParams(); // Get record ID from the URL
    const [formData, setFormData] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/attendance/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch record. Status: ${response.status}`);
                }
                const data = await response.json();
                setFormData(data);
            } catch (err) {
                console.error(err.message);
                setFlashMessage({ type: 'error', message: `Error fetching record: ${err.message}` });
            } finally {
                setLoading(false);
            }
        };

        fetchRecord();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const response = await fetch(`http://localhost:5000/api/attendance/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update record');
            }

            setFlashMessage({ type: 'success', message: 'Record updated successfully!' });
            setTimeout(() => navigate('/teacher/manage-attendance'), 2000); // Redirect after success
        } catch (err) {
            setFlashMessage({ type: 'error', message: `Error: ${err.message}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!formData) {
        return <div>No data found for this attendance record.</div>;
    }

    return (
        <div>
            <Box my={2} textAlign="center">
                <h2>Edit Attendance Record</h2>
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

            <FormContainer>
                <form>
                    <div>
                        <TextField
                            label="Index Number"
                            name="index_number"
                            value={formData.index_number}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="date"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Month"
                            name="month"
                            value={formData.month}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="number"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="time"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Status 1"
                            name="status1"
                            value={formData.status1}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Status 2"
                            name="status2"
                            value={formData.status2}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </div>

                    <Box my={2} display="flex" justifyContent="space-between" gap="10px">
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={handleSave}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Record'}
                        </Button>
                        <CancelButton
                            variant="contained"
                            onClick={() => navigate('/teacher/manage-attendance')}
                        >
                            Cancel
                        </CancelButton>
                    </Box>
                </form>
            </FormContainer>
        </div>
    );
};

export default EditAttendance;

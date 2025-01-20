import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Box)`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 48%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: white;
`;

const AddAttendance = () => {
    const [formData, setFormData] = useState({
        index_number: '',
        date: '',
        month: '',
        year: '',
        time: '',
        status1: '',
        status2: '',
    });
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (!formData.index_number || !formData.date || !formData.month || !formData.year || !formData.time || !formData.status1 || !formData.status2) {
            setErrorMessage('All fields are required');
            setSuccessMessage(null);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add record');
            }

            setSuccessMessage('Attendance record added successfully!');
            setFormData({
                index_number: '',
                date: '',
                month: '',
                year: '',
                time: '',
                status1: '',
                status2: '',
            });
            setErrorMessage(null);
            setTimeout(() => navigate('/teacher/manage-attendance'), 2000);
        } catch (err) {
            setErrorMessage('Error adding record. Please try again later.');
            setSuccessMessage(null);
        }
    };

    return (
        <FormContainer>
            <h3 style={{ textAlign: 'center', color: '#333' }}>Add Attendance Record</h3>

            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

            <div>
                <Input
                    type="text"
                    name="index_number"
                    placeholder="Index Number"
                    value={formData.index_number}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Input
                    type="text"
                    name="month"
                    placeholder="Month"
                    value={formData.month}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={formData.year}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Input
                    type="text"
                    name="status1"
                    placeholder="Status 1"
                    value={formData.status1}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <Input
                    type="text"
                    name="status2"
                    placeholder="Status 2"
                    value={formData.status2}
                    onChange={handleInputChange}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    onClick={handleSave}
                    style={{ backgroundColor: '#007bff' }}
                >
                    Save
                </Button>

                <Button
                    type="button"
                    onClick={() => navigate('/teacher/manage-attendance')}
                    style={{ backgroundColor: '#f44336' }}
                >
                    Cancel
                </Button>
            </div>
        </FormContainer>
    );
};

export default AddAttendance;

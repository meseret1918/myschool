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
  const [attendanceData, setAttendanceData] = useState({
    index_number: '',
    date: '',
    month: '',
    year: '',
    time: '',
    _status1: '',
    _status2: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!attendanceData.index_number || !attendanceData.date || !attendanceData.month || !attendanceData.year || !attendanceData.time || !attendanceData._status1 || !attendanceData._status2) {
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
        body: JSON.stringify(attendanceData),
      });

      if (!response.ok) {
        throw new Error('Failed to add attendance');
      }

      setSuccessMessage('Attendance added successfully!');
      setAttendanceData({ index_number: '', date: '', month: '', year: '', time: '', _status1: '', _status2: '' });
      setErrorMessage(null);
      setTimeout(() => navigate('/teacher/manage-attendance'), 2000);
    } catch (error) {
      setErrorMessage('Error adding attendance. Please try again later.');
      setSuccessMessage(null);
    }
  };

  return (
    <FormContainer>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Attendance</h3>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <div>
        <Input
          type="number"
          name="index_number"
          placeholder="Student Index Number"
          value={attendanceData.index_number}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="date"
          name="date"
          value={attendanceData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="month"
          placeholder="Month"
          value={attendanceData.month}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="number"
          name="year"
          placeholder="Year"
          value={attendanceData.year}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="time"
          name="time"
          value={attendanceData.time}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="_status1"
          placeholder="Status 1"
          value={attendanceData._status1}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="_status2"
          placeholder="Status 2"
          value={attendanceData._status2}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleSubmit}
          style={{ backgroundColor: '#007bff' }}
        >
          Add Attendance
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

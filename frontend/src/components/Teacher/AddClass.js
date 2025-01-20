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

const AddClass = () => {
  const [classData, setClassData] = useState({
    class_name: '',
    subject: '',
    teacher: '',
    time: '',
    date: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevClass) => ({ ...prevClass, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!classData.class_name || !classData.subject || !classData.teacher || !classData.time || !classData.date) {
      setErrorMessage('All fields are required');
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        throw new Error('Failed to add class');
      }

      setSuccessMessage('Class added successfully!');
      setClassData({ class_name: '', subject: '', teacher: '', time: '', date: '' });
      setErrorMessage(null);
      setTimeout(() => navigate('/teacher/manage-classes'), 2000);
    } catch (error) {
      setErrorMessage('Error adding class. Please try again later.');
      setSuccessMessage(null);
    }
  };

  return (
    <FormContainer>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Class</h3>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <div>
        <Input
          type="text"
          name="class_name"
          placeholder="Class Name"
          value={classData.class_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          value={classData.subject}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="teacher"
          placeholder="Teacher Name"
          value={classData.teacher}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="time"
          placeholder="Time"
          value={classData.time}
          onChange={handleChange}
          type="time"
          required
        />
      </div>
      <div>
        <Input
          type="date"
          name="date"
          value={classData.date}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleSubmit}
          style={{ backgroundColor: '#007bff' }}
        >
          Add Class
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/teacher/manage-classes')}
          style={{ backgroundColor: '#f44336' }}
        >
          Cancel
        </Button>
      </div>
    </FormContainer>
  );
};

export default AddClass;

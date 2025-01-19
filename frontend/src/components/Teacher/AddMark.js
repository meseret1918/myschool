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

const AddMark = () => {
  const [markData, setMarkData] = useState({
    student_id: '',
    subject: '',
    marks: '',
    exam_type: '',
    date: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarkData((prevMark) => ({ ...prevMark, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!markData.student_id || !markData.subject || !markData.marks || !markData.exam_type || !markData.date) {
      setErrorMessage('All fields are required');
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/marks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(markData),
      });

      if (!response.ok) {
        throw new Error('Failed to add mark');
      }

      setSuccessMessage('Mark added successfully!');
      setMarkData({ student_id: '', subject: '', marks: '', exam_type: '', date: '' });
      setErrorMessage(null);
      setTimeout(() => navigate('/teacher/manage-marks'), 2000);
    } catch (error) {
      setErrorMessage('Error adding mark. Please try again later.');
      setSuccessMessage(null);
    }
  };

  return (
    <FormContainer>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Mark</h3>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <div>
        <Input
          type="number"
          name="student_id"
          placeholder="Student ID"
          value={markData.student_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          value={markData.subject}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="number"
          name="marks"
          placeholder="Marks"
          value={markData.marks}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="text"
          name="exam_type"
          placeholder="Exam Type"
          value={markData.exam_type}
          onChange={handleChange}
        />
      </div>
      <div>
        <Input
          type="date"
          name="date"
          value={markData.date}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={handleSubmit}
          style={{ backgroundColor: '#007bff' }}
        >
          Add Mark
        </Button>

        <Button
          type="button"
          onClick={() => navigate('/teacher/manage-marks')}
          style={{ backgroundColor: '#f44336' }}
        >
          Cancel
        </Button>
      </div>
    </FormContainer>
  );
};

export default AddMark;

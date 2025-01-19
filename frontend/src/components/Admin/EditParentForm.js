import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
`;

const EditParentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parent, setParent] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/parents/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching parent');
        }
        const data = await response.json();
        setParent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParent((prevParent) => ({
      ...prevParent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/parents/${id}`, {
        method: 'PUT',
        body: JSON.stringify(parent),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Error updating parent');
      }

      navigate('/admin/manage-parents');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <FormContainer>
        <h2>Edit Parent</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={parent.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={parent.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <Input
              type="text"
              id="phone"
              name="phone"
              value={parent.phone || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <Input
              type="text"
              id="address"
              name="address"
              value={parent.address || ''}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
            <Button type="submit">Update Parent</Button>
            <CancelButton
              type="button"
              onClick={() => navigate('/admin/manage-parents')}
            >
              Cancel
            </CancelButton>
          </div>
        </form>
      </FormContainer>
    </Container>
  );
};

export default EditParentForm;

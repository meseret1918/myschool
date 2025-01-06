import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditParentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parent, setParent] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
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
      [name]: value
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

  const formStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '30px'  // Added margin to create space between footer and form
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={formStyle}>
      <h2>Edit Parent</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={parent.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={parent.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={parent.phone || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={parent.address || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>Update Parent</button>
      </form>
    </div>
  );
};

export default EditParentForm;

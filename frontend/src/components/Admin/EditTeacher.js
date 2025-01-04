import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/EditTeacher.css'; // Importing external CSS file

const EditTeacher = () => {
  const { id } = useParams(); // Extract the teacher ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [teacher, setTeacher] = useState({
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    Gender: '',
    ContactNumber: '',
    Email: '',
    Qualification: '',
    ExperienceYears: '',
    HireDate: '',
    SubjectsTaught: '',
    Salary: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the teacher data on component mount
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/teachers/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
        setTeacher(data);
      } catch (err) {
        setError('Error fetching teacher. Please try again later.');
        console.error('Error fetching teacher:', err);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchTeacher();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Update Teacher
  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });
      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
      }
      navigate('/admin/manage-teachers'); // Redirect to Manage Teachers
    } catch (err) {
      setError('Error updating teacher. Please try again later.');
      console.error('Error updating teacher:', err);
    }
  };

  if (loading) return <p>Loading teacher data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-teacher">
      <h2>Edit Teacher</h2>
      <form onSubmit={handleUpdateTeacher} className="form-container">
        {Object.keys(teacher).map((key) => (
          <input
            key={key}
            type={key === 'DateOfBirth' || key === 'HireDate' ? 'date' : 'text'}
            name={key}
            value={teacher[key]}
            placeholder={key}
            onChange={handleInputChange}
            required
          />
        ))}
        <button type="submit" className="btn update-btn">Update Teacher</button>
      </form>
      <div className="spacer"></div>
    </div>
  );
};

export default EditTeacher;

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const DeleteTeacher = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/api/teachers/${id}`)
      .then((response) => response.json())
      .then((data) => setTeacher(data))
      .catch((error) => {
        setError('Error fetching teacher details. Please try again later.');
        console.error('Error fetching teacher details:', error);
      });
  }, [id]);

  const handleDeleteTeacher = () => {
    fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        history.push('/'); // Redirect back to the teacher list after deletion
      })
      .catch((error) => {
        setError('Error deleting teacher. Please try again later.');
        console.error('Error deleting teacher:', error);
      });
  };

  return (
    <div className="form-container">
      <h3>Delete Teacher</h3>
      {teacher ? (
        <>
          <p>Are you sure you want to delete the teacher: {teacher.FirstName} {teacher.LastName}?</p>
          <button onClick={handleDeleteTeacher} className="btn delete-btn">Delete</button>
        </>
      ) : (
        <p>{error || 'Loading teacher data...'}</p>
      )}
    </div>
  );
};

export default DeleteTeacher;

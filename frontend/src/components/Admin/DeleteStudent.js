import React from 'react';

const DeleteStudent = ({ studentId, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      onDelete(studentId);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteStudent;

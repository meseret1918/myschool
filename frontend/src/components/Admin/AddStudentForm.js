import React, { useState } from 'react';

const AddStudentForm = () => {
  const [newStudent, setNewStudent] = useState({ name: '', email: '', class_name: '', parent_id: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle adding a student
  const handleAddStudent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        const errorDetails = await response.text(); // Get error details for debugging
        throw new Error(`Server Error: ${errorDetails}`);
      }

      const addedStudent = await response.json();
      setSuccessMessage(`Student ${addedStudent.name} added successfully!`);
      setNewStudent({ name: '', email: '', class_name: '', parent_id: '' }); // Reset form fields after successful addition
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Add New Student</h3>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}

      <input
        type="text"
        placeholder="Name"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={newStudent.email}
        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Class"
        value={newStudent.class_name}
        onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Parent ID"
        value={newStudent.parent_id}
        onChange={(e) => setNewStudent({ ...newStudent, parent_id: e.target.value })}
        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleAddStudent}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Add Student
      </button>
    </div>
  );
};

export default AddStudentForm;

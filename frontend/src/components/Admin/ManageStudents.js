import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material'; // Added TextField import
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled components
const TableContainer = styled.div`
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px 12px;
    text-align: center;
    border: 1px solid #e0e0e0;
    font-size: 14px;
  }

  th {
    background-color: #f5f5f5;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  th:nth-child(1), td:nth-child(1) {
    width: 5%;
  }

  th:nth-child(3), td:nth-child(3) {
    width: 20%;
  }

  th:nth-last-child(-n+3), td:nth-last-child(-n+3) {
    width: 5%; /* Smaller width for Add, Edit, and Delete columns */
  }
`;

const GoBackLink = styled.a`
  font-size: 24px;
  color: #6c757d;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #5a6268;
  }
`;

const FlashMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const FlashMessage = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.type === 'error' ? '#f8d7da' : '#d4edda')};
  color: ${(props) => (props.type === 'error' ? '#721c24' : '#155724')};
  border: 1px solid ${(props) => (props.type === 'error' ? '#f5c6cb' : '#c3e6cb')};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: ${(props) => props.color || '#007bff'};
  font-size: 20px;

  &:hover {
    color: ${(props) => props.hoverColor || '#0056b3'};
  }

  &:disabled {
    color: #c0c0c0;
    cursor: not-allowed;
  }
`;

const DeleteDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        if (!response.ok) {
          throw new Error('Error fetching students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setStudents(filtered);
  };

  const confirmDelete = async () => {
    if (isDeleting || !studentToDelete) return;
    setIsDeleting(true);
    setFlashMessage({ type: 'info', message: 'Deleting...' });

    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Student deleted successfully!' });
        setStudents(students.filter((student) => student.id !== studentToDelete));
      } else {
        setFlashMessage({ type: 'error', message: 'Error deleting student' });
      }
    } catch (error) {
      setFlashMessage({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setIsDeleting(false);
      setStudentToDelete(null);

      setTimeout(() => setFlashMessage(null), 3000);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <Box my={2} display="flex" justifyContent="flex-end">
        <TextField
          label="Search Students"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          size="small"
        />
      </Box>

      {/* Go Back Link */}
      <Box my={2} display="flex" justifyContent="flex-start" alignItems="center">
        <GoBackLink href="#" onClick={() => navigate('/admin/Dashboard')}>
          🔙
        </GoBackLink>
      </Box>

      <Box my={2} textAlign="center">
        <h2>Manage Students</h2>
      </Box>
      {flashMessage && (
        <FlashMessageContainer>
          <FlashMessage type={flashMessage.type}>{flashMessage.message}</FlashMessage>
        </FlashMessageContainer>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Parent ID</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Created At</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.class_name}</td>
                  <td>{student.parent_id || 'N/A'}</td>
                  <td>{student.phone || 'N/A'}</td>
                  <td>{student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}</td>
                  <td>{student.address || 'N/A'}</td>
                  <td>{new Date(student.created_at).toLocaleString()}</td>
                  <td>
                    <IconButton
                      color="#28a745"
                      hoverColor="#218838"
                      onClick={() => navigate('/admin/add-student')}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      color="#ffc107"
                      hoverColor="#e0a800"
                      onClick={() => navigate(`/admin/edit-student/${student.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      color="#dc3545"
                      hoverColor="#c82333"
                      onClick={() => setStudentToDelete(student.id)}
                      disabled={isDeleting}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}

      {studentToDelete && (
        <DeleteDialog>
          <p>Are you sure you want to delete this student?</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton color="#dc3545" hoverColor="#c82333" onClick={confirmDelete}>
              Yes
            </IconButton>
            <IconButton color="#6c757d" hoverColor="#5a6268" onClick={() => setStudentToDelete(null)}>
              No
            </IconButton>
          </div>
        </DeleteDialog>
      )}
    </div>
  );
};

export default ManageStudents;

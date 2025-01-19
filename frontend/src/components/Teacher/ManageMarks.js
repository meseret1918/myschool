import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    text-align: justify;
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
`;

const GoBackLink = styled.a`
  font-size: 24px;
  color: #6c757d;
  text-decoration: none;
  &:hover {
    color: #5a6268;
  }
`;

const DeleteDialog = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  text-align: center;
`;

const DeleteDialogButton = styled.button`
  background-color: ${(props) => (props.cancel ? '#6c757d' : '#dc3545')};
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.cancel ? '#5a6268' : '#c82333')};
  }
`;

const ManageMarks = () => {
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [markToDelete, setMarkToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/marks');
        if (!response.ok) {
          throw new Error('Error fetching marks');
        }
        const data = await response.json();
        setMarks(data);
      } catch (error) {
        setError(error.message || 'Failed to load marks');
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  const handleDelete = (id) => setMarkToDelete(id);

  const confirmDelete = async () => {
    if (isDeleting || !markToDelete) return;
    setIsDeleting(true);
    setFlashMessage({ type: 'info', message: 'Deleting...' });

    try {
      const response = await fetch(`http://localhost:5000/api/marks/${markToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Mark deleted successfully!' });
        setMarks(marks.filter((mark) => mark.id !== markToDelete));
      } else {
        setFlashMessage({ type: 'error', message: 'Error deleting mark' });
      }
    } catch (error) {
      setFlashMessage({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setIsDeleting(false);
      setMarkToDelete(null);
      setTimeout(() => setFlashMessage(null), 3000);
    }
  };

  const cancelDelete = () => setMarkToDelete(null);

  return (
    <div>
      <Box my={2} display="flex" justifyContent="flex-start" alignItems="center">
        <GoBackLink href="#" onClick={() => navigate('/teacher/Dashboard')}>
          🔙
        </GoBackLink>
      </Box>

      <Box my={2} textAlign="center">
        <h2>Manage Marks</h2>
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
      ) : marks.length === 0 ? (
        <p>No marks found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Student ID</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Exam Type</th>
                <th>Date</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, index) => (
                <tr key={mark.id}>
                  <td>{index + 1}</td>
                  <td>{mark.student_id}</td>
                  <td>{mark.subject}</td>
                  <td>{mark.marks}</td>
                  <td>{mark.exam_type}</td>
                  <td>{mark.date}</td>
                  <td>
                    <IconButton
                      color="#28a745"
                      hoverColor="#218838"
                      onClick={() => navigate('/teacher/add-mark')}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      color="#ffc107"
                      hoverColor="#e0a800"
                      onClick={() => navigate(`/teacher/edit-mark/${mark.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      color="#dc3545"
                      hoverColor="#c82333"
                      onClick={() => handleDelete(mark.id)}
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

      {markToDelete && (
        <DeleteDialog>
          <p>Are you sure you want to delete this mark?</p>
          <div>
            <DeleteDialogButton onClick={confirmDelete}>Yes</DeleteDialogButton>
            <DeleteDialogButton cancel onClick={cancelDelete}>
              No
            </DeleteDialogButton>
          </div>
        </DeleteDialog>
      )}
    </div>
  );
};

export default ManageMarks;

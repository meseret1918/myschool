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
  th:nth-child(1), td:nth-child(1) {
    width: 5%;
  }
  th:nth-child(2), td:nth-child(2) {
    width: 15%;
  }
  th:nth-child(3), td:nth-child(3) {
    width: 25%;
  }
  th:nth-child(4), td:nth-child(4) {
    width: 10%;
  }
  th:nth-child(5), td:nth-child(5) {
    width: 15%;
  }
  th:nth-child(6), td:nth-child(6) {
    width: 10%;
  }
  th:nth-last-child(-n+3), td:nth-last-child(-n+3) {
    width: 5%;
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
  span {
    transition: color 0.3s;
  }
  text-align: left;
  &:hover span {
    color: ${(props) => props.hoverColor || '#0056b3'};
  }
  &:disabled {
    color: #c0c0c0;
    cursor: not-allowed;
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
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <IconButton color="#dc3545" hoverColor="#c82333" onClick={confirmDelete}>
              Yes
            </IconButton>
            <IconButton color="#6c757d" hoverColor="#5a6268" onClick={cancelDelete}>
              No
            </IconButton>
          </div>
        </DeleteDialog>
      )}
    </div>
  );
};

export default ManageMarks;

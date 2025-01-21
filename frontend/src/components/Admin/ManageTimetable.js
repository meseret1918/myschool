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

  &:hover span {
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

const GoBackLink = styled.a`
  font-size: 24px;
  color: #6c757d;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #5a6268;
  }
`;

const ManageTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [timetableToDelete, setTimetableToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/timetable');
        if (!response.ok) {
          throw new Error('Error fetching timetables');
        }
        const data = await response.json();
        setTimetables(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetables();
  }, []);

  const handleDelete = (id) => setTimetableToDelete(id);

  const confirmDelete = async () => {
    if (isDeleting || !timetableToDelete) return;
    setIsDeleting(true);
    setFlashMessage({ type: 'info', message: 'Deleting...' });

    try {
      const response = await fetch(`http://localhost:5000/api/timetable/${timetableToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Timetable deleted successfully!' });
        setTimetables(timetables.filter((timetable) => timetable.id !== timetableToDelete));
      } else {
        setFlashMessage({ type: 'error', message: 'Error deleting timetable' });
      }
    } catch (error) {
      setFlashMessage({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setIsDeleting(false);
      setTimetableToDelete(null);

      setTimeout(() => setFlashMessage(null), 3000);
    }
  };

  const cancelDelete = () => setTimetableToDelete(null);

  const goBack = () => {
    navigate('/admin/Dashboard');
  };

  return (
    <div>
      <Box my={2} display="flex" justifyContent="flex-start" alignItems="center">
        <GoBackLink href="#" onClick={goBack}>
          🔙
        </GoBackLink>
      </Box>

      <Box my={2} textAlign="center">
        <h2>Manage Timetable</h2>
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
      ) : timetables.length === 0 ? (
        <p>No timetables found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Day</th>
                <th>Time</th>
                <th>Subject</th>
                <th>Teacher ID</th>
                <th>Class ID</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {timetables.map((timetable, index) => (
                <tr key={timetable.id}>
                  <td>{index + 1}</td>
                  <td>{timetable.day}</td>
                  <td>{`${timetable.start_time} - ${timetable.end_time}`}</td>
                  <td>{timetable.subject}</td>
                  <td>{timetable.teacher_id}</td>
                  <td>{timetable.class_id}</td>
                  <td>
                    <IconButton color="#28a745" hoverColor="#218838" onClick={() => navigate('/admin/add-timetable')}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton color="#ffc107" hoverColor="#e0a800" onClick={() => navigate(`/admin/edit-timetable/${timetable.id}`)}>
                      <EditIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton color="#dc3545" hoverColor="#c82333" onClick={() => handleDelete(timetable.id)} disabled={isDeleting}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}

      {timetableToDelete && (
        <DeleteDialog>
          <p>Are you sure you want to delete this timetable?</p>
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

export default ManageTimetable;

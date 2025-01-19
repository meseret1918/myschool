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

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/teachers');
        if (!response.ok) {
          throw new Error('Error fetching teachers');
        }
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = (id) => setTeacherToDelete(id);

  const confirmDelete = async () => {
    if (isDeleting || !teacherToDelete) return;
    setIsDeleting(true);
    setFlashMessage({ type: 'info', message: 'Deleting...' });

    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${teacherToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Teacher deleted successfully!' });
        setTeachers(teachers.filter((teacher) => teacher.TeacherID !== teacherToDelete));
      } else {
        setFlashMessage({ type: 'error', message: 'Error deleting teacher' });
      }
    } catch (error) {
      setFlashMessage({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setIsDeleting(false);
      setTeacherToDelete(null);

      setTimeout(() => setFlashMessage(null), 3000);
    }
  };

  const cancelDelete = () => setTeacherToDelete(null);

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
        <h2>Manage Teachers</h2>
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
      ) : teachers.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Hire Date</th>
                <th>Subjects</th>
                <th>Salary</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={teacher.TeacherID}>
                  <td>{index + 1}</td>
                  <td>{teacher.FirstName}</td>
                  <td>{teacher.LastName}</td>
                  <td>{teacher.Gender}</td>
                  <td>{teacher.Age}</td>
                  <td>{teacher.ContactNumber}</td>
                  <td>{teacher.Email}</td>
                  <td>{teacher.Qualification}</td>
                  <td>{teacher.ExperienceYears}</td>
                  <td>{new Date(teacher.HireDate).toLocaleDateString()}</td>
                  <td>{teacher.SubjectsTaught}</td>
                  <td>{Number(teacher.Salary).toFixed(2)}</td>
                  <td>
                    <IconButton
                      color="#28a745"
                      hoverColor="#218838"
                      onClick={() => navigate('/admin/add-teacher')}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      color="#ffc107"
                      hoverColor="#e0a800"
                      onClick={() => navigate(`/admin/edit-teacher/${teacher.TeacherID}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      color="#dc3545"
                      hoverColor="#c82333"
                      onClick={() => handleDelete(teacher.TeacherID)}
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

      {teacherToDelete && (
        <DeleteDialog>
          <p>Are you sure you want to delete this teacher?</p>
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

export default ManageTeachers;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
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
    width: 15%;
  }
  th:nth-child(4), td:nth-child(4) {
    width: 10%;
  }
  th:nth-child(5), td:nth-child(5) {
    width: 10%;
  }
  th:nth-child(6), td:nth-child(6) {
    width: 10%;
  }
  th:nth-child(7), td:nth-child(7) {
    width: 10%;
  }
  th:nth-child(8), td:nth-child(8) {
    width: 10%;
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

const ManageAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/attendance');
                if (!response.ok) {
                    throw new Error(`Failed to fetch attendance data. Status: ${response.status}`);
                }
                const data = await response.json();
                setAttendance(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setRecordToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/attendance/${recordToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAttendance((prev) => prev.filter((record) => record.id !== recordToDelete));
                setSuccessMessage('Record deleted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                throw new Error(`Error deleting record. Status: ${response.status}`);
            }

            setDeleteDialogOpen(false);
        } catch (err) {
            console.error(err.message);
            alert(`Failed to delete record: ${err.message}`);
        }
    };

    if (loading) {
        return <div>Loading attendance data...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', fontSize: '16px' }}>Error: {error}</div>;
    }

    return (
        <div>
            <Box my={2} display="flex" justifyContent="flex-start" alignItems="center">
                <a href="#" onClick={() => navigate('/teacher/Dashboard')}>
                    🔙
                </a>
            </Box>

            <Box my={2} textAlign="center">
                <h2>Manage Attendance</h2>
            </Box>

            {successMessage && (
                <FlashMessageContainer>
                    <FlashMessage type="success">{successMessage}</FlashMessage>
                </FlashMessageContainer>
            )}

            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Index Number</th>
                            <th>Date</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Time</th>
                            <th>Status 1</th>
                            <th>Status 2</th>
                            <th>Add</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.index_number}</td>
                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                <td>{record.month}</td>
                                <td>{record.year}</td>
                                <td>{record.time}</td>
                                <td>{record.status1}</td>
                                <td>{record.status2}</td>
                                <td>
                                    <Link to="/teacher/add-attendance">
                                        <IconButton color="green">
                                            <span>
                                                <AddCircleOutlineIcon />
                                            </span>
                                        </IconButton>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/teacher/edit-attendance/${record.id}`}>
                                        <IconButton color="blue">
                                            <span>
                                                <EditIcon />
                                            </span>
                                        </IconButton>
                                    </Link>
                                </td>
                                <td>
                                    <IconButton
                                        onClick={() => {
                                            setDeleteDialogOpen(true);
                                            setRecordToDelete(record.id);
                                        }}
                                        color="red"
                                    >
                                        <span>
                                            <DeleteIcon />
                                        </span>
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>

            {/* Delete confirmation dialog */}
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this record?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageAttendance;

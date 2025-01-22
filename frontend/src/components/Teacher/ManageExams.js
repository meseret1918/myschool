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
    width: 15%;
  }
  th:nth-child(5), td:nth-child(5) {
    width: 15%;
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

const SearchInput = styled.input`
  padding: 8px;
  margin: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
`;

const ManageExams = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/exam');  // Updated URL
                if (!response.ok) {
                    throw new Error(`Failed to fetch exams data. Status: ${response.status}`);
                }
                const data = await response.json();
                setExams(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setRecordToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/exam/${recordToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setExams((prev) => prev.filter((record) => record.id !== recordToDelete));
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

    // Filter exams based on search term
    const filteredExams = exams.filter((record) =>
        record.marks.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.year.toString().includes(searchTerm) ||
        record.exam_id.toString().includes(searchTerm)
    );

    if (loading) {
        return <div>Loading exam data...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', fontSize: '16px' }}>Error: {error}</div>;
    }

    return (
        <div>
            <FlashMessageContainer>
                {successMessage && <FlashMessage type="success">{successMessage}</FlashMessage>}
            </FlashMessageContainer>

            <SearchInput
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Index Number</th>
                            <th>Grade ID</th>
                            <th>Exam ID</th>
                            <th>Subject ID</th>
                            <th>Marks</th>
                            <th>Year</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExams.map((exam) => (
                            <tr key={exam.id}>
                                <td>{exam.index_number}</td>
                                <td>{exam.grade_id}</td>
                                <td>{exam.exam_id}</td>
                                <td>{exam.subject_id}</td>
                                <td>{exam.marks}</td>
                                <td>{exam.year}</td>
                                <td>{exam.date}</td>
                                <td>
                                    <IconButton onClick={() => navigate(`/exam/edit/${exam.id}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setRecordToDelete(exam.id);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>

            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Delete Exam</DialogTitle>
                <DialogContent>Are you sure you want to delete this exam record?</DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageExams;

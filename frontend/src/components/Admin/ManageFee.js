import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
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

const ManageFees = () => {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [feeToDelete, setFeeToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fee');  // Ensure correct endpoint
        if (!response.ok) {
          throw new Error('Error fetching fees');
        }
        const data = await response.json();
        setFees(data);
        setFilteredFees(data); // Initially display all fees
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = fees.filter(
      (fee) =>
        fee.index_number.toString().toLowerCase().includes(query) ||
        fee.year.toString().toLowerCase().includes(query) ||
        fee.month.toLowerCase().includes(query) ||
        fee._status.toLowerCase().includes(query) ||
        fee.student_status.toLowerCase().includes(query)
    );
    setFilteredFees(filtered);
  };

  const handleDelete = (id) => setFeeToDelete(id);

  const confirmDelete = async () => {
    if (isDeleting || !feeToDelete) return;
    setIsDeleting(true);
    setFlashMessage({ type: 'info', message: 'Deleting...' });

    try {
      const response = await fetch(`http://localhost:5000/api/fee/${feeToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFlashMessage({ type: 'success', message: 'Fee deleted successfully!' });
        setFees(fees.filter((fee) => fee.id !== feeToDelete));
        setFilteredFees(filteredFees.filter((fee) => fee.id !== feeToDelete)); // Update filtered list
      } else {
        setFlashMessage({ type: 'error', message: 'Error deleting fee' });
      }
    } catch (error) {
      setFlashMessage({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setIsDeleting(false);
      setFeeToDelete(null);
      setTimeout(() => setFlashMessage(null), 3000);
    }
  };

  const cancelDelete = () => setFeeToDelete(null);

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
        <h2>Manage Fees</h2>
      </Box>

      {/* Search Bar (aligned to the right corner) */}
      <Box my={2} display="flex" justifyContent="flex-end">
        <TextField
          label="Search Fees"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          size="small"
        />
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
      ) : filteredFees.length === 0 ? (
        <p>No fees found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Index Number</th>
                <th>Year</th>
                <th>Month</th>
                <th>Status</th>
                <th>Student Status</th>
                <th>Add</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.map((fee, index) => (
                <tr key={fee.id}>
                  <td>{index + 1}</td>
                  <td>{fee.index_number}</td>
                  <td>{fee.year}</td>
                  <td>{fee.month}</td>
                  <td>{fee._status}</td>
                  <td>{fee.student_status}</td>
                  <td>
                    <IconButton color="#28a745" hoverColor="#218838" onClick={() => navigate('/admin/add-fee')}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton color="#ffc107" hoverColor="#e0a800" onClick={() => navigate(`/admin/edit-fee/${fee.id}`)}>
                      <EditIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton color="#dc3545" hoverColor="#c82333" onClick={() => handleDelete(fee.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}

      {feeToDelete && (
        <DeleteDialog>
          <p>Are you sure you want to delete this fee?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </DeleteDialog>
      )}
    </div>
  );
};

export default ManageFees;

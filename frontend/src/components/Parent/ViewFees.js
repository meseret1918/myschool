import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import styled from 'styled-components';

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

const GoBackLink = styled.a`
  font-size: 24px;
  color: #6c757d;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #5a6268;
  }
`;

const ViewFees = () => {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
        <h2>View Fees</h2> {/* Updated title */}
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
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewFees;

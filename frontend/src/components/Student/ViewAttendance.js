import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
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

  th,
  td {
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

  th:nth-child(1),
  td:nth-child(1) {
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

const GoBackLink = styled.a`
  font-size: 24px;
  color: #6c757d;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #5a6268;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/attendance');
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error fetching attendance: ${response.status} - ${errorDetails}`);
        }
        const data = await response.json();
        setAttendance(data);
        setFilteredAttendance(data);
      } catch (error) {
        setError(error.message);
        setFlashMessage({ type: 'error', message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = attendance.filter(
        (record) =>
          record.index_number.toString().includes(query) ||
          record.status1.toLowerCase().includes(query.toLowerCase()) ||
          record.status2.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAttendance(filtered);
    } else {
      setFilteredAttendance(attendance);
    }
  };

  const goBack = () => {
    navigate('/Parent/Dashboard');
  };

  return (
    <div>
      <Box my={2} display="flex" justifyContent="flex-start" alignItems="center">
        <GoBackLink href="#" onClick={goBack}>
          🔙
        </GoBackLink>
      </Box>

      <Box my={2} textAlign="center">
        <h2>View Attendance</h2>
      </Box>

      <Box my={2} display="flex" justifyContent="flex-end">
        <SearchInput
          type="text"
          placeholder="Search by Index Number, Status1, or Status2"
          value={searchQuery}
          onChange={handleSearchChange}
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
      ) : filteredAttendance.length === 0 ? (
        <p>No attendance records found</p>
      ) : (
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
                <th>Status1</th>
                <th>Status2</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.index_number}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.month}</td>
                  <td>{record.year}</td>
                  <td>{record.time}</td>
                  <td>{record.status1}</td>
                  <td>{record.status2}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewAttendance;

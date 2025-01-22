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

const GoBackLink = styled.a`
  font-size: 24px;
  color: #6c757d;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #5a6268;
  }
`;

const ViewTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [filteredTimetables, setFilteredTimetables] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setFilteredTimetables(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetables();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredTimetables(
      timetables.filter(
        (timetable) =>
          timetable.day.toLowerCase().includes(query) ||
          timetable.subject.toLowerCase().includes(query) ||
          timetable.teacher_id.toString().includes(query) ||
          timetable.class_id.toString().includes(query)
      )
    );
  };

  const goBack = () => {
    navigate('/student/Dashboard');
  };

  return (
    <div>
      <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
        <GoBackLink href="#" onClick={goBack}>
          🔙
        </GoBackLink>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: '250px' }}
        />
      </Box>

      <Box my={2} textAlign="center">
        <h2>View Timetable</h2>
      </Box>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredTimetables.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {filteredTimetables.map((timetable, index) => (
                <tr key={timetable.id}>
                  <td>{index + 1}</td>
                  <td>{timetable.day}</td>
                  <td>{`${timetable.start_time} - ${timetable.end_time}`}</td>
                  <td>{timetable.subject}</td>
                  <td>{timetable.teacher_id}</td>
                  <td>{timetable.class_id}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewTimetable;

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

  th:nth-child(1), td:nth-child(1) {
    width: 5%;
  }

  th:nth-child(2), td:nth-child(2) {
    width: 15%;
    text-align: left;
  }

  th:nth-child(3), td:nth-child(3) {
    width: 10%;
  }

  th:nth-child(4), td:nth-child(4) {
    width: 15%;
  }

  th:nth-child(5), td:nth-child(5) {
    width: 10%;
  }

  th:nth-child(6), td:nth-child(6) {
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

const GoBackLink = styled.a`
  font-size: 24px;
  color: #6c757d;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #5a6268;
  }
`;

const ViewMarks = () => {
  const [marks, setMarks] = useState([]);
  const [filteredMarks, setFilteredMarks] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/marks');
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error fetching marks: ${response.status} - ${errorDetails}`);
        }
        const data = await response.json();
        setMarks(data);
        setFilteredMarks(data); // Initially display all marks
      } catch (error) {
        setError(error.message);
        setFlashMessage({ type: 'error', message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  // Search functionality
  const handleSearchChange = (e) => {
    const searchId = e.target.value;
    setSearchId(searchId);

    if (searchId) {
      const filtered = marks.filter((mark) => mark.student_id.toString().includes(searchId));
      setFilteredMarks(filtered);
    } else {
      setFilteredMarks(marks); // Reset if search is cleared
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
        <h2>View Marks</h2>
      </Box>

      <Box my={2} display="flex" justifyContent="flex-end"> {/* Align search to the right */}
        <input
          type="text"
          placeholder="Search by Student ID"
          value={searchId}
          onChange={handleSearchChange}
          style={{ padding: '10px', width: '200px' }}
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
      ) : filteredMarks.length === 0 ? (
        <p>No marks found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Exam Type</th>
                <th>Date</th>
                <th>Student ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarks.map((mark, index) => (
                <tr key={mark.id}>
                  <td>{index + 1}</td>
                  <td>{mark.subject}</td>
                  <td>{mark.marks}</td>
                  <td>{mark.exam_type}</td>
                  <td>{new Date(mark.date).toLocaleDateString()}</td>
                  <td>{mark.student_id}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewMarks;

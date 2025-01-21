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

  th:nth-child(3), td:nth-child(3) {
    width: 20%;
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
`;

const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/subjects');
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error fetching subjects: ${response.status} - ${errorDetails}`);
        }
        const data = await response.json();
        setSubjects(data);
        setFilteredSubjects(data); // Initially display all subjects
      } catch (error) {
        setError(error.message);
        setFlashMessage({ type: 'error', message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter subjects by subject name or code
    if (query) {
      const filtered = subjects.filter(
        (subject) =>
          subject.subName.toLowerCase().includes(query.toLowerCase()) ||
          subject.subCode.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects(subjects); // Reset to all subjects if search query is cleared
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
        <h2>View Subjects</h2>
      </Box>

      {/* Search bar aligned to the right */}
      <Box my={2} display="flex" justifyContent="flex-end">
        <SearchInput
          type="text"
          placeholder="Search by Subject Name or Code"
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
      ) : filteredSubjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Sessions</th>
                <th>Class ID</th>
                <th>School ID</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Teacher ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.map((subject, index) => (
                <tr key={subject.id}>
                  <td>{index + 1}</td>
                  <td>{subject.subName}</td>
                  <td>{subject.subCode}</td>
                  <td>{subject.sessions}</td>
                  <td>{subject.sclassId}</td>
                  <td>{subject.schoolId}</td>
                  <td>{new Date(subject.createdAt).toLocaleString()}</td>
                  <td>{new Date(subject.updatedAt).toLocaleString()}</td>
                  <td>{subject.teacherId}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewSubjects;

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

  th:nth-child(2),
  td:nth-child(2) {
    width: 15%;
    text-align: left;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 40%;
    text-align: justify;
  }

  th:nth-child(4),
  td:nth-child(4) {
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

const SearchInput = styled.input`
  padding: 10px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error fetching events: ${response.status} - ${errorDetails}`);
        }
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data); // Initially display all events
      } catch (error) {
        setError(error.message);
        setFlashMessage({ type: 'error', message: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter events by title or description
    if (query) {
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events); // Reset to all events if search query is cleared
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
        <h2>View Events</h2>
      </Box>

      {/* Search bar */}
      <Box my={2} display="flex" justifyContent="flex-end">
        <SearchInput
          type="text"
          placeholder="Search by Title or Description"
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
      ) : filteredEvents.length === 0 ? (
        <p>No events found</p>
      ) : (
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <th>No</th>
                <th>Event Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </div>
  );
};

export default ViewEvents;

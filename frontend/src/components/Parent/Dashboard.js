import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';

// Function to fetch parent dashboard data
const fetchParentDashboardData = async (setCounts, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/dashboard'); // Assuming this returns all counts

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to fetch parent dashboard data`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format from the server');
    }

    const { totalTeachers = 0, totalSubjects = 0, totalEvents = 0 } = data; // Fetch all counts

    setCounts({ totalTeachers, totalSubjects, totalEvents });
  } catch (err) {
    setError(err.message || 'An error occurred while fetching data');
  } finally {
    setLoading(false);
  }
};

// Stats card component
const StatsCard = ({ title, value }) => (
  <Box
    sx={{
      padding: 2,
      borderRadius: 2,
      boxShadow: 2,
      textAlign: 'center',
      backgroundColor: '#fff',
    }}
  >
    <Typography variant="h6" sx={{ color: '#007bff' }}>
      {title}
    </Typography>
    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
      {value}
    </Typography>
  </Box>
);

const ParentDashboard = () => {
  const [counts, setCounts] = useState({ totalTeachers: 0, totalSubjects: 0, totalEvents: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchParentDashboardData(setCounts, setLoading, setError);
  }, []);

  // Simulating role validation (replace with your actual logic)
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    console.error('Failed to parse user data from localStorage:', err);
  }

  if (!user || user.role !== 'parent') {
    return <Typography>Access denied. You do not have permission to view this page.</Typography>;
  }

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 2,
          color: '#333',
        }}
      >
        <Typography variant="h4">Parent Dashboard</Typography>
        <Link
          to="/login"
          style={{
            textDecoration: 'none',
            backgroundColor: '#f44336',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          Logout
        </Link>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        {/* Left Side - Stats Cards */}
        <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StatsCard title="Total Teachers" value={counts.totalTeachers} />
          <StatsCard title="Total Subjects" value={counts.totalSubjects} />
        </Grid>

        {/* Right Side - Manage Resources */}
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              marginTop: 4,
              padding: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 2,
              border: '1px solid #ddd',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0cc',
                  color: '#fff',
                  ':hover': { backgroundColor: '#0056b3' },
                }}
              >
                Show Manage Resources
              </Button>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <div className="dashboard-links">
                <ul>
                  <li>
                    <Link to="/parent/view-teachers">View Teachers</Link>
                  </li>
                  <li>
                    <Link to="/parent/view-subjects">View Subjects</Link>
                  </li>
                  <li>
                    <Link to="/parent/view-events">View Events</Link>
                  </li>
                  <li>
                    <Link to="/parent/view-marks">View Marks</Link>
                  </li>
                  <li>
                    <Link to="/parent/view-attendance">View Attendance</Link>
                  </li>
                  <li>
                    <Link to="/parent/send-message">Send Message</Link>
                  </li>
                  <li>
                    <Link to="/parent/view-timetable">View Timetable</Link>
                  </li>
                  <li>
                    <Link to="/parent/view-fees">View Fees</Link>
                  </li>
                </ul>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentDashboard;
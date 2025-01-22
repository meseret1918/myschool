// src/components/Admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Function to fetch dashboard data
const fetchDashboardData = async (setCounts, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/dashboard');

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    const { 
      totalTeachers, 
      totalStudents, 
      totalParents, 
      parentsWithMultipleStudents,
      totalClasses,  // Added totalClasses
      totalSubjects  // Added totalSubjects
    } = await response.json();

    setCounts({ 
      totalTeachers, 
      totalStudents, 
      totalParents, 
      parentsWithMultipleStudents,
      totalClasses,  // Set totalClasses
      totalSubjects  // Set totalSubjects
    });
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

// DashboardLinks component (Define it here)
const DashboardLinks = () => (
  <Box sx={{ marginTop: 2 }}>
    {[{ path: '/admin/manage-students', label: 'Manage Students' },
      { path: '/admin/manage-teachers', label: 'Manage Teachers' },
      { path: '/admin/manage-parents', label: 'Manage Parents' },
      { path: '/admin/manage-events', label: 'Manage Events' },
      { path: '/admin/manage-fee', label: 'Manage Fee' },
      { path: '/admin/manage-timetable', label: 'Manage Timetable' },
      { path: '/admin/send-message', label: 'Send Message' }].map((link, index) => (
        <Typography key={index} sx={{ marginY: 1 }}>
          <Link to={link.path} style={{ textDecoration: 'none', color: '#007bff' }}>
            {link.label}
          </Link>
        </Typography>
    ))}
  </Box>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ totalTeachers: 0, totalStudents: 0, totalParents: 0, parentsWithMultipleStudents: 0, totalClasses: 0, totalSubjects: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResources, setShowResources] = useState(false);

  useEffect(() => {
    fetchDashboardData(setCounts, setLoading, setError);
  }, []);

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
        <Typography variant="h4">Admin Dashboard</Typography>
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
          <StatsCard title="Total Students" value={counts.totalStudents} />
          <StatsCard title="Total Parents" value={counts.totalParents} />
          <StatsCard title="Parents with Multiple Students" value={counts.parentsWithMultipleStudents} />
          {/* Add Total Classes and Total Subjects */}
          <StatsCard title="Total Classes" value={counts.totalClasses} />
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
                onClick={() => setShowResources((prev) => !prev)}
                sx={{
                  backgroundColor: '#0cc',
                  color: '#fff',
                  ':hover': { backgroundColor: '#0056b3' },
                }}
              >
                {showResources ? 'Hide Manage Resources' : 'Show Manage Resources'}
              </Button>
            </Box>
            {showResources && (
              <Box sx={{ marginTop: 2 }}>
                <DashboardLinks />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard; // Ensure this is the default export

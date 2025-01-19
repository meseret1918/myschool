import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';


// Function to fetch dashboard data (simulating fetching of student count)
const fetchDashboardData = async (setCounts) => {
    try {
        // Simulate an API call to fetch student count (replace this with actual API call)
        const response = await fetch('http://localhost:5000/api/dashboard'); 
        const data = await response.json();
        setCounts({ totalStudents: data.totalStudents });
    } catch (err) {
        console.error('Failed to fetch dashboard data', err);
    }
};

const Dashboard = () => {
    const [counts, setCounts] = useState({ totalStudents: 0 });
    const [showResources, setShowResources] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        fetchDashboardData(setCounts);
    }, []);

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
                <Typography variant="h4">Teacher Dashboard</Typography>
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

            {/* Total Students Count */}
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
                <Typography variant="h6">Total Students: {counts.totalStudents}</Typography>
            </Box>

            {/* Manage Resources */}
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
                        <Box className="dashboard-links">
                            <ul>
                                <li>
                                    <Link to="/teacher/ViewStudents" style={{ textDecoration: 'none', color: '#007bff' }}>
                                    ViewStudents
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/teacher/manage-marks" style={{ textDecoration: 'none', color: '#007bff' }}>
                                        Manage Marks
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/teacher/manage-attendance" style={{ textDecoration: 'none', color: '#007bff' }}>
                                        Manage Attendance
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/teacher/manage-exams" style={{ textDecoration: 'none', color: '#007bff' }}>
                                        Manage Exams
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/teacher/manage-classes" style={{ textDecoration: 'none', color: '#007bff' }}>
                                        Manage Classes
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/teacher/send-message" style={{ textDecoration: 'none', color: '#007bff' }}>
                                        Send Message
                                    </Link>
                                </li>
                            </ul>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;

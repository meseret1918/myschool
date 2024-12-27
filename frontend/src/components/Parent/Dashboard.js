import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; // Correct relative path

const Dashboard = () => {
    // Simulating role validation (replace with your actual logic)
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'parent') {
        return <p>Access denied. You do not have permission to view this page.</p>;
    }

    return (
        <div className="dashboard">
            <h1>Parent Dashboard</h1>
            <div className="dashboard-links">
                <ul>
                    <li><Link to="/parent/view-teachers">View Teachers</Link></li>
                    <li><Link to="/parent/view-subjects">View Subjects</Link></li>
                    <li><Link to="/parent/view-transport">View Transport</Link></li>
                    <li><Link to="/parent/view-events">View Events</Link></li>
                    <li><Link to="/parent/view-marks">View Marks</Link></li>
                    <li><Link to="/parent/view-attendance">View Attendance</Link></li>
                    <li><Link to="/parent/view-routines">View Routines</Link></li>
                    <li><Link to="/parent/send-message">Send Message</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;

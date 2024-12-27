import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; // Correct relative path

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Teacher Dashboard</h1>
            <div className="dashboard-links">
                <ul>
                    <li><Link to="/teacher/manage-students">Manage Students</Link></li>
                    <li><Link to="/teacher/manage-marks">Manage Marks</Link></li>
                    <li><Link to="/teacher/manage-attendance">Manage Attendance</Link></li>
                    <li><Link to="/teacher/manage-exams">Manage Exams</Link></li>
                    <li><Link to="/teacher/manage-classes">Manage Classes</Link></li>
                    <li><Link to="/teacher/send-message">Send Message</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const AdminDashboard = () => {
  return (
    <div>
      {/* Navbar Section */}
      <div className="navbar">
        <h1>Admin Dashboard</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>

      {/* Dashboard Links Section */}
      <div className="dashboard admin">
        <div className="dashboard-links">
          <ul>
            <li><Link to="/admin/manage-students">Manage Students</Link></li>
            <li><Link to="/admin/manage-teachers">Manage Teachers</Link></li>
            <li><Link to="/admin/manage-parents">Manage Parents</Link></li>
            <li><Link to="/admin/manage-marks">Manage Marks</Link></li>
            <li><Link to="/admin/manage-events">Manage Events</Link></li>
            <li><Link to="/admin/manage-transport">Manage Transport</Link></li>
            <li><Link to="/admin/send-message">Send Message</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/AdminDashboard.css';

// Function to fetch dashboard data
const fetchDashboardData = async (setCounts, setLoading, setError) => {
  try {
    setLoading(true); // Trigger loading state
    const response = await fetch('http://localhost:5000/api/dashboard-stats');
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }

    const data = await response.json(); // Parse response
    setCounts(data); // Set state with the fetched data
  } catch (err) {
    setError(err.message); // Handle error
  } finally {
    setLoading(false); // Complete loading
  }
};

// Stats card component
const DashboardStatsCard = ({ title, value }) => (
  <div className="stats-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

// Dashboard Links component (Navbar)
const DashboardLinks = () => (
  <nav className="navbar-links">
    <ul className="navbar-list">
      <li><Link to="/admin/manage-students" className="navbar-link">Manage Students</Link></li>
      <li><Link to="/admin/manage-teachers" className="navbar-link">Manage Teachers</Link></li>
      <li><Link to="/admin/manage-parents" className="navbar-link">Manage Parents</Link></li>
      <li><Link to="/admin/manage-events" className="navbar-link">Manage Events</Link></li>
      <li><Link to="/admin/send-message" className="navbar-link">Send Message</Link></li>
    </ul>
  </nav>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalParents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData(setCounts, setLoading, setError); // Fetch data when component mounts
  }, []); // Empty array ensures the effect runs only on mount

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      {/* Navbar Section */}
      <nav className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
      </nav>

      {/* Dashboard Stats and Links Section - Flexbox Layout */}
      <section className="dashboard-summary">
        <div className="dashboard-stats">
          <h2 className="dashboard-stats-title">Dashboard Summary</h2>
          <div className="dashboard-stats-info">
            <DashboardStatsCard title="Total Teachers" value={counts.totalTeachers} />
            <DashboardStatsCard title="Total Students" value={counts.totalStudents} />
            <DashboardStatsCard title="Total Parents" value={counts.totalParents} />
          </div>
        </div>

        {/* Dashboard Links Section */}
        <div className="dashboard-links-section">
          <h2 className="dashboard-title">Manage Resources</h2>
          <DashboardLinks />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

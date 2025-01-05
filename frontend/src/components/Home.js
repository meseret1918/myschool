import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // State to track the visibility of the links
  const [showLinks, setShowLinks] = useState(false);

  // Toggle the display of the links
  const handleLearnMoreClick = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="text-center" style={{ paddingBottom: '80px' }}>
      <div className="bg-primary text-white py-5">
        <p className="lead"></p>
        
        {/* Learn More Button */}
        <button onClick={handleLearnMoreClick} className="btn btn-light mt-3">
          Learn More
        </button>
      </div>

      {/* Conditionally render the "Learn More" links */}
      {showLinks && (
        <div className="container mt-5">
          <h2 className="mb-4">Explore More</h2>
          <Link to="/about" className="btn btn-light mt-3">About</Link>
          <Link to="/contact" className="btn btn-light mt-3">Contact</Link>
          <Link to="/services" className="btn btn-light mt-3">Services</Link>
        </div>
      )}

      <div className="container mt-5">
        <h2 className="mb-4">Key Features</h2>
        <div className="row">
          <div className="col-md-4">
            <img src="/admin.png" alt="Admin Dashboard" className="img-fluid rounded" />
            <h5 className="mt-3">Admin Dashboard</h5>
            <p>Manage school operations centrally.</p>
          </div>
          <div className="col-md-4">
            <img src="/courseIc.png" alt="Course Icon" className="img-fluid rounded" />
            <h5 className="mt-3">Course Management</h5>
            <p>Manage and track course details.</p>
          </div>
          <div className="col-md-4">
            <img src="/user.png" alt="User" className="img-fluid rounded" />
            <h5 className="mt-3">User Management</h5>
            <p>Handle user profiles and access.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

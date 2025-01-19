import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data and set logout message
        localStorage.setItem('logoutMessage', 'You have successfully logged out.');
        localStorage.removeItem('currentUser'); // Remove current user
        navigate('/dashboard'); // Redirect to the dashboard
    };

    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Are you sure you want to log out?</h1>
            <button style={{ margin: '10px', padding: '10px 20px', background: 'red', color: 'white' }} onClick={handleLogout}>
                Log Out
            </button>
            <button style={{ margin: '10px', padding: '10px 20px', background: 'gray', color: 'white' }} onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
};

export default Logout;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!username || !password) {
      setError('Both fields are required!');
      return;
    }

    // Dummy login for illustration
    // Here, you would typically validate against an API
    const storedUser = JSON.parse(localStorage.getItem('user')); // Getting the user info from local storage
    
    if (!storedUser || storedUser.username !== username || storedUser.password !== password) {
      setError('Invalid username or password!');
      return;
    }
    // If login is successful, navigate to the dashboard based on role
    navigate(`/${storedUser.role}/dashboard`);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="form-footer">
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;

import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Paper, TextField, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from '../../assets/admin.jpg';
import { LightPurpleButton } from '../buttonStyles';
import styled from 'styled-components';
import Popup from '../Popup';
import axios from 'axios'; // Import axios for making API requests

const defaultTheme = createTheme();

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error and success messages
    setError('');
    setSuccessMessage('');

    // Check for empty fields
    if (!email || !password) {
      setError('Both fields are required!');
      return;
    }

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // If login is successful, save the user data and token to localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token); // Save the token

        setSuccessMessage('Login successful!');
        
        // Redirect to the corresponding role's dashboard
        navigate(`/${response.data.user.role}/dashboard`);
      }
    } catch (error) {
      // Handle errors, such as invalid credentials or server errors
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Invalid email or password!');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#fff',
      fontFamily: "'Arial', sans-serif",
      fontSize: '16px',
      lineHeight: '1.5',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    error: {
      color: '#ff4d4d',
      textAlign: 'center',
      marginBottom: '10px',
      fontSize: '14px',
    },
    success: {
      color: '#28a745',
      textAlign: 'center',
      marginBottom: '10px',
      fontSize: '14px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      fontSize: '14px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    footer: {
      marginTop: '20px',
      textAlign: 'center',
      fontSize: '14px',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontSize: '14px',
    },
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            <Box component="form" noValidate onSubmit={handleLogin}>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="email">Email</label>
                <input
                  style={styles.input}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <TextField
                  style={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <LightPurpleButton
                style={styles.button}
                type="submit"
              >
                Login
              </LightPurpleButton>
              <Grid container>
                <Grid>
                  <p><a style={styles.link} href="/forgot-password">Forgot Password?</a> </p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Popup message={successMessage} setShowPopup={setSuccessMessage} showPopup={successMessage} />
    </ThemeProvider>
  );
};

export default Login;

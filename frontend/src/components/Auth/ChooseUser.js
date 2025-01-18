import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import {
  AccountCircle,
  School,
  Group,
  FamilyRestroom,
} from '@mui/icons-material';
import styled from 'styled-components';

const ChooseUser = ({ visitor }) => {
  const navigate = useNavigate();
  const password = 'zxc';

  const [loader, setLoader] = useState(false);

  const navigateHandler = async (user) => {
    setLoader(true);
    try {
      if (visitor === 'guest') {
        let response;
        if (user === 'Admin') {
          response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'malem@gmail.com', password }),
          });
        } else if (user === 'Student') {
          response = await fetch('/api/student-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollNum: '1', studentName: 'Meseret Alem', password }),
          });
        } else if (user === 'Teacher') {
          response = await fetch('/api/teacher-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'tony@12', password }),
          });
        } else if (user === 'Parent') {
          response = await fetch('/api/parent-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ parentId: '101', parentName: 'John Doe', password }),
          });
        }

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('role', user.toLowerCase());
          navigate(`/${user.toLowerCase()}/dashboard`);
        } else {
          throw new Error(result.message || 'Login failed');
        }
      } else {
        navigate(`/${user}login`);
      }
    } catch (error) {
      alert(error.message || 'Network Error');
    } finally {
      setLoader(false);
    }
  };

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler('Admin')}>
              <StyledPaper elevation={3}>
                <Box mb={2}>
                  <AccountCircle fontSize="large" />
                </Box>
                <StyledTypography>Admin</StyledTypography>
                Login as an administrator to access the dashboard to manage app data.
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler('Student')}>
                <Box mb={2}>
                  <School fontSize="large" />
                </Box>
                <StyledTypography>Student</StyledTypography>
                Login as a student to explore course materials and assignments.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler('Teacher')}>
                <Box mb={2}>
                  <Group fontSize="large" />
                </Box>
                <StyledTypography>Teacher</StyledTypography>
                Login as a teacher to create courses, assignments, and track student progress.
              </div>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledPaper elevation={3}>
              <div onClick={() => navigateHandler('Parent')}>
                <Box mb={2}>
                  <FamilyRestroom fontSize="large" />
                </Box>
                <StyledTypography>Parent</StyledTypography>
                Login as a parent to monitor your child’s academic progress and activities.
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #411d70, #19118b);
  height: 120vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;

  &:hover {
    background-color: #2c2c6c;
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;

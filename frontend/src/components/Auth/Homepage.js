// Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import studentsImage from '../../images/s2.jpg'; // Image path
import { LightPurpleButton } from '../buttonStyles'; // Custom button component

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                    <img src={studentsImage} alt="students" style={{ width: '100%' }} />
                </Grid>

                {/* Content Section */}
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <StyledTitle>
                            Welcome to
                            <br />
                            School Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Simplify school management by organizing classes and adding students and staff effortlessly.
                            Easily monitor attendance, evaluate performance, and share feedback.
                            Access records, review grades, and communicate with ease.
                        </StyledText>
                        <StyledBox>
                            {/* Login Button */}
                            <StyledLink to="/login">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>

                            {/* Sign Up Link */}
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/register" style={{ color: "#55008" }}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const StyledPaper = styled.div`
    padding: 24px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 24px;
`;

const StyledTitle = styled.h1`
    font-size: 2rem;
    color: #252525;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledText = styled.p`
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.1rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

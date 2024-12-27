import React from 'react';

const About = () => {
  return (
    <div id="about" style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        We are a dedicated team focused on building a robust School Management System that streamlines operations and helps educators, students, and parents stay connected.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f4f4f4', // Light gray background
  },
  heading: {
    color: '#007ACC', // Primary blue color
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  paragraph: {
    color: '#333',
    fontSize: '1.2rem',
  }
};

export default About;

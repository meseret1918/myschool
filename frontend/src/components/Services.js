import React from 'react';

const Services = () => {
  return (
    <div id="services" style={styles.container}>
      <h1 style={styles.heading}>Our Services</h1>
      <ul style={styles.list}>
        <li style={styles.listItem}>Student Management</li>
        <li style={styles.listItem}>Teacher Management</li>
        <li style={styles.listItem}>Event Management</li>
        <li style={styles.listItem}>Transport Management</li>
      </ul>
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
  list: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '1.2rem',
  },
  listItem: {
    color: '#333',
    marginBottom: '10px',
  }
};

export default Services;

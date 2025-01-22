import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; Meseret@Alx from Cohort22.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#D9E0F2',
    color: 'blue-black',
    padding: '3px 0',
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
    bottom: '0',
    left: '0',
    zIndex: '1000',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
};

export default Footer;

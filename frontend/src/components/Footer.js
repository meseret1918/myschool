import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Alx @Cohort22.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#41726e',
    color: 'white',
    padding: '2px 0', // Added more padding for better visual appearance
    textAlign: 'center',
    position: 'fixed',
    width: '100%',
    bottom: '0',
    left: '0', // Ensures the footer is aligned to the left edge
    zIndex: '1000', // Makes sure footer is above other elements
  },
};

export default Footer;


import React from 'react';

const Contact = () => {
  return (
    <div id="contact" style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      <p style={styles.paragraph}>Have questions? Feel free to reach out to us!</p>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          style={styles.input}
        />
        <textarea
          placeholder="Your Message"
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    width: '300px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  textarea: {
    padding: '10px',
    width: '300px',
    height: '150px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007ACC',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Contact;

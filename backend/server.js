const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to My School API!');
});

// Sample Attendance Route (Replace with database logic later)
app.get('/api/attendance', (req, res) => {
  // Mock attendance data (replace with actual data from your database)
  const attendance = [
    { studentName: 'John Doe', status: 'Present' },
    { studentName: 'Jane Smith', status: 'Absent' },
    { studentName: 'Alice Johnson', status: 'Present' },
  ];

  res.json(attendance);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

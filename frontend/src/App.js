import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Admin/Dashboard';
import TeacherDashboard from './components/Teacher/Dashboard';
import ParentDashboard from './components/Parent/Dashboard';
import StudentDashboard from './components/Student/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Nav';
import Footer from './components/Footer';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import ManageAttendance from './components/Teacher/ManageAttendance';
import ManageClasses from './components/Teacher/ManageClasses';
import ManageExams from './components/Teacher/ManageExams';
import ManageMarks from './components/Teacher/ManageMarks';
import ManageStudents from './components/Teacher/ManageStudents';
import SendMessage from './components/Teacher/SendMessage';

// Add a Home component
const Home = () => {
  return <div>Welcome to the Home Page</div>;
};

// Add an Attendance component
const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance data from the backend
    fetch('http://localhost:5000/api/attendance')
      .then(response => response.json())
      .then(data => setAttendanceData(data))
      .catch(error => console.error('Error fetching attendance data:', error));
  }, []);

  return (
    <div>
      <h3>Attendance</h3>
      <ul>
        {attendanceData.map((attendance, index) => (
          <li key={index}>
            {attendance.studentName} - {attendance.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const isAuthenticated = true; 
  const role = 'admin';

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} role={role} />

      <div className="container" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 120px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute role="admin" component={AdminDashboard} />}
          />
          <Route
            path="/teacher/dashboard"
            element={<ProtectedRoute role="teacher" component={TeacherDashboard} />}
          />
          <Route
            path="/parent/dashboard"
            element={<ProtectedRoute role="parent" component={ParentDashboard} />}
          />
          <Route
            path="/student/dashboard"
            element={<ProtectedRoute role="student" component={StudentDashboard} />}
          />

          <Route
            path="/teacher/dashboard/manage-attendance"
            element={<ProtectedRoute role="teacher" component={ManageAttendance} />}
          />
          <Route
            path="/teacher/dashboard/manage-classes"
            element={<ProtectedRoute role="teacher" component={ManageClasses} />}
          />
          <Route
            path="/teacher/dashboard/manage-exams"
            element={<ProtectedRoute role="teacher" component={ManageExams} />}
          />
          <Route
            path="/teacher/dashboard/manage-marks"
            element={<ProtectedRoute role="teacher" component={ManageMarks} />}
          />
          <Route
            path="/teacher/dashboard/manage-students"
            element={<ProtectedRoute role="teacher" component={ManageStudents} />}
          />
          <Route
            path="/teacher/dashboard/send-message"
            element={<ProtectedRoute role="teacher" component={SendMessage} />}
          />

          <Route path="/attendance" element={<Attendance />} /> {/* Add attendance route */}

          <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';

// Dashboard Components
import AdminDashboard from './components/Admin/Dashboard';
import TeacherDashboard from './components/Teacher/Dashboard';
import ParentDashboard from './components/Parent/Dashboard';
import StudentDashboard from './components/Student/Dashboard';

// Admin Management Components
import ManageStudents from './components/Admin/ManageStudents';
import ManageTeachers from './components/Admin/ManageTeachers';
import ManageParents from './components/Admin/ManageParents';
import ManageEvents from './components/Admin/ManageEvents';
import AddStudentForm from './components/Admin/AddStudentForm';
import AddEvent from './components/Admin/AddEvent';
import EditEvent from './components/Admin/EditEvent';
import DeleteEvent from './components/Admin/DeleteEvent';
import AddTeacher from './components/Admin/AddTeacher';
import EditTeacher from './components/Admin/EditTeacher';

// Teacher Management Components
import ManageMarks from './components/Teacher/ManageMarks';
import SendMessageTeacher from './components/Teacher/SendMessage';
import ManageAttendance from './components/Teacher/ManageAttendance';
import ManageClasses from './components/Teacher/ManageClasses';
import ManageExams from './components/Teacher/ManageExams';

// Parent Management Components
import SendMessageParent from './components/Parent/SendMessage'; // Ensure this is defined
import ViewAttendance from './components/Parent/ViewAttendance';
import ViewEvents from './components/Parent/ViewEvents';
import ViewMarks from './components/Parent/ViewMarks';
import ViewRoutines from './components/Parent/ViewRoutines';
import ViewSubjects from './components/Parent/ViewSubjects';
import ViewTeachers from './components/Parent/ViewTeachers';
import ViewTransport from './components/Parent/ViewTransport';

// Admin-specific Components
import SendMessageAdmin from './components/Admin/SendMessage';

// ProtectedRoute Component
import ProtectedRoute from './components/ProtectedRoute';

// Student Edit and Delete Components
import EditStudentForm from './components/Admin/EditStudentForm';

const App = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
  const role = localStorage.getItem('role') || '';

  const renderProtectedRoute = (role, Component) => (
    <ProtectedRoute isAuthenticated={isAuthenticated} role={role}>
      <Component />
    </ProtectedRoute>
  );

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} role={role} />
      <main className="container" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 120px)' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes for Admin */}
          <Route path="/admin/dashboard" element={renderProtectedRoute("admin", AdminDashboard)} />
          <Route path="/admin/manage-students" element={renderProtectedRoute("admin", ManageStudents)} />
          <Route path="/admin/manage-teachers" element={renderProtectedRoute("admin", ManageTeachers)} />
          <Route path="/admin/manage-parents" element={renderProtectedRoute("admin", ManageParents)} />
          <Route path="/admin/manage-events" element={renderProtectedRoute("admin", ManageEvents)} />
          <Route path="/admin/add-student" element={renderProtectedRoute("admin", AddStudentForm)} />
          <Route path="/admin/add-event" element={renderProtectedRoute("admin", AddEvent)} />
          <Route path="/admin/edit-event/:eventId" element={renderProtectedRoute("admin", EditEvent)} />
          <Route path="/admin/delete-event/:eventId" element={renderProtectedRoute("admin", DeleteEvent)} />
          <Route path="/admin/add-teacher" element={renderProtectedRoute("admin", AddTeacher)} />
          <Route path="/admin/edit-teacher/:id" element={renderProtectedRoute("admin", EditTeacher)} />
          <Route path="/admin/send-message" element={renderProtectedRoute("admin", SendMessageAdmin)} />

          {/* Routes for Editing and Deleting Students */}
          <Route path="/admin/edit-student/:id" element={renderProtectedRoute("admin", EditStudentForm)} />

          {/* Protected Routes for Teacher */}
          <Route path="/teacher/dashboard" element={renderProtectedRoute("teacher", TeacherDashboard)} />
          <Route path="/teacher/manage-students" element={renderProtectedRoute("teacher", ManageStudents)} />
          <Route path="/teacher/manage-marks" element={renderProtectedRoute("teacher", ManageMarks)} />
          <Route path="/teacher/send-message" element={renderProtectedRoute("teacher", SendMessageTeacher)} />
          <Route path="/teacher/manage-attendance" element={renderProtectedRoute("teacher", ManageAttendance)} />
          <Route path="/teacher/manage-classes" element={renderProtectedRoute("teacher", ManageClasses)} />
          <Route path="/teacher/manage-exams" element={renderProtectedRoute("teacher", ManageExams)} />

          {/* Protected Routes for Parent */}
          <Route path="/parent/dashboard" element={renderProtectedRoute("parent", ParentDashboard)} />
          <Route path="/parent/send-message" element={renderProtectedRoute("parent", SendMessageParent)} />
          <Route path="/parent/view-attendance" element={renderProtectedRoute("parent", ViewAttendance)} />
          <Route path="/parent/view-events" element={renderProtectedRoute("parent", ViewEvents)} />
          <Route path="/parent/view-marks" element={renderProtectedRoute("parent", ViewMarks)} />
          <Route path="/parent/view-routines" element={renderProtectedRoute("parent", ViewRoutines)} />
          <Route path="/parent/view-subjects" element={renderProtectedRoute("parent", ViewSubjects)} />
          <Route path="/parent/view-teachers" element={renderProtectedRoute("parent", ViewTeachers)} />
          <Route path="/parent/view-transport" element={renderProtectedRoute("parent", ViewTransport)} />

          {/* Fallback Route for 404 */}
          <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}><h1>404</h1><p>Page Not Found</p></div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

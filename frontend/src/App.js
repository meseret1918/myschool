import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Homepage from './components/Auth/Homepage';

// Auth Components
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/AdminRegisterPage';
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
import AddParentForm from './components/Admin/AddParentForm';
import EditParentForm from './components/Admin/EditParentForm';

// Teacher Management Components
import ManageMarks from './components/Teacher/ManageMarks';
import ViewStudents from './components/Teacher/ViewStudents';
import SendMessageTeacher from './components/Teacher/SendMessage';
import ManageAttendance from './components/Teacher/ManageAttendance';
import ManageClasses from './components/Teacher/ManageClasses';
import ManageExams from './components/Teacher/ManageExams';
import EditAttendance from './components/Teacher/EditAttendance';
import AddAttendance from './components/Teacher/AddAttendance';
import AddMark from './components/Teacher/AddMark';  // Import AddMark
import EditMark from './components/Teacher/EditMark';  // Import EditMark

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
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
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

          {/* Updated Routes for Add/Edit Parent */}
          <Route path="/admin/add-parent" element={renderProtectedRoute("admin", AddParentForm)} />
          <Route path="/admin/edit-parent/:id" element={renderProtectedRoute("admin", EditParentForm)} />

          {/* Routes for Editing and Deleting Students */}
          <Route path="/admin/edit-student/:id" element={renderProtectedRoute("admin", EditStudentForm)} />
          <Route path="/teacher/edit-attendance/:id" element={renderProtectedRoute("teacher", EditAttendance)} />
          <Route path="/teacher/add-attendance" element={renderProtectedRoute("teacher", AddAttendance)} />

          {/* Protected Routes for Teacher */}
          <Route path="/teacher/dashboard" element={renderProtectedRoute("teacher", TeacherDashboard)} />
          <Route path="/teacher/ViewStudents" element={renderProtectedRoute("teacher", ViewStudents)} />
          <Route path="/teacher/manage-marks" element={renderProtectedRoute("teacher", ManageMarks)} />
          <Route path="/teacher/send-message" element={renderProtectedRoute("teacher", SendMessageTeacher)} />
          <Route path="/teacher/manage-attendance" element={renderProtectedRoute("teacher", ManageAttendance)} />
          <Route path="/teacher/manage-classes" element={renderProtectedRoute("teacher", ManageClasses)} />
          <Route path="/teacher/manage-exams" element={renderProtectedRoute("teacher", ManageExams)} />
          
          {/* Routes for Adding and Editing Marks */}
          <Route path="/teacher/add-mark" element={renderProtectedRoute("teacher", AddMark)} />  {/* AddMark route */}
          <Route path="/teacher/edit-mark/:id" element={renderProtectedRoute("teacher", EditMark)} />  {/* EditMark route */}

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
    </Router>
  );
};

export default App;

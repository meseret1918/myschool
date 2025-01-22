import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from "./components/Footer"
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
import ManageFee from './components/Admin/ManageFee';
import ManageTimetable from './components/Admin/ManageTimetable';
import AddTimetable from './components/Admin/AddTimetable';
import EditTimetable from './components/Admin/EditTimetable';
import SendMessageAdmin from './components/Admin/SendMessage';

import AddFee from './components/Admin/AddFee';
import EditFee from './components/Admin/EditFee';

// Teacher Management Components
import ManageMarks from './components/Teacher/ManageMarks';
import ViewStudents from './components/Teacher/ViewStudents';
import SendMessageTeacher from './components/Teacher/SendMessage';
import ManageAttendance from './components/Teacher/ManageAttendance';
import ManageClasses from './components/Teacher/ManageClasses';
import ManageExams from './components/Teacher/ManageExams';
import EditAttendance from './components/Teacher/EditAttendance';
import AddAttendance from './components/Teacher/AddAttendance';
import AddMark from './components/Teacher/AddMark';
import EditMark from './components/Teacher/EditMark';
import AddClass from './components/Teacher/AddClass';
import EditClass from './components/Teacher/EditClass';
import ViewTimetableTeacher from './components/Teacher/ViewTimetable';


// Parent Management Components
import SendMessageParent from './components/Parent/SendMessage';
import ViewEventsParent from './components/Parent/ViewEvents';
import ViewMarksParent from './components/Parent/ViewMarks';
import ViewSubjectsParent from './components/Parent/ViewSubjects';
import ViewTeachersParent from './components/Parent/ViewTeachers';
import ViewAttendanceParent from './components/Parent/ViewAttendance';
import ViewTimetableParent from './components/Parent/ViewTimetable';
import ViewFees from './components/Parent/ViewFees';

// Student Management Components
import SendMessageStudent from './components/Student/SendMessage';
import ViewEventsStudent from './components/Student/ViewEvents';
import ViewMarksStudent from './components/Student/ViewMarks';
import ViewSubjectsStudent from './components/Student/ViewSubjects';
import ViewTeachersStudent from './components/Student/ViewTeachers';
import ViewAttendanceStudent from './components/Student/ViewAttendance';
import ViewTimetableStudent from './components/Student/ViewTimetable';


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
      <main className="container" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 160px)', paddingBottom: '60px' }}>
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
          <Route path="/admin/add-parent" element={renderProtectedRoute("admin", AddParentForm)} />
          <Route path="/admin/edit-parent/:id" element={renderProtectedRoute("admin", EditParentForm)} />
          <Route path="/admin/edit-student/:id" element={renderProtectedRoute("admin", EditStudentForm)} />
          <Route path="/teacher/edit-attendance/:id" element={renderProtectedRoute("teacher", EditAttendance)} />
          <Route path="/teacher/add-attendance" element={renderProtectedRoute("teacher", AddAttendance)} />

          <Route path="/admin/manage-fee" element={renderProtectedRoute("admin", ManageFee)} />
          <Route path="/admin/add-fee" element={renderProtectedRoute("admin", AddFee)} />
          <Route path="/admin/edit-fee/:id" element={renderProtectedRoute("admin", EditFee)} />
          <Route path="/admin/manage-timetable" element={renderProtectedRoute("admin", ManageTimetable)} />
          <Route path="/admin/add-timetable" element={renderProtectedRoute("admin", AddTimetable)} />
          <Route path="/admin/edit-timetable/:id" element={renderProtectedRoute("admin", EditTimetable)} />

          {/* Protected Routes for Teacher */}
          <Route path="/teacher/dashboard" element={renderProtectedRoute("teacher", TeacherDashboard)} />
          <Route path="/teacher/ViewStudents" element={renderProtectedRoute("teacher", ViewStudents)} />
          <Route path="/teacher/manage-marks" element={renderProtectedRoute("teacher", ManageMarks)} />
          <Route path="/teacher/send-message" element={renderProtectedRoute("teacher", SendMessageTeacher)} />
          <Route path="/teacher/manage-attendance" element={renderProtectedRoute("teacher", ManageAttendance)} />
          <Route path="/teacher/manage-classes" element={renderProtectedRoute("teacher", ManageClasses)} />
          <Route path="/teacher/manage-exams" element={renderProtectedRoute("teacher", ManageExams)} />
          <Route path="/teacher/add-mark" element={renderProtectedRoute("teacher", AddMark)} />
          <Route path="/teacher/edit-mark/:id" element={renderProtectedRoute("teacher", EditMark)} />
          <Route path="/teacher/add-class" element={renderProtectedRoute("teacher", AddClass)} />
          <Route path="/teacher/edit-class/:id" element={renderProtectedRoute("teacher", EditClass)} />
          <Route path="/teacher/view-timetable" element={renderProtectedRoute("teacher", ViewTimetableTeacher)} />

          {/* Protected Routes for Parent */}
          <Route path="/parent/dashboard" element={renderProtectedRoute("parent", ParentDashboard)} />
          <Route path="/parent/send-message" element={renderProtectedRoute("parent", SendMessageParent)} />
          <Route path="/parent/view-attendance" element={renderProtectedRoute("parent", ViewAttendanceParent)} />
          <Route path="/parent/view-events" element={renderProtectedRoute("parent", ViewEventsParent)} />
          <Route path="/parent/view-marks" element={renderProtectedRoute("parent", ViewMarksParent)} />
          <Route path="/parent/view-subjects" element={renderProtectedRoute("parent", ViewSubjectsParent)} />
          <Route path="/parent/view-teachers" element={renderProtectedRoute("parent", ViewTeachersParent)} />
          <Route path="/parent/view-timetable" element={renderProtectedRoute("parent", ViewTimetableParent)} />
          <Route path="/parent/view-fees" element={renderProtectedRoute("parent", ViewFees)} />

          {/* Protected Routes for Student */}
          <Route path="/student/dashboard" element={renderProtectedRoute("student", StudentDashboard)} />
          <Route path="/student/send-message" element={renderProtectedRoute("student", SendMessageStudent)} />
          <Route path="/student/view-attendance" element={renderProtectedRoute("student", ViewAttendanceStudent)} />
          <Route path="/student/view-events" element={renderProtectedRoute("student", ViewEventsStudent)} />
          <Route path="/student/view-marks" element={renderProtectedRoute("student", ViewMarksStudent)} />
          <Route path="/student/view-subjects" element={renderProtectedRoute("student", ViewSubjectsStudent)} />
          <Route path="/student/view-teachers" element={renderProtectedRoute("student", ViewTeachersStudent)} />
          <Route path="/student/view-timetable" element={renderProtectedRoute("student", ViewTimetableStudent)} />

          {/* Fallback Route for 404 */}
          <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}><h1>404</h1><p>Page Not Found</p></div>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
import React from "react";
import PropTypes from "prop-types";
import "./student.css"; // Add your CSS for styling

const Student = ({ name, permissions = [] }) => {
  // Check if student has the specific permission
  const hasPermission = (permission) => permissions.includes(permission);

  return (
    <div className="student-container">
      <h1>Welcome, {name}</h1>

      <div className="permissions">
        {hasPermission("ViewTimetable") && <p>📅 View Timetable</p>}
        {hasPermission("ViewGrades") && <p>📊 View Grades</p>}
        {hasPermission("SubmitAssignments") && <p>✏️ Submit Assignments</p>}
        {hasPermission("ViewAttendance") && <p>✅ Check Attendance</p>}
        {hasPermission("AccessLibrary") && <p>📚 Access Library</p>}
        {hasPermission("ViewEvents") && <p>🎉 View Events</p>}
        {hasPermission("UpdateProfile") && <p>🔄 Update Profile</p>}

        {/* Fallback if no permissions are granted */}
        {permissions.length === 0 && (
          <p>You currently have no permissions assigned. Please contact your administrator.</p>
        )}
      </div>
    </div>
  );
};

// Define prop types for validation
Student.propTypes = {
  name: PropTypes.string.isRequired,
  permissions: PropTypes.arrayOf(PropTypes.string),
};

export default Student;

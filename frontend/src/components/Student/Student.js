// Student.js
import React from "react";
import { studentPermissions } from "./permissions";

const Student = ({ name }) => {
  const hasPermission = (permission) => studentPermissions.includes(permission);

  return (
    <div>
      <h1>Welcome, {name}</h1>

      <div>
        {hasPermission("ViewTimetable") && <p>📅 View Timetable</p>}
        {hasPermission("ViewGrades") && <p>📊 View Grades</p>}
        {hasPermission("SubmitAssignments") && <p>✏️ Submit Assignments</p>}
        {hasPermission("ViewAttendance") && <p>✅ Check Attendance</p>}
        {hasPermission("AccessLibrary") && <p>📚 Access Library</p>}
        {hasPermission("ViewEvents") && <p>🎉 View Events</p>}
        {hasPermission("UpdateProfile") && <p>🔄 Update Profile</p>}
      </div>
    </div>
  );
};

export default Student;

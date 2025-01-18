import React from "react";
//import Navbar from "./Navbar"; <Navbar isAuthenticated={isAuthenticated} role={role} />
import { useLocation } from "react-router-dom";

const Header = ({ isAuthenticated, role }) => {
  const location = useLocation();

  const getHeaderValue = () => {
    switch (location.pathname) {
      case "/":
        return "SCHOOL APP";
      case "/login":
        return "Login Page";
      case "/AdminRegisterPage":
        return "Register Here";
        case "/ForgotPassword":
          return "Reset ForgotPassword";
      case `/${role}/Admin`:
        return "Welcome to AdminDashboard";
      case `/${role}/Teacher`:
        return "Welcome to TeacherDashboard";
      case `/${role}/Parent`:
        return "Welcome to ParentDashboard";
      case `/${role}/Student`:
        return "Welcome to StudentDashboard";
      // No default value provided
    }
  };

  return (
    <header>
      
      <div style={{ backgroundColor: "#f8f9fa", padding: "0.05px 10px" }}>
        <h1>{getHeaderValue()}</h1>
      </div>
    </header>
  );
};

// Ensure this export is in place for proper usage elsewhere
export default Header;

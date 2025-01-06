import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Header = ({ isAuthenticated, role }) => {
  const location = useLocation();

  const getHeaderValue = () => {
    switch (location.pathname) {
      case "/":
        return "Welcome to School App";
      case "/login":
        return "Login Page";
      case "/register":
        return "Register Here";
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
      <Navbar isAuthenticated={isAuthenticated} role={role} />
      <div style={{ backgroundColor: "#f8f9fa", padding: "0.05px 10px" }}>
        <h1>{getHeaderValue()}</h1>
      </div>
    </header>
  );
};

// Ensure this export is in place for proper usage elsewhere
export default Header;

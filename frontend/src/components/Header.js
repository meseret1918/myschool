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
        return "Welcome to Admin Dashboard";
      case `/${role}/Teacher`:
        return "Welcome to Teacher Dashboard";
      case `/${role}/Parent`:
        return "Welcome to Parent Dashboard";
      case `/${role}/Student`:
        return "Welcome to Student Dashboard";
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
    window.location.href = "/logout";
  };

  return (
    <header>
      <Navbar isAuthenticated={isAuthenticated} role={role} />
      <div
        style={{
          backgroundColor: "#f8f9fa",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for visibility
          zIndex: 1, // Ensure it's on top
        }}
      >
        <h1 style={{ margin: 0 }}>{getHeaderValue()}</h1>

        {/* Logout Button */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#41726e",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              zIndex: 10, // Ensure visibility above other components
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

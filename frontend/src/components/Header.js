import React from "react";
import { useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Header = ({ isAuthenticated, role }) => {
  const location = useLocation();

  const getHeaderValue = () => {
    switch (location.pathname) {
      case "/":
        return "School App";
      case "/Homepage":
        return "Welcome Homepage";
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
      default:
        return "School App"; // Default fallback for unknown routes
    }
  };

  return (
    <header>
      <div style={styles.headerContainer}>
        {/* Logo Section */}
        <img src="/logo512.png" alt="Logo" style={styles.logo} />
        <h3 style={styles.title}>{getHeaderValue()}</h3>
        {/* Homepage Icon */}
        <FaHome
          style={styles.homepageIcon}
          onClick={() => (window.location.href = "/")} // Redirect to the homepage
          title="Go to Homepage"
        />
      </div>
    </header>
  );
};

// Define styles in an object to improve readability
const styles = {
  headerContainer: {
    backgroundColor: "#c0", // LightPurple color
    padding: "4px 8px", // Adjusted padding for visual clarity
    display: "flex",
    alignItems: "center",
    color: "#fff", // White color for text
  },
  logo: {
    height: "30px",
    marginRight: "7px",
  },
  title: {
    flexGrow: 1, // Push the homepage icon to the far right
    margin: 0,
  },
  homepageIcon: {
    fontSize: "24px", // Adjust icon size
    color: "#fff", // White color for the icon
    cursor: "pointer",
    fontWeight: "bold",
    
  },
};

export default Header;

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
        return "School App";
    }
  };

  return (
    <header>
      <div style={styles.headerContainer}>
        <img src="/logo512.png" alt="Logo" style={styles.logo} />
        <h3 style={styles.title}>{getHeaderValue()}</h3>
        <FaHome
          style={styles.homepageIcon}
          onClick={() => (window.location.href = "/")}
          title="Go to Homepage"
        />
      </div>
    </header>
  );
};

const styles = {
  headerContainer: {
    backgroundColor: "#9C33FF",
    padding: "4px 8px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  logo: {
    height: "30px",
    marginRight: "7px",
  },
  title: {
    flexGrow: 1,
    margin: 0,
  },
  homepageIcon: {
    fontSize: "24px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Header;
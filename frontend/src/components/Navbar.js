import React from "react";

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#41726e" }}>
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src={process.env.PUBLIC_URL + "/logo512.png"}
            alt="Logo"
            style={{ height: "30px", marginRight: "10px" }}
          />
          <span className="text-white fw-bold">School App</span>
        </a>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">
                <i className="fas fa-home" style={{ fontSize: "24px", marginRight: "5px" }}></i>
                Home
              </a>
            </li>

            {/* Conditional Links */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/login">
                    <i className="fas fa-user-circle" style={{ fontSize: "24px", marginRight: "5px" }}></i>
                    Login
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/logout">
                    <i className="fas fa-sign-out-alt" style={{ fontSize: "24px", marginRight: "5px" }}></i>
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";

const Header = ({ isAuthenticated, role }) => {
  return (
    <header>
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
                  Home
                </a>
              </li>

              {/* Conditional Links */}
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    {/* Login Icon and Text */}
                    <a className="nav-link text-white" href="/login">
                      <i className="fas fa-user-circle" style={{ fontSize: "24px", marginRight: "8px" }}></i>
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    {/* Register link can go here if needed */}
                    <a className="nav-link text-white" href="/register"></a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link text-white" href={`/${role}/dashboard`}>
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/logout">
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

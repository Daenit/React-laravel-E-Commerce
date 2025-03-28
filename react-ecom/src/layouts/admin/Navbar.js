import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    alert('Logged out');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
      <div className="container-fluid">
        <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
          <div className="input-group">
            <div className="input-group-prepend">
              <button type="submit" className="btn btn-search pe-1">
                <i className="fa fa-search search-icon"></i>
              </button>
            </div>
            <input type="text" placeholder="Search ..." className="form-control" />
          </div>
        </nav>

        <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
          {/* Message Icon */}
          <li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
            <to className="nav-to dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false" aria-haspopup="true">
              <i className="fa fa-search"></i>
            </to>
            <ul className="dropdown-menu dropdown-search animated fadeIn">
              <form className="navbar-left navbar-form nav-search">
                <div className="input-group">
                  <input type="text" placeholder="Search ..." className="form-control" />
                </div>
              </form>
            </ul>
          </li>

          {/* Notifications and User Profile */}
          <li className="nav-item topbar-user dropdown hidden-caret">
            <Link className="dropdown-toggle profile-pic" data-bs-toggle="dropdown" href="#" aria-expanded="false">
              <div className="avatar-sm">
                <img src="assets/img/profile.jpg" alt="..." className="avatar-img rounded-circle" />
              </div>
              <span className="profile-username">
                <span className="op-7">Hi,</span>
                <span className="fw-bold">Hizrian</span>
              </span>
            </Link>
            <ul className="dropdown-menu dropdown-user animated fadeIn">
              <div className="dropdown-user-scroll scrollbar-outer">
                <li>
                  <div className="user-box">
                    <div className="avatar-lg">
                      <img src="assets/img/profile.jpg" alt="image profile" className="avatar-img rounded" />
                    </div>
                    <div className="u-text">
                      <h4>Hizrian</h4>
                      <p className="text-muted">hello@example.com</p>
                      <a href="profile.html" className="btn btn-xs btn-secondary btn-sm">View Profile</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                  <to className="dropdown-item" href="#">My Profile</to>
                  <to className="dropdown-item" href="#">My Balance</to>
                  <to className="dropdown-item" href="#">Inbox</to>
                  <div className="dropdown-divider"></div>
                  <to className="dropdown-item" href="#">Account Setting</to>
                  <div className="dropdown-divider"></div>
                  <to className="dropdown-item" onClick={handleLogout}>Logout</to> {/* Logout Button */}
                </li>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

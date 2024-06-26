import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../img/coachifylogo.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is included


// const APP = process.env.REACT_APP_API_URL;

function Header({ title, showNotifications }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileName, setProfileName] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Dropdown data
  const notificationDropdownData = [
    { id: 1, title: "Notification 1" },
    { id: 2, title: "Notification 2" },
    { id: 3, title: "Notification 3" }
  ];

  const messageDropdownData = [
    { id: 1, title: "Message 1" },
    { id: 2, title: "Message 2" },
    { id: 3, title: "Message 3" }
  ];

  useEffect(() => {
       // Fetch the user's profile
    const fetchProfileName = async () => {
      try {
        const response = await fetch(`/api/profile`, {
          headers: {
            'x-auth-token': localStorage.getItem('token'), // Assuming you store the token in localStorage
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfileName(data.name); // Assuming the response has a 'name' field
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };


    fetchProfileName();
  }, []);

  return (
    <header id="header" className={`header fixed-top d-flex align-items-center ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="d-flex align-items-center justify-content-between w-100">
        <Link to="/" className="logo d-flex align-items-center">
          <img src={logo} alt="Coachify Logo" className="coachify-logo" />
        </Link>
        <div className="admin-panel-text">
          <span className="d-none d-lg-block" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {title}
          </span>
        </div>
        <div className="header-nav-wrapper">
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              <li className="nav-item d-block d-lg-none">
                <a className="nav-link nav-icon search-bar-toggle" href="#">
                  <i className="bi bi-search"></i>
                </a>
              </li>

              {showNotifications && (
                <li className="nav-item dropdown">
                  <a className="nav-link nav-icon dropdown-toggle" href="#" id="navbarDropdownNotification" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-bell"></i>
                    <span className="badge bg-primary badge-number">4</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownNotification">
                    {notificationDropdownData.map(item => (
                      <li key={item.id}><span className="dropdown-item">{item.title}</span></li>
                    ))}
                  </ul>
                </li>
              )}

              <li className="nav-item dropdown pe-3">
                <a className="nav-link nav-profile dropdown-toggle d-flex align-items-center pe-0" href="#" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                  <span className="d-none d-md-block ps-2">{profileName}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownProfile">
                  <li className="dropdown-header">
                    <h6>{profileName}</h6>
                    <span>Web Developer</span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/ProfilePage">
                      <i className="bi bi-person"></i>
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/settings">
                      <i className="bi bi-gear"></i>
                      <span>Settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/logout">
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "./img/PediaCare.png";
import "./index.css";

//start heregit

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [childName, setChildName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user object from localStorage
    if (user) {
      setIsLoggedIn(true);
      setChildName(user.childName); // Assume `childName` is a key in the user object
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setChildName("");
    navigate('/Home');
  };

  return (
    <div className="container-fluid position-sticky z-3 top-0 start mx-auto">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src={Logo} className="logo-img mx-4" alt="Logo" />
          <h1 className="mx-2 web-name">PediaCare</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav w-75 justify-content-evenly">
              <Link to="/Home" className="fs-4 mx-3 nav-link active" aria-current="page">
                Home
              </Link>
              <Link to="/Service" className="fs-4 mx-3 nav-link active" aria-current="page">
                Services
              </Link>
              <div className="fs-4 mx-3 nav-link dropdown">
                <a
                  className="nav-link dropdown-toggle p-0"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Settings
                </a>
                <ul className="dropdown-menu position-absolute">
                  <li>
                    <a className="fs-4 dropdown-item" href="#">
                      Appointment
                    </a>
                  </li>
                  <li>
                    <a className="fs-4 dropdown-item" href="#">
                      Account
                    </a>
                  </li>
                  <li>
                    <a className="fs-4 dropdown-item" href="#">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a className="fs-4 dropdown-item" onClick={handleLogout} href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
              {isLoggedIn ? (
                <span className="fs-4 mx-3 nav-link text-primary">
                  {childName}
                </span>
              ) : null}
              <Link
                to="/Login"
                className="fs-4 mx-3 nav-link"
                style={{ display: isLoggedIn ? "none" : "block" }}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

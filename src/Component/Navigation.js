import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import '../Component/Css/Navigation.css';

const ResponsiveNavbar = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
  const handleResize = () => {
    setIsWideScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(true);

  const handleCloseNotification = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="notification">
          <p>We are now in Beta!</p>
          <span onClick={handleCloseNotification}>
            <MdCancel />
          </span>
        </div>
      )}


      <nav>
        <div className="navbar">
          <div className="navbar-brand">
            <a href="/">
              <img src="/logo.png" alt="Logo" />
            </a>
          </div>

          {isWideScreen ? (
            <div className="navbar-menu">
              <div className="navbar-links">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/features">Features</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="navbar-auth">
                <a href="/login" className="btn btn-secondary">
                  Log In
                </a>
                <a href="/signup" className="btn btn-primary">
                  Sign Up
                </a>
              </div>
            </div>
          ) : (
            <div className="navbar-menu-2">
              <input className="hidden" id="drawer-input" type="checkbox" />
              <label htmlFor="drawer-input" className="drawer-open">
                <span></span>
              </label>
              
              <div className="nav-content">
                <div className="navbar-links">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/features">Features</a>
                    </li>
                    <li>
                      <a href="/about">About</a>
                    </li>
                    <li>
                      <a href="/contact">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="navbar-auth">
                  <a href="/login" className="btn btn-secondary">
                    Log In
                  </a>
                  <a href="/signup" className="btn btn-primary">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          )}
        </div >
      </nav>

    </>
  );
};

export default ResponsiveNavbar;

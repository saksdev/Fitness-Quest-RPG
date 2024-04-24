import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import '../Component/Css/Navigation.css';


const ResponsiveNavbar = () => {

  const [isVisible, setIsVisible] = useState(true);
  const handleCloseNotification = () => {
    setIsVisible(false);
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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

  return (
    <nav>
      {isVisible && (
        <div className="notification">
          <p>We are now in Beta!</p>
          <span onClick={handleCloseNotification}>
            <MdCancel />
          </span>
        </div>
      )}

      <div className="navbar">
        <div className="navbar-brand">
          <a href="/">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div>

        {isWideScreen ? (
          <div className="navbar-menu">
            <ul className='navbar-links'>
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
            <input className="hidden" id="drawer-input" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <label htmlFor="drawer-input" className="drawer-open">
              <span></span>
            </label>
            {isChecked && (
              <div className="nav-links-2">
                <a href="/">Home</a>
                <a href="/features">Features</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/login" className="btn btn-secondary">Log In</a>
                <a href="/signup" className="btn btn-primary">Sign Up</a>
              </div>
            )}
          </div>
        )}
      </div >
    </nav>
  );
};

export default ResponsiveNavbar;
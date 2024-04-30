import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        {isWideScreen ? (
          <div className="navbar-menu">
            <ul className='navbar-links'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/features'>Features</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
            </ul>
            <div className="navbar-auth">
              <Link to='/Login' className="btn btn-secondary">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <div className="navbar-menu-2">
            <input
              className="hidden"
              id="drawer-input"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="drawer-input" className="drawer-open">
              <span></span>
            </label>
            {isChecked && (
              <div className="nav-links-2">
                <Link to="/">Home</Link>
                <Link to="/features">Features</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login" className="btn btn-secondary">
                  Log In
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
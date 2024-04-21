import React, { useState } from 'react';
import '../Component/Css/Navigation.css';
import { MdCancel } from "react-icons/md";

const Notification = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="notification">
          <p>We are now in Beta!</p>
          {/* <p>We are now in Beta! Join our <a href='httpe://discord.com'>Discord</a>.</p> */}
          <span onClick={handleClose}><MdCancel /></span>
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="/">
            <img src="/logo.png" alt="Logo" title='Fitness Quest RPG'/>
          </a>
        </div>
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
      </nav>
    </>
  );
};

export default Notification;

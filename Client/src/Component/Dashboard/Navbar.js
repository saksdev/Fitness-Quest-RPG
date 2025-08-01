import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";

import '../Css/Dashboard/Navbar.css';
import logo from '../../img/nav-logo.svg';

const Navbar = ({ userName, handleLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Close dropdown when clicking outside dropdown or avatar
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    // Close dropdown on pressing Escape key
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Close dropdown on navigation change
  useEffect(() => {
    setDropdownVisible(false);
  }, [location.pathname]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const isProfilePage = location.pathname === '/dashboard/profile';

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-left">
          {isProfilePage && (
            <button onClick={handleBackClick} className="dashboard-btn" aria-label="Go back">
              Back
            </button>
          )}
        </div>
        <div className="header-center">
          {isProfilePage && (
            <img
              src={logo}
              onClick={handleLogoClick}
              alt="Logo"
              className="header-logo"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') handleLogoClick(); }}
            />
          )}
        </div>
        <div className="header-right">
          <span className="profile-btn">
            <span className='profile-username'>
              <span className='profile-username-text'>Hello, </span>
              {userName}
            </span>
            <div
              className="header__avatar"
              onClick={toggleDropdown}
              ref={avatarRef}
              aria-haspopup="true"
              aria-expanded={dropdownVisible}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleDropdown();
                }
              }}
            >
              {dropdownVisible && (
                <div className="dropdown dropdown--active" ref={dropdownRef}>
                  <ul className="dropdown__list">
                    <li className="dropdown__list-item">
                      <Link to='/dashboard/profile' className="dropdown__link" tabIndex={dropdownVisible ? 0 : -1}>
                        <span className="dropdown__icon"><MdAccountCircle /></span>
                        <span className="dropdown__title">My Profile</span>
                      </Link>
                    </li>
                    <li className="dropdown__list-item">
                      <Link to='/dashboard/setting' className="dropdown__link" tabIndex={dropdownVisible ? 0 : -1}>
                        <span className="dropdown__icon"><FaClipboardList /></span>
                        <span className="dropdown__title">My Account</span>
                      </Link>
                    </li>
                    <li className="dropdown__list-item" onClick={handleLogout} tabIndex={dropdownVisible ? 0 : -1} role="button" onKeyDown={e => { if(e.key === 'Enter') handleLogout(); }}>
                      <span className="dropdown__icon"><HiOutlineLogout /></span>
                      <span className="dropdown__title">Log Out</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

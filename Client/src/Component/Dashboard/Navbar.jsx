import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/Dashboard/Navbar.css';
import logo from '../../img/nav-logo.svg';
import { IoLogOutOutline, IoSettingsOutline, IoPersonOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ userData, handleLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const userName = userData?.name || "Champion";
  const userGold = userData?.gold || 0;

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        avatarRef.current && !avatarRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isProfilePage = location.pathname === '/dashboard/profile';

  return (
    <header className="app-header">
      <div className="header__left">
        {isProfilePage && (
          <div className="header__logo-container" onClick={() => navigate('/dashboard')}>
            <img
              src={logo}
              alt="Fitness Quest Logo"
              className="header__logo"
              style={{ height: '40px', cursor: 'pointer' }}
            />
          </div>
        )}
      </div>

      <div className="header__right">
        {/* Persistent Gold Display */}
        <div className="nav-gold-display" title="Your current Gold">
          <div className="nav-gold-icon-wrapper">
            <div className="nav-gold-coin"></div>
          </div>
          <span className="nav-gold-amount">{userGold}</span>
        </div>

        <div className="header__profile">
          <div className="profile-info">
            <span className="profile-username">
              {userName}
              <span className="profile-username-text"> Guild Member</span>
            </span>
          </div>

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
            <div className="avatar-gold-frame">
              <MdAccountCircle style={{ fontSize: '1.8rem', color: 'var(--rpg-gold)' }} />
            </div>

            {dropdownVisible && (
              <div className="dropdown dropdown--active" ref={dropdownRef}>
                <ul className="dropdown__list">
                  <li className="dropdown__list-item" onClick={() => navigate('/dashboard/profile')}>
                    <div className="dropdown__link">
                      <IoPersonOutline className="dropdown__icon" />
                      <span className="dropdown__title">Character Sheet</span>
                    </div>
                  </li>
                  <li className="dropdown__list-item" onClick={() => navigate('/dashboard/setting')}>
                    <div className="dropdown__link">
                      <IoSettingsOutline className="dropdown__icon" />
                      <span className="dropdown__title">Quest Settings</span>
                    </div>
                  </li>
                  <li className="dropdown__list-item" onClick={handleLogout}>
                    <div className="dropdown__link">
                      <IoLogOutOutline className="dropdown__icon" />
                      <span className="dropdown__title">Leave Guild</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

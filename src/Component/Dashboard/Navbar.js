import React, { useState, useRef, useEffect } from 'react';
import '../Css/Navbar.css';
import { HiOutlineLogout } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";

const Navbar = ({ userName, handleLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="app-container">
      <div className="app-header">
        <span className="profile-btn">
          <span className='profile-username'>
            <span className='profile-username-text'>Hello, </span>
            {userName}
          </span>
          <div className="header__avatar" onClick={toggleDropdown} ref={dropdownRef}>
            {dropdownVisible && (
              <div className="dropdown dropdown--active">
                <ul className="dropdown__list">
                  <li className="dropdown__list-item">
                    <span className="dropdown__icon"><MdAccountCircle /></span>
                    <span className="dropdown__title">My Profile</span>
                  </li>
                  <li className="dropdown__list-item">
                    <span className="dropdown__icon"><FaClipboardList /></span>
                    <span className="dropdown__title">My Account</span>
                  </li>
                  <li className="dropdown__list-item" onClick={handleLogout}>
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
  );
};

export default Navbar;

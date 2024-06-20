import React, { useState } from 'react';
import '../Css/Navbar.css';

import { HiOutlineLogout } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";

const Navbar = ({ userName }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <span className="profile-btn">
          <span className='profile-username'><span className='profile-username-text'>Hello, </span>{userName}</span>
          <div className="header__avatar" onClick={toggleDropdown}>
            <div className={`dropdown ${dropdownVisible ? 'dropdown--active' : ''}`}>
              <ul className="dropdown__list">
                <li className="dropdown__list-item">
                  <span className="dropdown__icon"><MdAccountCircle /></span>
                  <span className="dropdown__title">My Profile</span>
                </li>
                <li className="dropdown__list-item">
                  <span className="dropdown__icon"><FaClipboardList /></span>
                  <span className="dropdown__title">My Account</span>
                </li>
                <li className="dropdown__list-item">
                  <span className="dropdown__icon"><HiOutlineLogout /></span>
                  <span className="dropdown__title">Log Out</span>
                </li>
              </ul>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Navbar;

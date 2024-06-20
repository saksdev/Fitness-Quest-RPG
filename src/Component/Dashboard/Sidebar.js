import React, { useState } from 'react';
import '../Css/Sidebar.css';

import Logo from '../../img/nav-logo.svg';
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";
// import { IoMdArrowDropleft } from "react-icons/io";



const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);


  const handleMenuToggle = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };

  return (
    <div className='sidebar active'>
      <div className="head">
        <div className="user-img">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="nav">
        <div className="menu">
          <ul>
            <li className="active">
              <a href="/">
                <BiSolidDashboard />
                <span className="text">Dashboard</span>
              </a>
            </li>
            <li className={activeMenu === 2 ? 'active' : ''} onClick={() => handleMenuToggle(2)}>
              <a href="/">
                <FaGift />
                <span className="text">Reward</span>
                <i className="arrow ph-bold ph-caret-down"></i>
              </a>
            </li>
            <li className={activeMenu === 3 ? 'active' : ''} onClick={() => handleMenuToggle(3)}>
              <a href="/">
                <FaCartShopping />
                <span className="text">Shop</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="menu">
          <ul>
            <li><a href="/"><IoSettingsOutline /><span className="text">Settings</span></a></li>
          </ul>
        </div>
      </div>
      <div className="menu">
        <ul>
          <li><a href="/"><IoLogOutOutline /><span className="text">Logout</span></a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

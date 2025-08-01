import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Css/Dashboard/Sidebar.css';
import Logo from '../../img/nav-logo.svg';
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";

const Sidebar = ({ handleLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: <BiSolidDashboard />, text: "Dashboard", link: "/dashboard" },
    { icon: <FaGift />, text: "Reward", link: "/dashboard/reward" },
    { icon: <FaCartShopping />, text: "Shop", link: "/dashboard/shop" },
  ];

  return (
    <div className={`sidebar ${isMobile ? 'mobile' : ''}`}>
      {!isMobile && (
        <div className="head">
          <div className="user-img">
            <img src={Logo} alt="Logo" />
          </div>
        </div>
      )}
      <nav className="menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={location.pathname === item.link ? 'active' : ''}>
              <Link to={item.link}>
                {item.icon}
                <span className="text">{item.text}</span>
              </Link>
            </li>
          ))}
          {isMobile && (
            <>
              <li className={location.pathname === '/dashboard/setting' ? 'active' : ''}>
                <Link to="/dashboard/setting">
                  <IoSettingsOutline />
                  <span className="text">Settings</span>
                </Link>
              </li>

              <li onClick={handleLogout}>
                <div className='logout'>
                  <IoLogOutOutline />
                  <span className="text">Logout</span>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>

      {!isMobile && (
        <>
        <div className="menu">
            <ul>
              <li className={location.pathname === '/dashboard/setting' ? 'active' : ''}>
                <Link to="/dashboard/setting">
                  <IoSettingsOutline />
                  <span className="text">Settings</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="logout-menu menu">
            <ul>
              <li onClick={handleLogout}>
                <div className='logout'>
                  <IoLogOutOutline />
                  <span className="text">Logout</span>
                </div>
              </li>
            </ul>
          </div>
          </>
      )}
    </div>
  );
};

export default Sidebar;


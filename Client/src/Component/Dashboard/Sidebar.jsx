import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Css/Dashboard/Sidebar.css';
import Logo from '../../img/nav-logo.svg';
import { IoLogOutOutline, IoSettingsOutline, IoPersonOutline } from "react-icons/io5";
import { BiSolidDashboard, BiTrophy } from "react-icons/bi";
import { FaCartShopping, FaChessBoard } from "react-icons/fa6";
import { FaGift, FaCoins, FaShieldAlt } from "react-icons/fa";

const Sidebar = ({ handleLogout, userData }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: <BiSolidDashboard />, text: "Dashboard", link: "/dashboard" },
    { icon: <FaChessBoard />, text: "Quests", link: "/dashboard/quests" },
    { icon: <BiTrophy />, text: "Leaderboard", link: "/dashboard/leaderboard" },
    { icon: <FaGift />, text: "Reward", link: "/dashboard/reward" },
    { icon: <FaCartShopping />, text: "Shop", link: "/dashboard/shop" },
  ];

  if (userData && userData.role === 'admin') {
    menuItems.push({ icon: <FaShieldAlt />, text: "Admin Panel", link: "/admin" }); // Direct link to /admin
  }

  return (
    <div className={`rpg-sidebar ${isMobile ? 'mobile' : ''}`}>
      {!isMobile && (
        <div className="sidebar-head">
          <div className="guild-logo-container">
            <BiSolidDashboard style={{ fontSize: '2.5rem', color: 'var(--rpg-gold)' }} />
          </div>
          <span className="guild-title">Guild Hall</span>
        </div>
      )}
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={location.pathname === item.link ? 'active' : ''}>
              <Link to={item.link}>
                <span className="icon-glow">{item.icon}</span>
                <span className="text">{item.text}</span>
              </Link>
            </li>
          ))}
          {isMobile && (
            <li className={location.pathname === '/dashboard/setting' ? 'active' : ''}>
              <Link to="/dashboard/setting">
                <span className="icon-glow"><IoSettingsOutline /></span>
                <span className="text">Settings</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {
        !isMobile && userData && (
          <div className="sidebar-footer">
            <div className="char-mini-card">
              <div className="mini-avatar">
                <IoPersonOutline />
              </div>
              <div className="mini-stats">
                <span className="mini-name">{userData.name}</span>
                <div className="mini-lv-gold">
                  <span className="lv-tag">LV. {userData.level}</span>
                  <span className="gold-tag"><FaCoins style={{ color: 'var(--rpg-gold)' }} /> {userData.gold}</span>
                </div>
              </div>
            </div>

            <div className="footer-actions">
              <Link to="/dashboard/setting" className={location.pathname === '/dashboard/setting' ? 'active' : ''}>
                <IoSettingsOutline title="Settings" />
              </Link>
              <button onClick={handleLogout} className="sidebar-logout-btn">
                <IoLogOutOutline title="Logout" />
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Sidebar;



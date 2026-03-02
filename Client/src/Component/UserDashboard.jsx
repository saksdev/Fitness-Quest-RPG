import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

import './Css/Dashboard/Dashboard.css';

import DashboardHome from './Dashboard/DashboardHome';
import Sidebar from './Dashboard/Sidebar';
import Navbar from './Dashboard/Navbar';
import MyProfile from './Dashboard/MyProfile';
import Reward from './Dashboard/Reward';
import QuestBoard from './Dashboard/QuestBoard';
import Leaderboard from './Dashboard/Leaderboard';
import Setting from './Dashboard/Setting';
import Shop from './Dashboard/Shop';
import GuildLoading from './Dashboard/GuildLoading';

import { fetchDashboardData, logoutUser } from '../api'; // ✅ Import APIs

const Dashboard = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState(null);
  const [subPageLoading, setSubPageLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchDashboardData();  // ✅ Use centralized API
        if (response.status === 200) {
          setUserData(response.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate, setIsAuthenticated]);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();  // ✅ Use centralized API
      if (response.status === 200) {
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Logout failed:', error.response.data);
        if (error.response.status === 401) {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  if (!userData) {
    return <GuildLoading />;
  }

  const showSidebarAndNavbar = location.pathname !== '/dashboard/profile' && !subPageLoading;

  return (
    <>
      <div className={`dashboard ${subPageLoading ? 'full-portal' : ''}`}>
        {showSidebarAndNavbar && <Sidebar handleLogout={handleLogout} userData={userData} />}
        <div className={`main-content ${!showSidebarAndNavbar ? 'full-width' : ''}`}>
          {showSidebarAndNavbar && <Navbar userData={userData} handleLogout={handleLogout} />}
          <Routes>
            <Route path='/' element={<DashboardHome userData={userData} setGlobalLoading={setSubPageLoading} />} />
            <Route path="profile" element={<MyProfile userData={userData} setGlobalLoading={setSubPageLoading} />} />
            <Route path="quests" element={<QuestBoard userData={userData} setGlobalLoading={setSubPageLoading} />} />
            <Route path="leaderboard" element={<Leaderboard userData={userData} setGlobalLoading={setSubPageLoading} />} />
            <Route path="reward" element={<Reward userData={userData} setGlobalLoading={setSubPageLoading} />} />
            <Route path="shop" element={<Shop userData={userData} />} />
            <Route path="setting" element={<Setting userData={userData} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;


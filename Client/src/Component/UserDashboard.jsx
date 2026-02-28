import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';

import './Css/Dashboard/Dashboard.css';
import Loading from '../img/Loading.svg';

import DashboardHome from './Dashboard/DashboardHome';
import Sidebar from './Dashboard/Sidebar';
import Navbar from './Dashboard/Navbar';
import MyProfile from './Dashboard/MyProfile';
import Reward from './Dashboard/Reward';
import Setting from './Dashboard/Setting';
import Shop from './Dashboard/Shop';

import { fetchDashboardData, logoutUser } from '../api'; // ✅ Import APIs

const Dashboard = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState(null);
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
    return (
      <div className='Loading'>
        <img src={Loading} alt='Loading...' />
      </div>
    );
  }

  const showSidebarAndNavbar = location.pathname !== '/dashboard/profile';

  return (
    <>
      <div className='dashboard'>
        {showSidebarAndNavbar && <Sidebar handleLogout={handleLogout} />}
        <div className={`main-content ${!showSidebarAndNavbar ? 'full-width' : ''}`}>
          {showSidebarAndNavbar && <Navbar userName={userData.name} handleLogout={handleLogout} />}
          <Routes>
            <Route path='/' element={<DashboardHome />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="reward" element={<Reward />} />
            <Route path="shop" element={<Shop />} />
            <Route path="setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;


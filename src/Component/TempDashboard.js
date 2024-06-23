import React from 'react';
// import axios from 'axios';
import {Routes, Route } from 'react-router-dom';

import './Css/Dashboard.css';

import Sidebar from './Dashboard/Sidebar.js';
import Navbar from './Dashboard/Navbar.js';
import MyProfile from './Dashboard/MyProfile.js';
import Reward from './Dashboard/Reward.js';
import Setting from './Dashboard/Setting.js';
import Shop from './Dashboard/Shop.js';

const Dashboard = () => {

  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        <Sidebar/>
        <div className='main-content'>
          <Navbar/>
          <Routes>
            <Route index element={<h2>Welcome to your Dashboard</h2>} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="reward" element={<Reward />} />
            <Route path="shop" element={<Shop />} />
            <Route path="setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

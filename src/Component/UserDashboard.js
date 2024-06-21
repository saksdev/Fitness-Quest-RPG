import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Css/Dashboard.css';
import Loading from '../img/Loading.svg';

import Navbar from './Dashboard/Navbar.js';
import Sidebar from './Dashboard/Sidebar.js';

const Dashboard = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard', { withCredentials: true });
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

  return (
    <>
      {/* <p>User ID: {userData.userId}</p> */}
      {userData ? (
        <div className='dashboard'>
          <div className='dashboard-container'>
            <Sidebar />
            <div>
              <Navbar userName={userData.name} />
            </div>
          </div>
        </div>
      ) : (
        <div className='Loading'>
          <img src={Loading} alt='loading' />
        </div>
      )}
    </>
  );
};

export default Dashboard;

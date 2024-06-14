import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <p>Welcome, User ID: {userData}!</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <p>Welcome, {userData.name}!</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
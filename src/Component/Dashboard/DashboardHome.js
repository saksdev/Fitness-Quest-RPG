// DashboardHome.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardHome = () => {
  const [fitbitData, setFitbitData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkFitbitConnection();
  }, []);

  const checkFitbitConnection = async () => {
    try {
      const response = await axios.get('/api/dashboard/fitbit-status');
      setIsConnected(response.data.isConnected);
      if (response.data.isConnected) {
        fetchFitbitData();
      }
    } catch (err) {
      setError('Error checking Fitbit connection');
    }
  };

  const connectFitbit = () => {
    window.location.href = 'http://localhost:3000/api/dashboard/connect-fitbit';
  };

  const fetchFitbitData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard/fitbit-data');
      setFitbitData(response.data);
    } catch (err) {
      setError('Error fetching Fitbit data');
    }
  };

  return (
    <div className="dashboard-home">
      {error && <p className="error">{error}</p>}

      {!isConnected ? (
        <button onClick={connectFitbit}>Connect to Fitbit</button>
      ) : (
        <div>
          <h2>Your Fitbit Activity</h2>
          {fitbitData ? (
            <div className="fitbit-data">
              {fitbitData["activities-steps"].map(day => (
                <div key={day.dateTime} className="step-data">
                  <p>{new Date(day.dateTime).toLocaleDateString()}: {day.value} steps</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading Fitbit data...</p>
          )}
        </div>
      )}

      {/* Add more dashboard elements here */}
    </div>
  );
};

export default DashboardHome;
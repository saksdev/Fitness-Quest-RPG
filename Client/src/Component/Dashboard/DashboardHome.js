import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import LoadingImg from '../../img/Loading.svg';
import { getFitbitStatus, getFitbitData } from '../../api.js'; // Updated path

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const [fitbitData, setFitbitData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFitbitData = useCallback(async () => {
    try {
      const response = await getFitbitData();
      setFitbitData(response.data);
    } catch (err) {
      console.error('Error fetching Fitbit data:', err);
      setError('Error fetching Fitbit data. Please try again.');
    }
  }, []);

  const checkFitbitConnection = useCallback(async () => {
    try {
      const response = await getFitbitStatus();
      setIsConnected(response.data.isConnected);
      if (response.data.isConnected) {
        await fetchFitbitData();
      }
    } catch (err) {
      console.error('Error checking Fitbit connection:', err);
      setError('Failed to check Fitbit connection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFitbitData]);

  useEffect(() => {
    checkFitbitConnection();
  }, [checkFitbitConnection]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fitbitConnection = urlParams.get('fitbit_connection');
    if (fitbitConnection === 'success') {
      checkFitbitConnection();
    } else if (fitbitConnection === 'failed') {
      setError('Failed to connect to Fitbit. Please try again.');
      setIsLoading(false);
    }
  }, [checkFitbitConnection]);

  const connectFitbit = () => {
    window.location.href = `${window.location.origin}/api/dashboard/connect-fitbit`;
  };

  const prepareChartData = () => {
    if (!fitbitData || !fitbitData["activities-steps"]) return null;

    const labels = fitbitData["activities-steps"].map(day => new Date(day.dateTime).toLocaleDateString());
    const data = fitbitData["activities-steps"].map(day => parseInt(day.value));

    return {
      labels,
      datasets: [
        {
          label: 'Steps',
          data,
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Step Count',
      },
    },
  };

  if (isLoading) {
    return (
      <div className='loading'>
        <img src={LoadingImg} alt='Loading...' />
      </div>
    );
  }

  const chartData = prepareChartData();

  return (
    <div className="dashboard-home">
      {error && <p className="error">{error}</p>}

      {!isConnected ? (
        <button onClick={connectFitbit}>Connect to Fitbit</button>
      ) : (
        <div>
          <h2>Your Fitbit Activity</h2>
          {chartData ? (
            <div className="chart-container" style={{ height: '400px', width: '100%' }}>
              <Line options={chartOptions} data={chartData} />
            </div>
          ) : (
            <p>Loading Fitbit data...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHome;

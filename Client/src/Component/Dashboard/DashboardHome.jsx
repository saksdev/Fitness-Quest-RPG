import React, { useState, useEffect, useCallback } from 'react';
import GuildLoading from './GuildLoading';
import { calculateLevelInfo, getCharacterClass, calculateAttributes, calculateGold } from '../../Tools/rpgLogic';
import { FaKhanda, FaWind, FaHeartbeat, FaMoon, FaCoins, FaSync, FaGoogle, FaFire, FaWalking, FaRoad } from "react-icons/fa";
import { SiFitbit } from "react-icons/si";
import { toast } from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardHome = ({ userData, setGlobalLoading }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (userData) {
      if (userData.isFitbitConnected || userData.isGoogleFitConnected) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
      setIsLoading(false);
    }
  }, [userData]);

  // Process User Data for Charts
  // Refactored to remove mock data
  useEffect(() => {
    if (userData) {
      // ... existing code ...
      const dailyStats = userData.dailyStats || [];

      if (dailyStats.length > 0) {
        const labels = dailyStats.map(stat => new Date(stat.date).toLocaleDateString('en-US', { weekday: 'short' }));
        const dataSteps = dailyStats.map(stat => stat.steps);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Daily Steps',
              data: dataSteps,
              borderColor: '#00d4ff',
              backgroundColor: 'rgba(0, 212, 255, 0.2)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#ffffff',
              pointBorderColor: '#00d4ff',
              pointRadius: 4,
            },
          ],
        });
      } else {
        setChartData(null);
      }
    }
  }, [userData]);

  const connectFitbit = () => {
    window.location.href = `${window.location.origin}/api/dashboard/connect-fitbit`;
  };

  const connectGoogleFit = () => {
    window.location.href = `${window.location.origin}/api/dashboard/connect-google-fit`;
  };

  if (isLoading) {
    return <GuildLoading />;
  }

  // Calculate RPG Data
  // Use persistent backend data (synced via Terra) as the source of truth
  const totalXP = userData?.xp || 0;
  const totalGold = userData?.gold || 0;

  // Derive level and progress from totalXP using rpgLogic formulas
  const displayLevel = Math.max(1, Math.floor(Math.sqrt(totalXP / 100)));
  const nextLevelXP = 100 * Math.pow(displayLevel + 1, 2);
  const xpForCurrentLevel = 100 * Math.pow(displayLevel, 2);
  const progressPercent = Math.min(100, Math.max(0, ((totalXP - xpForCurrentLevel) / (nextLevelXP - xpForCurrentLevel)) * 100));

  const charClass = getCharacterClass(0, 0); // Placeholder until backend updates these fields
  const attributes = calculateAttributes(0, 0); // Placeholder until backend updates these fields

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Activity Quest',
        color: '#e0e0e0',
        font: {
          family: "'Cinzel', serif",
          size: 16
        }
      },
      tooltip: {
        backgroundColor: 'rgba(20, 20, 30, 0.9)',
        titleColor: '#ffd700',
        bodyColor: '#e0e0e0',
        borderColor: '#ffd700',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#a0a0a0',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#a0a0a0',
        }
      }
    },
  };

  return (
    <div className="rpg-dashboard">
      {/* Header: Character Preview */}
      <header className="char-header">
        <div className="avatar-section">
          <div className="avatar-frame">
            <div className="avatar-inner"></div>
          </div>
          <div className="char-info">
            <h1 className="char-name" style={{ fontFamily: "'Cinzel', serif" }}>{userData?.name || "Fitness Hero"}</h1>
            <p className="char-class">{charClass}</p>
            <div className="gold-indicator">
              <FaCoins style={{ color: '#ffd700', marginRight: '8px' }} />
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{totalGold} Gold</span>
            </div>
          </div>
        </div>

        <div className="xp-container">
          <div className="xp-header-labels" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div className="level-badge">LVL {displayLevel}</div>
            <span style={{ color: 'var(--rpg-gold)', fontSize: '0.8rem', fontWeight: 'bold' }}>EXP PROGRESS</span>
          </div>
          <div className="xp-bar-wrapper">
            <div className="xp-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            <div className="xp-text">{totalXP} / {nextLevelXP} XP</div>
          </div>
        </div>
      </header>

      {/* Connection State Handling */}
      {!isConnected ? (
        <div className="connect-prompt-container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          background: 'rgba(20, 20, 30, 0.6)',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid rgba(255, 215, 0, 0.1)',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <FaSync style={{ fontSize: '3rem', color: '#00d4ff', marginBottom: '20px', opacity: 0.8 }} className="pulse-icon" />
          <h2 style={{ fontFamily: "'Cinzel', serif", color: '#ffffff', marginBottom: '10px' }}>Begin Your Journey</h2>
          <p style={{ color: '#a0a0a0', maxWidth: '500px', lineHeight: '1.6', marginBottom: '30px' }}>
            To track your progress, earn XP, and level up your character, you must sync your real-world activity.
            Connect a fitness device to unlock the full dashboard.
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="rpg-btn-primary" onClick={connectFitbit} style={{
              background: 'linear-gradient(45deg, #00B0B9, #008f96)',
              color: 'white',
              padding: '12px 30px',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 176, 185, 0.3)'
            }}>
              <SiFitbit style={{ marginRight: '10px', fontSize: '1.4rem' }} /> Connect Fitbit
            </button>

            <button className="rpg-btn-primary" onClick={connectGoogleFit} style={{
              background: 'linear-gradient(45deg, #4285F4, #3367d6)',
              color: 'white',
              padding: '12px 30px',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)'
            }}>
              <FaGoogle style={{ marginRight: '10px', fontSize: '1.2rem' }} /> Connect Google Fit
            </button>
          </div>
        </div>
      ) : (
        <>
          {userData?.isSynced && (
            <div className="sync-banner">
              <FaSync className="spin" style={{ color: 'var(--rpg-gold)' }} />
              <span>Synced with the Great Cloud Observatory</span>
            </div>
          )}

          {/* Quick Stats Row */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '20px' }}>
            <div className="stat-card" style={{ background: 'linear-gradient(145deg, #1a1a2e, #16213e)', border: '1px solid #0f3460' }}>
              <div className="stat-icon" style={{ color: '#00d4ff' }}><FaWalking /></div>
              <div className="stat-content">
                <span className="stat-label">Steps Today</span>
                <span className="stat-value">{chartData?.datasets?.[0]?.data?.[chartData.datasets[0].data.length - 1]?.toLocaleString() || 0}</span>
                <span className="stat-subtext">Distance Traveled</span>
              </div>
            </div>

            <div className="stat-card" style={{ background: 'linear-gradient(145deg, #1a1a2e, #16213e)', border: '1px solid #ff4b4b44' }}>
              <div className="stat-icon" style={{ color: '#ff4b4b' }}><FaFire /></div>
              <div className="stat-content">
                <span className="stat-label">Calories Burned</span>
                <span className="stat-value">{((chartData?.datasets?.[0]?.data?.[chartData.datasets[0].data.length - 1] || 0) * 0.04).toFixed(0)}</span>
                <span className="stat-subtext">Energy Expended</span>
              </div>
            </div>

            <div className="stat-card" style={{ background: 'linear-gradient(145deg, #1a1a2e, #16213e)', border: '1px solid #ffd70044' }}>
              <div className="stat-icon" style={{ color: '#ffd700' }}><FaKhanda /></div>
              <div className="stat-content">
                <span className="stat-label">XP Gained</span>
                <span className="stat-value">{((chartData?.datasets?.[0]?.data?.[chartData.datasets[0].data.length - 1] || 0) * 0.5).toFixed(0)}</span>
                <span className="stat-subtext">Heroic Growth</span>
              </div>
            </div>
          </div>

          {/* CHART SECTION */}
          <div className="dashboard-section chart-container" style={{
            background: 'rgba(20, 20, 30, 0.6)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            marginBottom: '30px',
            height: '400px'
          }}>
            {chartData ? <Line options={chartOptions} data={chartData} /> :
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#a0a0a0' }}>
                <p>No activity data available yet. Start walking to generate charts!</p>
              </div>
            }
          </div>

          {/* Stats Attributes Grid */}
          <div className="stats-grid">
            <div className="stat-card strength">
              <div className="stat-icon"><FaKhanda /></div>
              <div className="stat-content">
                <span className="stat-label">Strength</span>
                <span className="stat-value">{attributes.strength}</span>
                <span className="stat-subtext">Power & Endurance</span>
              </div>
            </div>

            <div className="stat-card agility">
              <div className="stat-icon"><FaWind /></div>
              <div className="stat-content">
                <span className="stat-label">Agility</span>
                <span className="stat-value">{attributes.agility}</span>
                <span className="stat-subtext">Speed & Reflexes</span>
              </div>
            </div>

            <div className="stat-card vitality">
              <div className="stat-icon"><FaHeartbeat /></div>
              <div className="stat-content">
                <span className="stat-label">Vitality</span>
                <span className="stat-value">{attributes.vitality}</span>
                <span className="stat-subtext">Health & Vigor</span>
              </div>
            </div>

            <div className="stat-card spirit">
              <div className="stat-icon"><FaMoon /></div>
              <div className="stat-content">
                <span className="stat-label">Spirit</span>
                <span className="stat-value">{attributes.spirit}</span>
                <span className="stat-subtext">Focus & Mana</span>
              </div>
            </div>
          </div>

          {/* Active Quests Section */}
          <div className="active-quests">
            <h2 className="section-title" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '2px' }}>📜 Active Quests</h2>
            <div className="quest-list">
              <div className="quest-item">
                <div className={`quest-checkbox ${totalXP >= 1500 ? 'done' : ''}`}></div>
                <p style={{ fontWeight: '600' }}>Patrol the Village <span style={{ color: 'var(--rpg-cyan)', marginLeft: '10px' }}>(3,000 steps)</span></p>
              </div>
              <div className="quest-item">
                <div className={`quest-checkbox ${totalXP >= 2500 ? 'done' : ''}`}></div>
                <p style={{ fontWeight: '600' }}>Defeat the Slime King <span style={{ color: 'var(--rpg-cyan)', marginLeft: '10px' }}>(5,000 steps)</span></p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardHome;

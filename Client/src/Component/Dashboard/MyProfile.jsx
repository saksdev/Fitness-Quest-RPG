import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import GuildLoading from './GuildLoading';
import { BsTwitterX, BsPencilSquare } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { FiCopy, FiUpload } from "react-icons/fi";
import { FaTshirt, FaHardHat, FaRing, FaShieldAlt, FaFistRaised } from "react-icons/fa";
import { GiLegArmor } from "react-icons/gi";
import toast, { Toaster } from 'react-hot-toast';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import { getProfile, uploadProfilePicture, getFitbitData } from '../../api';
import '../Css/Dashboard/Profile.css';
import { calculateAttributes } from '../../Tools/rpgLogic';

// Register ChartJS
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Profile({ handleLogout, setGlobalLoading }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [attributes, setAttributes] = useState({ strength: 0, agility: 0, vitality: 0, spirit: 0 });

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, [setGlobalLoading]);

  const fetchProfileData = async () => {
    try {
      if (setGlobalLoading) setGlobalLoading(true);
      setIsLoading(true);

      const response = await getProfile();
      setProfile(response.data);

      // Calculate derived attributes from steps/Fitbit data
      // Ensuring we have fitbit data or defaults
      let steps = 0;
      let calories = 0;
      try {
        const fitbitRes = await getFitbitData(); // Or get from profile if stored
        steps = fitbitRes.data?.steps || 0;
        calories = fitbitRes.data?.calories || 0;
      } catch (e) {
        console.log("Could not fetch latest fitbit stats for attributes", e);
      }

      // Use existing RPG logic to calculate stats
      // If profile has persistent stats, use them, otherwise calculate
      const attrs = calculateAttributes(steps, calories);
      setAttributes(attrs);

      setError(null);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
      if (setGlobalLoading) setGlobalLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await uploadProfilePicture(formData);
      setProfile(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
      toast.success("Portrait updated!");
    } catch (error) {
      toast.error("Failed to update portrait.");
    } finally {
      setIsUploading(false);
    }
  };

  const radarData = {
    labels: ['Strength', 'Agility', 'Vitality', 'Spirit', 'Intelligence', 'Luck'],
    datasets: [
      {
        label: 'Hero Attributes',
        data: [
          attributes.strength,
          attributes.agility,
          attributes.vitality,
          attributes.spirit,
          Math.floor(attributes.spirit * 0.8), // Placeholder logic for now
          Math.floor(Math.random() * 10) + 1   // Placeholder Luck
        ],
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        borderColor: '#ffd700',
        borderWidth: 2,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ffd700',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: {
          color: '#ccc',
          font: { family: 'Montserrat', size: 12 }
        },
        ticks: { display: false, backdropColor: 'transparent' }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  if (isLoading) return <GuildLoading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="hero-sheet">
      <Toaster position="bottom-center" />
      {/* Assuming Navbar is rendered by parent or we include it if needed. 
          The previous file included Navbar, so maintaining that. */}
      {/* <Navbar ... /> - UserDashboard usually renders Navbar, keeping it here if standalone */}

      <div className="hero-header">
        <h1 className="hero-name">{profile.name}</h1>
        <div className="hero-title">{profile.username} | LVL {profile.level || 1} Apprentice</div>
      </div>

      <div className="hero-grid">
        {/* Left Column: Equipment */}
        <div className="equipment-panel">
          <h3 className="panel-title">Gear</h3>
          <div className="equipment-slots">
            <div className="equip-row">
              <div className="equip-slot" title="Head"><FaHardHat /><span className="slot-label">Head</span></div>
            </div>
            <div className="equip-row">
              <div className="equip-slot" title="Main Hand"><FaFistRaised /><span className="slot-label">Main</span></div>
              <div className="equip-slot" title="Chest"><FaTshirt /><span className="slot-label">Torso</span></div>
              <div className="equip-slot" title="Off Hand"><FaShieldAlt /><span className="slot-label">Off</span></div>
            </div>
            <div className="equip-row">
              <div className="equip-slot" title="Legs"><GiLegArmor /><span className="slot-label">Legs</span></div>
            </div>
            <div className="equip-row">
              <div className="equip-slot" title="Accessory"><FaRing /><span className="slot-label">Ring</span></div>
              <div className="equip-slot" title="Accessory"><FaRing /><span className="slot-label">Amulet</span></div>
            </div>
          </div>
        </div>

        {/* Center Column: Avatar & Stats */}
        <div className="hero-center-stage">
          <div className="avatar-display-large">
            <img src={profile.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`} alt="Hero Portrait" />
            <label className="upload-overlay">
              <FiUpload />
              <input type="file" hidden onChange={handleFileChange} accept="image/*" />
            </label>
          </div>

          <div className="radar-chart-container">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Right Column: Bio & Badges */}
        <div className="stats-panel">
          <h3 className="panel-title">Hero Stats</h3>
          <div className="stat-row">
            <span className="stat-name">Total XP</span>
            <span className="stat-value">{profile.XP || 0}</span>
          </div>
          <div className="stat-row">
            <span className="stat-name">Gold</span>
            <span className="stat-value" style={{ color: '#ffd700' }}>{profile.gold || 0} G</span>
          </div>
          <div className="stat-row">
            <span className="stat-name">Quests Completed</span>
            <span className="stat-value">{profile.completedQuests?.length || 0}</span>
          </div>
          <div className="stat-row">
            <span className="stat-name">Points</span>
            <span className="stat-value">{profile.Points || 0}</span>
          </div>

          <h3 className="panel-title" style={{ marginTop: '30px' }}>Badges</h3>
          <div className="badges-grid">
            <div className="badge-slot" title="Early Adopter">🌟</div>
            <div className="badge-slot" title="First Blood">⚔️</div>
            <div className="badge-slot"></div>
            <div className="badge-slot"></div>
            <div className="badge-slot"></div>
            <div className="badge-slot"></div>
          </div>

          <div className="action-buttons">
            <button className="dashboard-btn" onClick={() => navigate('/dashboard/setting')}>
              <BsPencilSquare /> Edit
            </button>
            <button className="dashboard-btn" onClick={() => window.open(profile.twitterUrl || '#', '_blank')}>
              <BsTwitterX />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


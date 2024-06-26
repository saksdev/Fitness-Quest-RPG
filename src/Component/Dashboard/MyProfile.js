import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import '../Css/Dashboard/MyProfile.css';
import LoadingImg from '../../img/Loading.svg';
import { BsTwitterX } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { FiCopy } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://yourwebsite.com';

function Profile({ handleLogout }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareOptions && !event.target.closest('.share-options')) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareOptions]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/profile', { withCredentials: true });
      setProfile(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/dashboard/setting');
  };

  const handleTwitterClick = () => {
    if (profile.twitterUrl) {
      window.open(profile.twitterUrl, '_blank');
    }
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleShareOnTwitter = () => {
    const profileUrl = `${BASE_URL}/profile/${profile.username}`;
    const tweetText = `Check out my profile on YourWebsite: ${profileUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterShareUrl, '_blank');
  };

  const handleCopyLink = () => {
    const profileUrl = `${BASE_URL}/profile/${profile.username}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profileUrl)
        .then(() => toast.success('Profile link copied to clipboard!'))
        .catch(err => {
          console.error('Failed to copy: ', err);
          toast.error('Failed to copy link. Please try again.');
        });
    } else {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = profileUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Profile link copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        toast.error('Failed to copy link. Please try again.');
      }
      document.body.removeChild(textArea);
    }
  };

  if (isLoading) {
    return (
      <div className='loading'>
        <img src={LoadingImg} alt='Loading...' />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile">
      <Toaster position="bottom-center" />
      <Navbar userName={profile.name} handleLogout={handleLogout} />
      <div className="profile-container">
        <div className='profile-details'>
          <div>
            <div className='profile-name'>
              <span>{profile.name}</span>
            </div>
            <div className='profile-username'>
              <span>@{profile.username}</span>
            </div>
          </div>
          <div className='profile-stats'>
            <div className='profile-bio'>
              <span>{profile.bio}</span>
            </div>
            <div className='profile-info'>
              <div className='profile-info-item'>
                <p>XP</p>
                <span>{profile.XP}</span>
              </div>
              <div className='profile-info-item'>
                <p>Points</p>
                <span>{profile.Points}</span>
              </div>
              <div className='profile-info-item'>
                <p>Level</p>
                <span>{profile.level}</span>
              </div>
            </div>
            <div className='profile-buttons'>
              <button className="dashboard-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
              {profile.twitterUrl && (
                <button className="dashboard-btn" onClick={handleTwitterClick} aria-label="Visit Twitter profile">
                  <BsTwitterX />
                </button>
              )}
              <button className="dashboard-btn" onClick={handleShareClick} aria-label="Share profile">
                <CiShare1 />
              </button>
              {showShareOptions && (
                <div className="share-options">
                  <button className="dashboard-btn" onClick={handleShareOnTwitter}>
                    <BsTwitterX /> Share on X
                  </button>
                  <button className="dashboard-btn" onClick={handleCopyLink}>
                    <FiCopy /> Copy Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='profile-picture'>
          {profile.profilePicture && (
            <img src={profile.profilePicture} alt="Profile" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
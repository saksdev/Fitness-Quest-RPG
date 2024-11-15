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

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001/';

function Profile({ handleLogout }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/api/profile/upload-picture', formData, { withCredentials: true });
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: response.data.profilePicture,
      }));
      setSelectedFile(null);
      setPreviewUrl(null);
      toast.success('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
      toast.error('Failed to upload profile picture. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add('drop-zone--over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('drop-zone--over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('drop-zone--over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
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
          {profile.profilePicture ? (
            <img src={profile.profilePicture} alt="Profile" />
          ) : (
            <>
              <div
                className="drop-zone"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.querySelector('.drop-zone__input').click()}
              >
                {previewUrl ? (
                  <div className="drop-zone__thumb" style={{ backgroundImage: `url(${previewUrl})` }} />
                ) : (
                  <span className="drop-zone__prompt">Drop file here or click to upload</span>
                )}
                <input
                  className="drop-zone__input"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <button className="dashboard-btn" onClick={handleUploadClick} disabled={!selectedFile || isUploading}>
                {isUploading ? 'Updating...' : 'Upload'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

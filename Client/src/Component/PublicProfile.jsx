import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import LoadingImg from '../img/Loading.svg';
import { BsTwitterX } from 'react-icons/bs';

import { getPublicProfile } from '../api';  // ✅ Import API
import '../Component/Css/PublicProfile.css';

function PublicProfile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPublicProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getPublicProfile(username);  // ✅ Use API function
      if (response.data.success) {
        setProfile(response.data.data);
        setError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Failed to load public profile');
      } else if (error.request) {
        setError('No response from server');
      } else {
        setError('Error setting up the request');
      }
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchPublicProfile();
  }, [fetchPublicProfile]);

  const handleTwitterClick = () => {
    if (profile && profile.twitter) {
      window.open(profile.twitter, '_blank');
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

  if (!profile) {
    return <div className="error">Profile not found</div>;
  }

  return (
    <div className="public-profile">
      <div className="public-profile__container">
        <div className='public-profile__details'>
          <div className='public-profile__name'>
            <span>{profile.name}</span>
            <p>@{profile.username}</p>
          </div>
          <div className='public-profile__bio'>
            <span>{profile.bio}</span>
          </div>
          <div className='public-profile__info'>
            <div className='public-profile__info-item'>
              <p>XP</p>
              <span>{profile.XP}</span>
            </div>
            <div className='public-profile__info-item'>
              <p>Level</p>
              <span>{profile.level}</span>
            </div>
          </div>
          {profile.twitter ? (
            <div className='public-profile__btn'>
              <button className="dashboard-btn" onClick={handleTwitterClick} aria-label="Visit Twitter profile">
                <BsTwitterX />
              </button>
            </div>
          ) : (
            <div className='public-profile__description'>
              <p>{profile.description}</p>
            </div>
          )}
        </div>
        <div className='public-profile__picture'>
          {profile.profilePicture && (
            <img src={profile.profilePicture} alt="Profile" />
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;


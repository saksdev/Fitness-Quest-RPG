import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Css/Dashboard/MyProfile.css';
import LoadingImg from '../../img/Loading.svg';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log('Profile updated:', profile);
  }, [profile]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/api/profile', {
        withCredentials: true
      });
      setProfile(response.data);
      setEditForm({
        name: response.data.name,
        email: response.data.email
      });
      setError(null);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError('Failed to load profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put('http://localhost:3000/api/profile', 
        {
          name: editForm.name,
          email: editForm.email
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setProfile(response.data);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
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
    <div>
      <h1>My Profile</h1>
      {!isEditing ? (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>XP:</strong> {profile.XP}</p>
          <p><strong>Points:</strong> {profile.Points}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => setIsEditing(false)} disabled={isLoading}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;

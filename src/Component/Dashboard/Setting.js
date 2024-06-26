import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Setting() {
  const [formData, setFormData] = useState({
    name: '',
    twitterUrl: '',
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/profile', { withCredentials: true });
      const { name, twitterUrl, bio, profilePicture } = response.data;
      setFormData({ name, twitterUrl, bio });
      setPreviewUrl(profilePicture);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && value.length <= 30) {
      setFormData({ ...formData, [name]: value });
    } else if (name === 'bio' && value.length <= 100) {
      setFormData({ ...formData, [name]: value });
    } else if (name !== 'name' && name !== 'bio') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Update profile info
      await axios.put('http://localhost:3000/api/settings', formData, { withCredentials: true });

      // Upload profile picture if a new one is selected
      if (profilePicture) {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);
        await axios.post('http://localhost:3000/api/profile/upload-picture', formData, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      toast.success('Profile updated successfully');
      navigate('/dashboard/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="setting">
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={30}
          />
          <small>{formData.name.length}/30</small>
        </div>
        <div>
          <label htmlFor="twitterUrl">Twitter URL:</label>
          <input
            type="url"
            id="twitterUrl"
            name="twitterUrl"
            value={formData.twitterUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength={100}
          />
          <small>{formData.bio.length}/100</small>
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
          />
          {previewUrl && (
            <img src={previewUrl} alt="Profile Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}

export default Setting;
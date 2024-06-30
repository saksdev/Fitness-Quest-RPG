import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import '../Css/Dashboard/Setting.css';

function Setting() {
  const [formData, setFormData] = useState({
    name: '',
    twitterUrl: '',
    bio: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas({
        width: 418,
        height: 418,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });
      croppedCanvas.toBlob((blob) => {
        setPreviewUrl(URL.createObjectURL(blob));
        setProfilePicture(blob);
        setShowCropModal(false);
      }, 'image/jpeg', 0.95);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put('http://localhost:3000/api/settings', formData, { withCredentials: true });

      if (profilePicture) {
        const imageFormData = new FormData();
        imageFormData.append('profilePicture', profilePicture);
        await axios.post('http://localhost:3000/api/profile/upload-picture', imageFormData, {
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
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (showCropModal && imageRef.current) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        minCropBoxWidth: 200,
        minCropBoxHeight: 200,
        background: false,
        responsive: true,
        restore: false,
      });
    }
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [showCropModal]);

  return (
    <div className="setting">
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit}>
        <div className="profile-picture-container">
          <div className='profile-picture'>
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Profile Preview" 
                onClick={() => fileInputRef.current.click()}
                style={{ 
                  cursor: 'pointer', 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
            ) : (
              <div 
                className="drop-zone" 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                style={{ width: '100%', maxWidth: '418px', aspectRatio: '1 / 1' }}
              >
                <span className="drop-zone__prompt">Drop file here or click to upload</span>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              onChange={handleProfilePictureChange}
              accept="image/*"
              hidden
            />
          </div>
          <button type="submit" disabled={isLoading} className="dashboard-btn dashboard-btn-secondary">
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>

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
      </form>

      {showCropModal && (
        <div className="crop-modal">
          <div className="crop-container">
            <img ref={imageRef} src={profilePicture} alt="Upload" style={{ maxWidth: '100%' }} />
            <div className="crop-buttons">
              <button className='dashboard-btn dashboard-btn-secondary' onClick={handleCropComplete}>Crop and Set Image</button>
              <button className='dashboard-btn dashboard-btn-secondary' onClick={() => setShowCropModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Setting;
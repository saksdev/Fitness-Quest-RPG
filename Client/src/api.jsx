import axios from 'axios';

// Global config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || '', // Use Vercel env var, otherwise relative path for Vite proxy
  withCredentials: true,
});

//
// --- AUTH APIs ---
//
export const checkAuth = () => api.get('/auth');

export const loginUser = (credentials) => api.post('/login', credentials);

export const signupUser = (userData) => api.post('/signup', userData);

export const forgotPassword = (email) => api.post('/forgot-password', { email });

export const resetPassword = (token, newPassword) => api.post('/reset-password', {
  token,
  newPassword,
});

export const logoutUser = () => api.post('/logout', {}, { withCredentials: true });

//
// --- DASHBOARD APIs ---
//
export const fetchDashboardData = () => api.get('/dashboard');

//
// --- PUBLIC PROFILE ---
export const getPublicProfile = (username) => api.get(`/api/public-profile/${username}`);

//
// --- PROFILE APIs ---
export const getProfile = () => api.get('/api/profile');

export const uploadProfilePicture = (formData) =>
  api.post('/api/profile/upload-picture', formData, {
    withCredentials: true,
  });

//
// --- FITBIT APIs ---
export const getFitbitStatus = () => api.get('/api/dashboard/fitbit-status');

export const getFitbitData = () => api.get('/api/dashboard/fitbit-data');

export const connectFitbit = () => api.get('/api/dashboard/connect-fitbit');

//
// --- PROFILE SETTINGS API ---
//
export const updateSettings = (formData) => api.put('/api/settings', formData);

// To disconnect Fitbit (if your backend supports it)
export const disconnectFitbit = () => api.post('/api/dashboard/disconnect-fitbit');

// If you have a separate connect URL endpoint different from 'connectFitbit'
export const connectFitbitURL = () => api.get('/api/dashboard/connect-fitbit-url');


export default api;


import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  checkAuth
} from './api'; // Import from api.js
import './App.css';

import HomePage from './Component/Pages/HomePage';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Features from './Component/Pages/Features';
import About from './Component/Pages/About';
import Contact from './Component/Pages/Contact';
import NotFound from './Component/Pages/NotFound';
import Dashboard from './Component/UserDashboard';
import ForgotPassword from './Component/ForgotPassword';
import ResetPassword from './Component/ResetPassword';
import PublicProfile from './Component/PublicProfile';
import ProtectedRoute from './Component/Tools/ProtectedRoute';
import GuildLoading from './Component/Dashboard/GuildLoading';
import AdminDashboard from './Component/Admin/AdminDashboard';

import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await checkAuth();
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuth();
  }, []);

  if (isLoading) {
    return <GuildLoading />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard setIsAuthenticated={setIsAuthenticated} /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/profile/:username" element={<PublicProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;


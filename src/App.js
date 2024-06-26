import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import HomePage from './Component/Pages/HomePage.js';
import Signup from './Component/Signup.js';
import Login from './Component/Login.js';
import Features from './Component/Pages/Features.js';
import About from './Component/Pages/About.js';
import Contact from './Component/Pages/Contact.js';
import NotFound from './Component/Pages/NotFound.js';
import Dashboard from './Component/UserDashboard.js';

import PublicProfile from './Component/PublicProfile.js';

import ProtectedRoute from './Component/Tools/ProtectedRoute.js';

import LoadingImg from './img/Loading.svg';

function App() {
  axios.defaults.withCredentials = true;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth', { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <img src={LoadingImg} alt='Loading...' />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />}/>
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard setIsAuthenticated={setIsAuthenticated} /></ProtectedRoute>} />
        <Route path="/profile/:username" element={<PublicProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

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

import ProtectedRoute from './Component/Tools/ProtectedRoute.js';

import LoadingImg from './img/Loading.svg';

function App() {
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
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <img src={LoadingImg} alt='Loading...'></img>
      </div>

    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard setIsAuthenticated={setIsAuthenticated} />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import HomePage from './Component/Pages/HomePage.js';
import Signup from './Component/Signup.js';
import Login from './Component/Login.js';
import Features from './Component/Pages/Features.js';
import About from './Component/Pages/About.js';
import Contact from './Component/Pages/Contact.js';
import NotFound from './Component/Pages/NotFound.js';
import Dashboard from './Component/UserDashboard.js';

import ProtectedRoute from './Component/Tools/PrivateRoute.js';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

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
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
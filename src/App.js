import React, { useState, useEffect } from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import HomePage from './Component/HomePage';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Features from './Component/Features';
import About from './Component/About';
import Contact from './Component/Contact';
import NotFound from './Component/NotFound';
import Dashboard from './Component/Dashboard';

import ProtectedRoute from './Component/Tools/PrivateRoute';

function App() {
  // const [user, setUser] = useState(null);

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

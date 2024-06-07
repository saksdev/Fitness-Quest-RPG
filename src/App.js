import React from 'react';
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

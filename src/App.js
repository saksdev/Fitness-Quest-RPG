// App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import SmoothScroll from '../src/Component/SmoothScroll';

import HomePage from './Component/HomePage';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Features from './Component/Features';
import About from './Component/About';
import Contact from './Component/Contact';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* <SmoothScroll /> */}
    </>
  );
}

export default App;
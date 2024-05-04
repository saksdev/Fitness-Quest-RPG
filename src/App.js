// App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// import SmoothScroll from '../src/Component/SmoothScroll';
import Navigation from '../src/Component/MainNavbar';

import HomePage from './Component/HomePage';
import Signup from './Component/Signup';
import Login from './Component/Login';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* <SmoothScroll /> */}
    </>
  );
}

export default App;
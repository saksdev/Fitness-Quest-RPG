import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Scrollbar from 'smooth-scrollbar';
// import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Navigation from '../src/Component/Navigation';

// Component
import HomePage from './Component/HomePage';
import Login from './Component/Login';
import Signup from './Component/Signup';


function App() {
  return (
    <>
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </>
  );
}

export default App;

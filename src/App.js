import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Navigation from '../src/Component/Navigation';

// Component
import HomePage from './Component/HomePage';
import Login from './Component/Login';
import Signup from './Component/Signup';

const SmoothScrollbarWrapper = ({ children }) => {
  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);
    const scrollbar = Scrollbar.init(document.querySelector('#smooth'), {
      damping: 0.05,
      overscrollEffect: 'bounce',
      plugins: {
        overscroll: {
          effect: 'bounce',
          damping: 0.05,
          maxOverscroll: 100,
        },
      },
    });

    // Clean up when component unmounts to prevent memory leaks
    return () => {
      scrollbar.destroy();
    };
  }, []);

  return <div id="smooth" style={{ height: '100vh', overflow: 'auto' }}>{children}</div>;
};

function App() {
  return (
    <>
      <Navigation />
      <SmoothScrollbarWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </SmoothScrollbarWrapper>
    </>
  );
}

export default App;

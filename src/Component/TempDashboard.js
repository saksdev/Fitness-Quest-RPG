import React from 'react';

import './Css/Dashboard.css';
import Navbar from './Dashboard/Navbar.js';
import Sidebar from './Dashboard/Sidebar.js';

const Test = () => {

  return (
    <>
      <div className='dashboard'>
        <div className='dashboard-container'>
          <Sidebar />
          <div>
            <Navbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
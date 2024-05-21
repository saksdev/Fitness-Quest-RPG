import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Css/Login.css';
import Logo from '../img/nav-logo.svg';
import { FaArrowRight } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className='login-form'>
          <div className='login-signup-nav'>
            <Link to='/'>
              <img src={Logo} alt='Fitness Quest' />
            </Link>
            <div className='nav-links'>
              <Link to='/'>Home</Link>
              <Link to='/'>FAQ</Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className='login-input'>
              <p>
                <b>Don't have an account?</b><Link to="/signup">Register</Link>
              </p>
              <div className='login-input-items'>
                <div className='form-input'>
                  <div className='form-icon'>
                    <VscAccount />
                    <input
                      type='email'
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className='form-input'>
                  <div className='form-icon'>
                    <RiLockPasswordFill />
                    <input
                      type='password'
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
              <button className='btn access-btn' type="submit">
                Access My Account<span><FaArrowRight /></span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {isWideScreen && (
        <div className='login-image'>
          <h1>Image</h1>
        </div>
      )}
    </div>
  );
};

export default Login;
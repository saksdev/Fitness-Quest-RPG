import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Css/Login.css';
import Logo from '../img/nav-logo.svg';
import { FaArrowRight } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { DiJava } from 'react-icons/di';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Eye, setEye] = useState(true);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 769);

  const EyeChangereq = () => {
    setEye(!Eye);
  }

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
    <div className="auth-container">
      <div className="auth-form-container">
        <div className='auth-form'>
          <div className='auth-nav'>
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
                      type={Eye ? "password" : "text"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {Eye ? (
                      <FaEye className='Eyechange' onClick={EyeChangereq} />
                    ) : (
                      <FaEyeSlash className='Eyechange' onClick={EyeChangereq} />
                    )}
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
        <div className='auth-image'>
          <h1>Image</h1>
        </div>
      )}
    </div>
  );
};

export default Login;
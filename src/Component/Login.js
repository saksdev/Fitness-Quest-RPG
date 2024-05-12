import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Css/Login.css';
import Logo from '../img/nav-logo.svg';
import { FaArrowRight } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <Link to='/'>Home</Link>
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className='login-input'>
              <p>
                Don't have an account? <Link to="/signup">Register</Link>
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
              {/* <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link> */}
              <button className='btn access-btn' type="submit">
                Access My Account<span><FaArrowRight /></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
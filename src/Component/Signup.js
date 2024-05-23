import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Css/auth.css';
import Logo from '../img/nav-logo.svg';

import { FaUserAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 769);
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [Eye, setEye] = useState(true);
  const EyeChangereq = () => {
    setEye(!Eye);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-form">
          <div className="auth-nav">
            <Link to="/">
              <img src={Logo} alt="Fitness Quest" />
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/">FAQ</Link>
            </div>
          </div>
          <div className="auth">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className='login-input'>
                <p>
                  <b>Already have an account?</b><Link to="/login">Login</Link>
                </p>
                <div className="login-input-items">
                  <div className="form-input">
                    <div className="form-icon">
                      <FaUserAlt />
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-input">
                    <div className="form-icon">
                      <MdMarkEmailUnread />
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-input">
                    <div className="form-icon">
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
                <button className='btn access-btn' type="submit">Sign Up</button>
              </div>
            </form>
          </div>
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

export default Signup;
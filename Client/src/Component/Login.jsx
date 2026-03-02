// src/Component/Login.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

import './Css/auth.css';
import Logo from '../img/nav-logo.svg';
import LoginImg from '../img/Login-img.jpg';

import { MdMarkEmailUnread } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { loginUser } from '../api'; // ✅ Imported login API

const Login = ({ setIsAuthenticated, isAuthenticated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const ShowPassword = () => setShowPassword(!showPassword);

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 769);
  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialValues = {
    email: '',
    password: ''
  };

  const LoginSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const response = await loginUser(values); // ✅ Use API function
        if (response.status === 200) {
          toast.success(response.data.message, { duration: 1000 });
          setIsAuthenticated(true);
          resetForm();
          setTimeout(() => navigate('/dashboard'), 500);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div className="auth-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="auth-form-container">
        <div className='auth-form'>
          <div className='auth-nav'>
            <Link to='/'><img src={Logo} alt='Fitness Quest' /></Link>
            <div className='nav-links'><Link to='/'>Home</Link></div>
          </div>
          <div className='auth'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className='login-input'>
                <p><b>Don't have an account?</b><Link to="/signup">Register</Link></p>
                <div className='login-input-items'>
                  <div>
                    <div className='form-input'>
                      <div className='form-icon'>
                        <MdMarkEmailUnread className='form-icon-img' />
                        <input
                          type='email'
                          placeholder="Email"
                          name='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    {errors.email && touched.email && <p className='Form-error'>{errors.email}</p>}
                  </div>
                  <div>
                    <div className='form-input'>
                      <div className='form-icon'>
                        <RiLockPasswordFill className='form-icon-img' />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {showPassword
                          ? <FaEye className='Eyechange' onClick={ShowPassword} />
                          : <FaEyeSlash className='Eyechange' onClick={ShowPassword} />}
                      </div>
                    </div>
                    {errors.password && touched.password && <p className='Form-error'>{errors.password}</p>}
                  </div>
                </div>
                <span className="forgot-password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </span>
                <button className='btn btn-primary access-btn' type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <BeatLoader size={7} color="#fff" /> : 'Access My Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isWideScreen && (
        <div className='auth-image'>
          <img src={LoginImg} alt="Login" />
        </div>
      )}
    </div>
  );
};

export default Login;


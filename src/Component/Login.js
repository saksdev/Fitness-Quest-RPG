import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

import './Css/auth.css';
import Logo from '../img/nav-logo.svg';
import LoginImg from '../img/Login-img.jpg';
import { MdMarkEmailUnread } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ setIsAuthenticated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        const response = await axios.post('http://localhost:3000/login', values, {
          withCredentials: true, // Allow sending cookies with cross-origin requests
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          setIsAuthenticated(true); // Set the authentication state to true
          resetForm();
          navigate('/dashboard');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
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
            <Link to='/'>
              <img src={Logo} alt='Fitness Quest' />
            </Link>
            <div className='nav-links'>
              <Link to='/'>Home</Link>
              <Link to='/'>FAQ</Link>
            </div>
          </div>
          <div className='auth'>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className='login-input'>
                <p>
                  <b>Don't have an account?</b><Link to="/signup">Register</Link>
                </p>
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
                          className={errors.email && touched.email ? 'input-error' : ''}
                        />
                      </div>
                      {errors.email && touched.email && <p className='error-text'>{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <div className='form-input'>
                      <div className='form-icon'>
                        <RiLockPasswordFill className='form-icon-img' />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.password && touched.password ? 'input-error' : ''}
                        />
                        <div onClick={ShowPassword} className='show-password-icon'>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>
                      {errors.password && touched.password && <p className='error-text'>{errors.password}</p>}
                    </div>
                  </div>
                  <div className='form-submit'>
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <ClipLoader color={'#fff'} size={20} /> : 'Sign In'}
                    </button>
                    <p className='forgot-password'>
                      <Link to='/forgot-password'>Forgot Password?</Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='auth-img'>
          <img src={LoginImg} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;

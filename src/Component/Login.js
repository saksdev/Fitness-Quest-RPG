import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast, { Toaster } from 'react-hot-toast';

import './Css/auth.css';
import Logo from '../img/nav-logo.svg';
import LoginImg from "../img/Login-img.jpg";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: ""
  };

  const LoginSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("This is required")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values, action) => {
      // console.log(values);
      try {
        const Loginresponse = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (Loginresponse.ok) {
          const data = await Loginresponse.json();
          console.log('Login successful:', data);
          toast.success("Login successful")
          navigate('/dashboard');
        } else {
          // const errorData = await Loginresponse.json(); // Removed since it is not used
          toast.error('Login failed. Please check your credentials.');
        }
      } catch (error) {
        // console.error('Error:', error);
        toast.error('An error occurred during login');
      }
      action.resetForm();
    }
  });

  const [showPassword, setShowPassword] = useState(true);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 769);

  const ShowPassword = (e) => {
    setShowPassword(!showPassword);
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
                        <MdMarkEmailUnread className='form-icon-img'/>
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
                    {errors.email && touched.email ? <p className='Form-error'>{errors.email}</p> : null}
                  </div>
                  <div>
                    <div className='form-input'>
                      <div className='form-icon'>
                        <RiLockPasswordFill className='form-icon-img' />
                        <input
                          type={showPassword ? "password" : "text"}
                          placeholder="Password"
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {showPassword ? (
                          <FaEyeSlash className='Eyechange' onClick={ShowPassword} />
                        ) : (
                          <FaEye className='Eyechange' onClick={ShowPassword} />
                        )}
                      </div>
                    </div>
                    {errors.password && touched.password ? <p className='Form-error'>{errors.password}</p> : null}
                  </div>
                </div>
                <span className="forgot-password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </span>
                <button className='btn access-btn' type="submit">
                  Access My Account
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";

import './Css/auth.css';
import Logo from '../img/nav-logo.svg';
import { FaArrowRight } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
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
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    }
  });


  const [showPassword, setShowPassword] = useState(true);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 769);

  const ShowPassword = (e) => {
    console.log(e);
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
                        <MdMarkEmailUnread />
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
                        <RiLockPasswordFill />
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
                <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                <button className='btn access-btn' type="submit">
                  Access My Account<span><FaArrowRight /></span>
                </button>
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

export default Login;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import './Css/auth.css';

import Logo from '../img/nav-logo.svg';
import SignupImg from "../img/Signup-img.jpg";

import { FaArrowRight } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const ShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const ShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  const SignupSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("This is required"),
    confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Your passwords does not match")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    }
  });

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
                  <div>
                    <div className="form-input">
                      <div className="form-icon">
                        <FaUserAlt />
                        <input
                          type="text"
                          placeholder="Name"
                          name='name'
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    {errors.name && touched.name ? <p className='Form-error'>{errors.name}</p> : null}
                  </div>
                  <div>
                    <div className="form-input">
                      <div className="form-icon">
                        <MdMarkEmailUnread />
                        <input
                          type="email"
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
                    <div className="form-input">
                      <div className="form-icon">
                        <RiLockPasswordFill />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          name='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {showPassword ? (
                          <FaEye className='Eyechange' onClick={ShowPassword} />
                        ) : (
                          <FaEyeSlash className='Eyechange' onClick={ShowPassword} />
                        )}
                      </div>
                    </div>
                    {errors.password && touched.password ? <p className='Form-error'>{errors.password}</p> : null}
                  </div>
                  <div>
                    <div className="form-input">
                      <div className="form-icon">
                        <RiLockPasswordFill />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          name='confirm_password'
                          value={values.confirm_password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {showConfirmPassword ? (
                          <FaEye className='Eyechange' onClick={ShowConfirmPassword} />
                        ) : (
                          <FaEyeSlash className='Eyechange' onClick={ShowConfirmPassword} />
                        )}
                      </div>
                    </div>
                    {errors.confirm_password && touched.confirm_password ? <p className='Form-error'>{errors.confirm_password}</p> : null}
                  </div>
                </div>
                <button className='btn access-btn' type="submit">
                  Sign Up<span><FaArrowRight /></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isWideScreen && (
        <div className='auth-image'>
            <img src={SignupImg} alt="Signup Image" />
        </div>
      )}
    </div>
  );
};

export default Signup;
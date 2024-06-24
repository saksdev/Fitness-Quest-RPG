import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast, { Toaster } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import './Css/auth.css';
import Logo from '../img/nav-logo.svg';
import SignupImg from "../img/Signup-img.jpg";

import { FaUserAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    confirmPassword: ""
  };

  const SignupSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(8).required("This is required"),
    confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Your passwords do not match")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
    onSubmit: (values, action) => {
      setIsSubmitting(true);
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message.status === 201) {
            toast.success(data.message.message);
            action.resetForm();
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            toast.error(data.message.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('An error occurred. Please try again later.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
  });

  return (
    <div className="auth-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="auth-form-container">
        <div className="auth-form">
          <div className="auth-nav">
            <Link to="/">
              <img src={Logo} alt="Fitness Quest" />
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              {/* <Link to="/">FAQ</Link> */}
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
                        <FaUserAlt className='form-icon-img' />
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
                        <MdMarkEmailUnread className='form-icon-img' />
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
                        <RiLockPasswordFill className='form-icon-img' />
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
                        <RiLockPasswordFill className='form-icon-img' />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          name='confirmPassword'
                          value={values.confirmPassword}
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
                    {errors.confirmPassword && touched.confirmPassword ? <p className='Form-error'>{errors.confirmPassword}</p> : null}
                  </div>
                </div>
                <button className='btn btn-primary access-btn' type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <BeatLoader size={7} color={"#fff"} /> : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isWideScreen && (
        <div className='auth-image'>
          <img src={SignupImg} alt="Signup" />
        </div>
      )}
    </div>
  );
};

export default Signup;
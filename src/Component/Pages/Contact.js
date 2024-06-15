import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

import Navigation from '../MainNavbar.js';

import '../Css/Pages.css';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const ContactSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const response = await axios.post('/api/contact', values);

        if (response.status === 200) {
          toast.success('Message sent successfully!');
          resetForm();
        } else {
          toast.error('Error sending message. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
        console.error('Error sending message:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Navigation />
      <div className="contact-page">
        <Toaster position="top-right" reverseOrder={false} />
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            {errors.name && touched.name ? <p className="Form-error">{errors.name}</p> : null}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            />
            {errors.email && touched.email ? <p className="Form-error">{errors.email}</p> : null}
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control"
            ></textarea>
            {errors.message && touched.message ? <p className="Form-error">{errors.message}</p> : null}
          </div>
          <button type="submit" className="btn access-btn" disabled={isSubmitting}>
            {isSubmitting ? <ClipLoader size={15} color={"#fff"} /> : 'Send Message'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactPage;
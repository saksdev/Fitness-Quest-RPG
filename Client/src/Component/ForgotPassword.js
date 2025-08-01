import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Navigation from './MainNavbar.js';
import { forgotPassword } from '../api.js'; // ✅ Import forgotPassword API
import './Css/auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await forgotPassword(email); // ✅ Use api.js function
      toast.success(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="forgotPassword auth">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className='forgot-input'>
            <label htmlFor="email">Email:</label>
            <input
              className='auth'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className='btn btn-primary' type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;

import React from 'react';
import './Css/NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>Oops!</h1>
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
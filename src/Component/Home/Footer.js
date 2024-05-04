import React from 'react';
import { FaDiscord, FaRedditAlien, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className='footer-logo'>
          {/* <a href=''><img src='' alt='Logo'></img></a> */}
        </div>
        <div className="footer-links">
          <a href='/' target='blank'><FaDiscord /></a> <hr></hr>
          <a href='/' target='blank'><FaXTwitter /></a> <hr></hr>
          <a href='/' target='blank'><FaRedditAlien /></a> <hr></hr>
          <a href='/' target='blank'><FaLinkedin /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Fitness Quest RPG. All rights reserved.</p>
      </div>
    </footer >
  );
};

export default Footer;
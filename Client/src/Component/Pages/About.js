import React from 'react';
import '../Css/Pages.css';
import Navigation from '../MainNavbar.js';
// import healthTrackingImage from '../../img/Health-Tracking.webp';

const AboutPage = () => {
  return (
    <>
      <Navigation />
      <div className="about-container">
        <h1>About Fitness Quest RPG</h1>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to Fitness Quest RPG, an innovative role-playing game that seamlessly blends the excitement of virtual adventures with the pursuit of a healthier lifestyle. Our mission is to make fitness fun, engaging, and accessible to everyone, regardless of their age or fitness level.
            </p>
            <p>
              At Fitness Quest RPG, we believe that staying active should be an enjoyable experience. That's why we've created a captivating fantasy world where you can embark on thrilling quests, battle formidable foes, and earn rewards while simultaneously tracking your real-world fitness progress.
            </p>
            <p>
              Our cutting-edge technology, including augmented reality, advanced fitness tracking, and virtual coaching, immerses you in a truly immersive gaming experience. With customizable avatars, social interactions, leaderboards, and challenges, Fitness Quest RPG fosters a vibrant community of like-minded adventurers who support and motivate each other on their fitness journeys.
            </p>
          </div>
        </div>
        <div className="about-cta">
          <button className="btn btn-primary">Singup Now</button>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
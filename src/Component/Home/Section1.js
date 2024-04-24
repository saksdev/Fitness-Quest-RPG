import React from 'react';
import fitnessQuestImage from '../../img/FitnessQuestRPG.svg'

const HeroSection = () => {
  return (
    <section className="section1">
      <div className="hero-section">
        <div className="hero-content-container">
          <div className='hero-content'>
            <h1>Earn Rewards and Level Up Your Fitness</h1>
            <p className="hero-description">Get Fit with Fitness Quest RPG - an exciting role-playing game that turns your workouts into epic adventures!</p>
            <div className="cta-buttons">
              <a href="/signup" className="btn btn-primary">Sign Up Now</a>
              <a href="/learn-more" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src={fitnessQuestImage} alt="Fitness Quest RPG" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

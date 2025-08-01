import React from 'react'
import Navigation from '../MainNavbar.js';

import '../Css/Pages.css';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Immersive Quests',
      description: 'Embark on epic adventures and engage in thrilling quests that transport you to fantastical realms. Battle formidable foes, unravel mysteries, and forge your own destiny.',
    },
    {
      title: 'Fitness Tracking',
      description: 'Stay motivated and monitor your progress with our advanced fitness tracking system. Analyze your activity levels, set personalized goals, and unlock achievements as you level up.',
    },
    {
      title: 'Customizable Avatar',
      description: 'Express your unique style by creating your own personalized avatar. Choose from a vast array of options, from hairstyles to clothing, and craft an identity that truly represents you.',
    },
    {
      title: 'Social Interactions',
      description: 'Connect with a vibrant community of players from around the world. Form alliances, participate in group quests, and forge lasting friendships within our immersive virtual realm.',
    },
    {
      title: 'Augmented Reality',
      description: 'Experience the game like never before with our cutting-edge augmented reality technology. Bring the fantasy world to life around you and interact with virtual objects in your real-world environment.',
    },
    {
      title: 'Competitive Leaderboards',
      description: 'Challenge yourself and climb the ranks on our global leaderboards. Compete against players from around the world and showcase your skills in various game modes. Earn rewards and glory as you strive for the top spots.',
    },
    {
      title: 'Unleash Your Creativity',
      description: 'Explore a boundless realm where imagination takes flight. Unleash your creativity and shape your own unique experiences within our immersive virtual world.',
    },
  ];

  return (
    <>
    <Navigation />
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h2 className="feature-title">{feature.title}</h2>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturesPage;
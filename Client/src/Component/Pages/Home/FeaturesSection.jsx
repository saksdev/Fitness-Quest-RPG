import React from 'react';
import FitnessTracking from '../../../img/FitnessTracking.png'
import ImmersiveQuests from '../../../img/ImmersiveQuests.png'
import CustomizableAvatar from '../../../img/CustomizableAvatar.jpg'

const FeaturesSection = () => {
  return (
    <section className="features">
      <div className="features-container">
        <h1>Key Features</h1>
        <div className="feature-list">
          <div className="feature">
            <img src={ImmersiveQuests} alt="Immersive Quests" />
            <h3>Immersive Quests</h3>
            <p>
              Embark on epic adventures and engage in thrilling quests that
              transport you to fantastical realms. Battle formidable foes,
              unravel mysteries, and forge your own destiny.
            </p>
          </div>
          <div className="feature">
            <img src={FitnessTracking} alt="Fitness Tracking" />
            <h3>Fitness Tracking</h3>
            <p>
              Stay motivated and monitor your progress with our advanced
              fitness tracking system. Analyze your activity levels, set
              personalized goals, and unlock achievements as you level up.
            </p>
          </div>
          <div className="feature">
            <img src={CustomizableAvatar} alt="Customizable Avatar" />
            <h3>Customizable Avatar</h3>
            <p>
              Express your unique style by creating your own personalized
              avatar. Choose from a vast array of options, from hairstyles to
              clothing, and craft an identity that truly represents you.
            </p>
          </div>
          <div className="feature">
            <img src="icon4.png" alt="Social Interactions" />
            <h3>Social Interactions</h3>
            <p>
              Connect with a vibrant community of players from around the world.
              Form alliances, participate in group quests, and forge lasting
              friendships within our immersive virtual realm.
            </p>
          </div>
          <div className="feature">
            <img src="icon5.png" alt="Augmented Reality" />
            <h3>Augmented Reality</h3>
            <p>
              Experience the game like never before with our cutting-edge
              augmented reality technology. Bring the fantasy world to life
              around you and interact with virtual objects in your real-world
              environment.
            </p>
          </div>
          <div className="feature">
            <img src="icon6.png" alt="Competitive Leaderboards" />
            <h3>Competitive Leaderboards</h3>
            <p>
              Challenge yourself and climb the ranks on our global leaderboards. Compete
              against players from around the world and showcase your skills in various
              game modes. Earn rewards and glory as you strive for the top spots.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


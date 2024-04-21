import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="features">
      <div className="container">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature">
            <img src="icon1.png" alt="Feature 1" />
            <h3>Immersive Quests</h3>
            <p>Engage in thrilling quests and battle foes.</p>
          </div>
          <div className="feature">
            <img src="icon2.png" alt="Feature 2" />
            <h3>Fitness Tracking</h3>
            <p>Monitor your activity and progress.</p>
          </div>
          {/* Add more features */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
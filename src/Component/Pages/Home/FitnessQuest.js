import React from 'react';
import FitnessQuestImg from '../../../img/FitnessQuest.png';

const FitnessQuest = () => {
  return (
    <section className="fitness-quest">
      <div className="container">
        <div className="image">
          <img src={FitnessQuestImg} alt="Fitness Quest" />
        </div>
        <div className="content">
          <h2>Embark on a Fitness Adventure</h2>
          <p>
            Join our vibrant community of fitness enthusiasts and embark on an
            extraordinary quest to conquer your fitness goals. Connect with
            like-minded adventurers, share your progress, and inspire each other
            on this epic journey towards a healthier lifestyle.
          </p>
          <a href="/" className="btn">
            Join the Quest
          </a>
        </div>
      </div>
    </section>
  );
};

export default FitnessQuest;
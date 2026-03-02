import React from 'react';
import creativity from '../../../img/Creativity.png';

const CreativeRealm = () => {
  return (
    <section className="creative-realm">
      <div className="container">
        <div className="content">
          <h2>Unleash Your Creativity</h2>
          <p>
            Explore a boundless realm where imagination takes flight. Unleash
            your creativity and shape your own unique experiences within our
            immersive virtual world.
          </p>
          <a href="/" className="btn">
            Learn More
          </a>
        </div>
        <div className="image">
          <img src={creativity} alt="Creativity" />
        </div>
      </div>
    </section>
  );
};

export default CreativeRealm;


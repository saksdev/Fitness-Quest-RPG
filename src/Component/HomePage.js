// HomePage.js
import React from 'react';
import './Css/HomePage.css'

import Navigation from './MainNavbar.js';

import Section1 from './Home/HeroSection.js';
import Section2 from './Home/FeaturesSection.js';
import Section3 from './Home/CreativeRealm.js';
import Section4 from './Home/FitnessQuest.js';
import Footer from './Home/Footer.js';

const HomePage = () => {
	return (
		<>
		<Navigation />	
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
			<Footer />
		</>
	);
};

export default HomePage;
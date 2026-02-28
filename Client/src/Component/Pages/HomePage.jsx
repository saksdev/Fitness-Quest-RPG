import React from 'react';
import '../Css/HomePage.css'
import Navigation from '../MainNavbar';
import Section1 from './Home/HeroSection';
import Section2 from './Home/FeaturesSection';
import Section3 from './Home/CreativeRealm';
import Section4 from './Home/FitnessQuest';
import Footer from './Home/Footer';

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


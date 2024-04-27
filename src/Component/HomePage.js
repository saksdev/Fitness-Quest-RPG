// Home Folder Css

import React from 'react';
import './Css/HomePage.css'
import Section1 from './Home/Section1.js';
import Section2 from './Home/Section2.js';
import Section3 from './Home/Section3.js';
import Section4 from './Home/Section4.js';

const HomePage = () => {
	return (
		<>
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
		</>
	);
};

export default HomePage;
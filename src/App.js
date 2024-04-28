import './App.css';
import { useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Navigation from './Component/Navigation';
import HomePage from './Component/HomePage';

function App() {
  // useEffect(() => {
  //   Scrollbar.use(OverscrollPlugin);

  //   const scrollbar = Scrollbar.init(document.querySelector('#smooth'), {
  //     damping: 0.05,
  //     overscrollEffect: 'bounce',
  //     plugins: {
  //       overscroll: {
  //         effect: 'bounce',
  //         damping: 0.05,
  //         maxOverscroll: 100,
  //       },
  //     },
  //   });

  //   // Clean up the smooth-scrollbar instance when the component unmounts
  //   return () => {
  //     scrollbar.destroy();
  //   };
  // }, []);

  return (
    <>
      {/* <div id="smooth" style={{ height: '100vh', overflow: 'auto' }}> */}
        <Navigation />
        <HomePage />
      {/* </div> */}
    </>
  );
}

export default App;
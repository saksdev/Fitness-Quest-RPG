import './App.css';
import { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Navigation from './Component/Navigation';
import HomePage from './Component/HomePage';

function App() {
  const scrollbarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);

    const scrollbar = Scrollbar.init(document.querySelector('#smooth'), {
      damping: 0.01,
      overscrollEffect: 'bounce',
      plugins: {
        overscroll: {
          effect: 'bounce',
          damping: 0.1,
          maxOverscroll: 200,
        },
      },
    });

    // Adjust content height to allow scrolling beyond original position
    const content = contentRef.current;
    content.style.height = '200vh'; // Set the content height to 200% of the viewport height

    return () => {
      scrollbar.destroy();
    };
  }, []);

  return (
    <>
      <div id='smooth' style={{ height: '100vh', overflow: 'auto' }}>
        <div ref={contentRef}>
          <Navigation />
          <HomePage />
        </div>
      </div>
    </>
  );
}

export default App;
import React from 'react'

function SmoothScroll() {
  return (
    <div>SmoothScroll</div>
  )
}

export default SmoothScroll



// import React, { useEffect, useRef } from 'react';
// import Scrollbar from 'smooth-scrollbar';

// const SmoothScroll = () => {
//   const scrollRef = useRef(null);
//   const options = {
//     damping: 0.05,
//   };

//   useEffect(() => {
//     if (scrollRef.current) {
//       const scrollbar = Scrollbar.init(scrollRef.current, options);
//       return () => scrollbar.destroy(); // Clean up
//     }
//   }, []);

//   return null
// };

// export default SmoothScroll;

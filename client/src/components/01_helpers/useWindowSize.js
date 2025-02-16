// import { useState, useEffect, useRef } from 'react';

// const useWindowSize = () => {
//     const [windowSize, setWindowSize] = useState({
//         width: null,
//         height: null,
//     });

//     useEffect(() => {
//         function handleResize() {
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//         };

//         handleResize();

//         window.addEventListener('resize', handleResize);

//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return windowSize;
// };

// export default useWindowSize;

// /* 
// sm	640px	
// md	768px	
// lg	1024px	
// xl	1280px	
// 2xl	1536px
// */
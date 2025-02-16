import React, { Suspense, lazy, useContext, useEffect } from 'react';
import Header from './02_header/Header';
import Footer from './footer/Footer';
import FallBack from './01_helpers/FallBack';
import { DarkModeContext } from './00_context/DarkModeContext';

const MainContainer = React.lazy(() => import('./03_pages/MainContainer'));

function App() {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.classList.add('hide-scrollbar');
    return () => {
      document.body.classList.remove('hide-scrollbar');
    };
  }, []); // Hide scrollbar on body when elements get too big

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="app flex flex-col min-h-screen text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background transition-colors">
        <Suspense fallback={<FallBack />}>
          <Header />
          <MainContainer />
          <Footer />
        </Suspense>
      </div >
    </div>
  );
};

export default App;
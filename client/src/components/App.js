import { Suspense, useContext, useEffect } from 'react';
import MainContainer from './03_pages/MainContainer';
import Header from './02_header/Header';
import Footer from './footer/Footer';
import FallBack from './01_helpers/FallBack';
import { DarkModeContext } from './00_context/DarkModeContext';

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
      <div className="app min-h-screen text-light-text dark:text-dark-text bg-light-background dark:bg-dark-background flex flex-col">
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
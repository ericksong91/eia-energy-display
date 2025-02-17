import fetchData from './01_helpers/fetchData';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, lazy, useContext, useEffect } from 'react';
import Header from './02_header/Header';
import Footer from './footer/Footer';
import LoadingFallBack from './01_helpers/LoadingFallBack';
import { DarkModeContext } from './00_context/DarkModeContext';
const MainContainer = lazy(() => import('./03_pages/MainContainer'));

const resource = fetchData('/states');

function App() {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.classList.add('hide-scrollbar');
    return () => {
      document.body.classList.remove('hide-scrollbar');
    };
  }, []); // Hide scrollbar on body

  function fallbackRender({ error }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }; // Error fallback component

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="app flex flex-col
              min-h-screen 
              text-light-text dark:text-dark-text 
              bg-light-background dark:bg-dark-background
              duration-500
              transition-colors"
      >
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Suspense fallback={<LoadingFallBack />}>
            <Header />
            <MainContainer resource={resource} />
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div >
    </div>
  );
};

export default App;
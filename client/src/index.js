import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { DarkModeProvider } from './components/00_context/DarkModeContext';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <DarkModeProvider>
      {/* <Router> */}
      <App />
      {/* </Router> */}
    </DarkModeProvider>
  </StrictMode>
);

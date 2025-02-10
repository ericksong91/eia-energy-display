import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './components/App';
import { DarkModeProvider } from './components/00_context/DarkModeContext';
import { IconProvider } from './components/00_context/IconContext';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <DarkModeProvider>
      <IconProvider>
        <App />
      </IconProvider>
    </DarkModeProvider>
  </StrictMode>
);

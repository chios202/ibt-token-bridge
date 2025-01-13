import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create the root element where our React application will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the app in StrictMode for better development experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
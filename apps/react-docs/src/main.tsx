import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeRegistry } from './lib/registry';
import './index.css';

// Initialize the component registry
initializeRegistry();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

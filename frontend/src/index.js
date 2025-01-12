import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Removed container wrapper here, assuming it's in App */}
  </React.StrictMode>
);

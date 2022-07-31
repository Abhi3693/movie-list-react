import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import ErrorBoundary from './errorBoundary/errorBoundary';
import "./stylesheet/style.scss";

let root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Router>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';

import { positions, transitions, Provider as AlertProvider } from "react-alert"; // Corrected import
import AlertTemplate from "react-alert-template-basic";

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeout: 5000, // 5 seconds
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();

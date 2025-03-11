import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios"


// axios.defaults.baseURL = "https://express-server-s0sj.onrender.com"
axios.defaults.baseURL = "http://localhost"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import the functions you need from the SDKs you need


import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import GlobalErrorBoundary from './components/GlobalErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </GlobalErrorBoundary>
  </React.StrictMode>,
)

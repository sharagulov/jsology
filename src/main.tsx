import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@styles/index.scss'
import { Bar } from '@ui/Bar/Bar.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Bar type="header" />
    <App />
  </React.StrictMode>
)

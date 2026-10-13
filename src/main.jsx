import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* "user" makes every Motion animation respect prefers-reduced-motion */}
    <MotionConfig reducedMotion="user">
     <BrowserRouter>
    <App />
  </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)

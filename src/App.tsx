import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import CanvasPage from '@pages/CanvasPage/CanvasPage'
import HelloPage from '@pages/HelloPage/HelloPage'
import { AnimatePresence } from 'framer-motion'
import { OnboardingEntry } from './components/OnboardingEntry'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/canvas" element={<OnboardingEntry />} />
        <Route path="/canvas/:id" element={<CanvasPage />} />
        <Route path="/" element={<HelloPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
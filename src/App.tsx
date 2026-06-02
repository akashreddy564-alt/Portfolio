import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import Timeline from './components/Timeline'
import Explorations from './components/Explorations'
import Metrics from './components/Metrics'
import Footer from './components/Footer'

function HomePage() {
  return (
    <main>
      <Hero />
      <BentoGrid />
      <Timeline />
      <Explorations />
      <Metrics />
      <Footer />
    </main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [contentReady, setContentReady] = useState(false)

  return (
    <BrowserRouter>
      <AnimatePresence onExitComplete={() => setContentReady(true)}>
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {contentReady && (
        <>
          <Navbar />
          <AnimatedRoutes />
        </>
      )}
    </BrowserRouter>
  )
}

export default App

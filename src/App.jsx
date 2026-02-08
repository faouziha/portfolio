import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { inject } from '@vercel/analytics';

// Initialize immediately outside the component
inject();

function App() {
  

  return (
    <>
      <Home />
    </>
  )
}

export default App

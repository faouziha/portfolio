import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { inject } from '@vercel/analytics';

inject();

function App() {
  

  return (
    <>
      <Home />
    </>
  )
}

export default App

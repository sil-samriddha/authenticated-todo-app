import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Splashscreen from './Pages/Splashscreen'
import Signupscreen from './Pages/Signupscreen'
import Signin from './Pages/Signin'
import Verify from './Pages/Verify'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className='circle-1'></div>
      <div className='circle-2'></div>
      
      <Routes>
        <Route path="/" element={<Splashscreen />}/>
          <Route path="/signup" element={<Signupscreen />} />
          <Route path="/signin" element={<Signin /> } />
          <Route path="/verify" element={<Verify /> } />
          <Route path="/app" element={<Dashboard /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import CodeArena from './pages/home'
function App() {
  return (
    <Routes>
      <Route path='/' element={<CodeArena/>} />
    </Routes>
  )
}

export default App
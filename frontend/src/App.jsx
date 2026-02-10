import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import CodeArenaElite from './pages/home'
function App() {
  return (
    <Routes>
      <Route path='/' element={<CodeArenaElite/>} />
    </Routes>
  )
}

export default App
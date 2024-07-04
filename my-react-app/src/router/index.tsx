import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Private from './private/Private'
import Auth from '../pages/Auth/Auth'

const index = () => {
  return (
    <Routes>
      <Route path='/:authName' element={<Auth />} />
      <Route path='/' element={<Private />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default index
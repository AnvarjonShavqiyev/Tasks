import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Private from './private/Private'
import Auth from '../pages/Auth/Auth'
import Profile from '../pages/Profile/Profile'

const index = () => {
  return (
    <Routes>
      <Route path='/:authName' element={<Auth />} />
      <Route path='/' element={<Private />}>
        <Route path='/' element={<Home />} />
        <Route path='/profile/:id' element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default index
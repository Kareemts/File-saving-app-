import React from 'react'
import {Navigate,Outlet } from 'react-router-dom'

function Authorisation() {
  const token =localStorage.getItem('token')
  return (
  token?<Outlet/>:<Navigate to="/"/>
  )
}

export default Authorisation
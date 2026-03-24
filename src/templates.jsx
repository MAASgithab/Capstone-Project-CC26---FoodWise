import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../component/NavbarComponent'

export default function Template() {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
    </div>
  )
}

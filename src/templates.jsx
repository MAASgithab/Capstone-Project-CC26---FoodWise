import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './component/NavbarComponent'
import FooterComponent from './component/FooterComponent'

export default function Template() {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  )
}

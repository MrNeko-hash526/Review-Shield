import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../components/Footer/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout

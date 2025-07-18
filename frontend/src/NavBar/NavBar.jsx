import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiBars3, HiXMark } from 'react-icons/hi2'
import { HiShieldCheck } from 'react-icons/hi'


// Navigation Button Component
const NavButton = ({ children, to }) => {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-white hover:text-blue-200 transition-colors duration-200 font-medium relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const navItems = [
    { name: "About", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Testimonials", to: "/testimonials" },
    { name: "Contact", to: "/contact" }
  ]

  return (
    <>
      <nav className="w-full h-16 bg-gradient-to-r from-[#6872ff] to-[#4c56d9] shadow-lg sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                  <HiShieldCheck className="h-6 w-6 text-[#6872ff]" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white font-sans tracking-tight">
                Review Shield
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <NavButton to={item.to}>
                      {item.name}
                    </NavButton>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-gray-200 transition-colors duration-200 p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <HiXMark className="h-6 w-6" />
                ) : (
                  <HiBars3 className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-[#5865e8] shadow-xl`}>
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block px-4 py-3 text-white hover:bg-[#4c56d9] rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
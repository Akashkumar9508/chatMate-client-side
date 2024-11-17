import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-500 text-center py-6 shadow-lg">
        <div className="container mx-auto px-6">
          <p className="mb-4">&copy; {new Date().getFullYear()} ChatMate. All rights reserved.</p>
          <div className="space-x-4">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
            <Link to="/" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

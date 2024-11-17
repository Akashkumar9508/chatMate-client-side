import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">ChatMate</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/features" className="hover:text-blue-400">Features</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        </div>

        <button
          className="text-white md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 px-6 py-4">
          <Link to="/" className="block py-2 hover:text-blue-400">Home</Link>
          <Link to="/features" className="block py-2 hover:text-blue-400">Features</Link>
          <Link to="/about" className="block py-2 hover:text-blue-400">About</Link>
          <Link to="/contact" className="block py-2 hover:text-blue-400">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;

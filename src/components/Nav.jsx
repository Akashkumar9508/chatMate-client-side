import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import Logout from './Logout.jsx';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="h-16 py-3 flex justify-between items-center px-4 ">
      <div className="logo flex justify-center items-center h-full cursor-pointer">
        <img src="/logo.png" className="h-full" alt="" />
        <h1 className="text-2xl font-bold">ChatMate</h1>
      </div>
      <div className="hidden md:flex space-x-6 pr-6 font-semibold text-lg">
        <Link to="/" className="hover:text-[#8e52ff]">Home</Link>
        <Link to="/friends" className="hover:text-[#8e52ff]">Friend</Link>
        <Link to="/dashboard" className="hover:text-[#8e52ff]">Dashboard</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
        </button>
        <div className="hidden md:flex">
          <Logout />
        </div>
      </div>

      <button
        className="md:hidden hamburger"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <FaBars />
      </button>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="w-[90%] mobile-menu fixed inset-0 bg-gray-800 px-6 py-4 z-10">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={toggleMenu}
            >
              <FaTimes />
            </button>

            <Link to="/" className="block py-2 hover:text-blue-400">Home</Link>
            <Link to="/friends" className="block py-2 hover:text-blue-400">Friend</Link>
            <Link to="/dashboard" className="block py-2 hover:text-blue-400">Dashboard</Link>
            <Logout />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;

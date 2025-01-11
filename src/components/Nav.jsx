import React, { useState, useEffect } from 'react';
import { NavLink ,Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdChangeCircle } from "react-icons/md";  // Settings Icon
import { Logout } from "./allComponents.js";
import { useSelector } from 'react-redux';

const Nav = () => {
  const auth = useSelector((state) => state.auth);
  const currentUser = auth?.userData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsHidden(true); // Scrolling down, hide navbar
    } else {
      setIsHidden(false); // Scrolling up, show navbar
    }
    setLastScrollY(window.scrollY); // Update last scroll position
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`-z-[90909] w-full h-14 py-3 flex justify-between items-center px-4 shadow-sm dark:shadow-white mb-1 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <NavLink to={`${currentUser ? `/user/${currentUser.userName}` : "/"}`} className="logo flex justify-center items-center h-full cursor-pointer">
        {currentUser && currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            className="h-8 w-8 rounded-full object-cover"
            alt={`${currentUser.fullName}'s avatar`}
          />
        ) : (
          <>
            <img src="https://res.cloudinary.com/chatmateapp/image/upload/v1734678699/i0atxfmhhbwemls6xqq8.png" className="h-[60%] md:h-full" alt="ChatMate Logo"/>
            <h1 className="text-1xl md:text-2xl font-bold">ChatMate</h1>
          </>
        )}
      </NavLink>

      <div className="hidden md:flex space-x-6 pr-6 font-semibold text-lg">
        <NavLink to="/" className={({ isActive }) => `hover:text-[#8e52ff] ${isActive ? "text-orange-400 border-b-2 border-orange-400" : ""}`}>Home</NavLink>
        <NavLink to="/friends" className={({ isActive }) => `hover:text-[#8e52ff] ${isActive ? "text-orange-400 border-b-2 border-orange-400" : ""}`}>Friend</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `hover:text-[#8e52ff] ${isActive ? "text-orange-400 border-b-2 border-orange-400" : ""}`}>Dashboard</NavLink>
        <NavLink to="/about" className={({ isActive }) => `hover:text-[#8e52ff] ${isActive ? "text-orange-400 border-b-2 border-orange-400" : ""}`}>About</NavLink>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex">
          <Logout />
        </div>
        
        {/* Settings Button */}
        <Link to="/setting" className="flex items-center space-x-1">
          <MdChangeCircle className="text-2xl" />
          <span className="hidden md:inline">Settings</span> {/* Hidden on mobile */}
        </Link>
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
            className="fixed inset-0 bg-black md:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="w-[90%] text-white backdrop-blur-sm bg-black bg-opacity-70 mobile-menu fixed inset-0 px-6 py-4 h-screen">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={toggleMenu}
            >
              <FaTimes />
            </button>

            <NavLink
              to="/"
              className={({ isActive }) => `block py-2 hover:text-blue-400 font-semibold text-lg ${isActive ? "text-orange-400" : ""}`}
              onClick={toggleMenu} // Close menu on click
            >
              Home
            </NavLink>
            <NavLink
              to="/friends"
              className="block py-2 hover:text-blue-400 font-semibold text-lg"
              onClick={toggleMenu} // Close menu on click
            >
              Friend
            </NavLink>
            <NavLink
              to="/dashboard"
              className="block py-2 hover:text-blue-400 font-semibold text-lg"
              onClick={toggleMenu} // Close menu on click
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `block py-2 hover:text-blue-400 font-semibold text-lg ${isActive ? "text-orange-400" : ""}`}
              onClick={toggleMenu} // Close menu on click
            >
              About
            </NavLink>
            <Logout />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;

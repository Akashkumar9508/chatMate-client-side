import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdChangeCircle } from 'react-icons/md';
import { Logout } from './allComponents.js';
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
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full z-50 bg-base-100 dark:bg-gray-900 transition-transform duration-300 shadow-md px-4 md:px-8 py-3 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex justify-between items-center">
        <NavLink
          to={`${currentUser ? `/user/${currentUser.userName}` : '/'}`}
          className="flex items-center space-x-2"
        >
          {currentUser && currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              className="h-10 w-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
              alt={`${currentUser.fullName}'s avatar`}
            />
          ) : (
            <>
              <img
                src="https://res.cloudinary.com/chatmateapp/image/upload/v1734678699/i0atxfmhhbwemls6xqq8.png"
                className="h-10"
                alt="ChatMate Logo"
              />
              <h1 className="text-xl md:text-2xl font-bold text-base-900">ChatMate</h1>
            </>
          )}
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300 hover:text-blue-500 ${
                isActive ? 'text-blue-600 border-b-2 border-blue-500' : 'text-base-900'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/friends"
            className={({ isActive }) =>
              `text- transition-colors duration-300 hover:text-blue-500 ${
                isActive ? 'text-blue-600 border-b-2 border-blue-500' : 'text-base-900'
              }`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors duration-300 hover:text-blue-500 ${
                isActive ? 'text-blue-600 border-b-2 border-blue-500' : 'text-base-900'
              }`
            }
          >
            Chats
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              ` transition-colors duration-300 hover:text-blue-500 ${
                isActive ? 'text-blue-600 border-b-2 border-blue-500' : 'text-base-900'
              }`
            }
          >
            About
          </NavLink>
        </div>

        {/* Settings & Logout */}
        <div className="md:flex items-center space-x-4">
          <div className="hidden md:block">
            <Logout />
          </div>
          <Link to="/setting" className="flex items-center space-x-2">
            <MdChangeCircle className="text-black-900" />
            <span className="text-base-900 hidden md:block">Settings</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-base-900"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-black bg-opacity-60  z-40">
          <div className="bg-base-100 dark:bg-gray-900 w-full p-6 flex flex-col space-y-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-2 font-medium text-lg hover:text-blue-500 transition-colors duration-300 ${
                  isActive ? 'text-blue-600' : 'text-base-900'
                }`
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/friends"
              className={({ isActive }) =>
                `py-2 font-medium text-lg hover:text-blue-500 transition-colors duration-300 ${
                  isActive ? 'text-blue-600' : 'text-base-900'
                }`
              }
              onClick={toggleMenu}
            >
              Explore
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `py-2 font-medium text-lg hover:text-blue-500 transition-colors duration-300 ${
                  isActive ? 'text-blue-600' : 'text-base-900'
                }`
              }
              onClick={toggleMenu}
            >
              Chats
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `py-2 font-medium text-lg hover:text-blue-500 transition-colors duration-300 ${
                  isActive ? 'text-blue-600' : 'text-base-900'
                }`
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>

            <Logout />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;

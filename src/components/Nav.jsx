import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Logout from './Logout';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };
    fetchUser();

    const closeMenu = (event) => {
      if (event.target.closest('.mobile-menu') === null && event.target.closest('.hamburger') === null) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <nav className="text-white py-3 shadow-lg flex justify-between items-center px-5">
      <div className="w-full flex justify-between items-center">
        {!user && (
          <h1 className="text-2xl font-bold">ChatMate</h1>
        )}
        <div className="hidden md:flex space-x-6 text-[20px] pr-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/friends" className="hover:text-blue-400">Friend</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Logout />
        </div>

        {user && (
          <div className="md:hidden flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <button
          className="text-white md:hidden hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden"
            onClick={toggleMenu}
          ></div>

          <div className="mobile-menu fixed inset-0 bg-gray-800 text-white px-6 py-4 z-10">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={toggleMenu}
            >
              <FaTimes />
            </button>

            <Link to="/" className="block py-2 hover:text-blue-400">Home</Link>
            <Link to="/friends" className="block py-2 hover:text-blue-400">Friend</Link>
            <Link to="/dashboard" className="block py-2 hover:text-blue-400">Dashboard</Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 hover:text-red-400">
                Logout
              </button>
            ) : (
              <Link to="/login" className="block py-2 hover:text-blue-400">Login</Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice.js';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, userData } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="text-white py-3 shadow-lg flex justify-between items-center px-5 bg-gray-800">
      <div className="w-full flex justify-between items-center">
        {!status && (
          <h1 className="text-2xl font-bold">ChatMate</h1>
        )}
        <div className="hidden md:flex space-x-6 text-[20px] pr-6 ">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/friends" className="hover:text-blue-400">Friend</Link>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          {status ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-blue-400">Login</Link>
          )}
        </div>

        {status && userData && (
          <div className="md:hidden flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400">
              <img
                src={userData.avatar}
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
          <div className="w-[90%] mobile-menu fixed inset-0 bg-gray-800 text-white px-6 py-4 z-10 ">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={toggleMenu}
            >
              <FaTimes />
            </button>

            <Link to="/" className="block py-2 hover:text-blue-400">Home</Link>
            <Link to="/friends" className="block py-2 hover:text-blue-400">Friend</Link>
            <Link to="/dashboard" className="block py-2 hover:text-blue-400">Dashboard</Link>
            {status ? (
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

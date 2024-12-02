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
    <nav className="text-black h-16 py-3 flex justify-between items-center px-9 ">
      
        {!status && (
          <div className="logo  flex justify-center items-center h-full cursor-pointer ">
            <img src=" /logo.png " className="h-full" alt="" />
            <h1 className="text-2xl font-bold">Chat-Mate</h1>
          </div>
        )}
        <div className="hidden md:flex space-x-6 pr-6 font-medium">
          <Link to="/" className="hover:text-[#8e52ff]">Home</Link>
          <Link to="/friends" className="hover:text-[#8e52ff]">Friend</Link>
          <Link to="/dashboard" className="hover:text-[#8e52ff]">Dashboard</Link>
        </div>
        <div className="navBtn">
        {status ? (
            <button
              onClick={handleLogout}
              className="text-white hidden md:flex bg-[#8e52ff] px-5 py-1 rounded-full hover:bg-[#a079e8]  transition duration-300"
            >
              Logout
            </button>
            
            
          ) : (
            <button
              onClick={handleLogout}
              to='/login'
              className="text-white hidden md:flex bg-[#8e52ff] px-5 py-1 rounded-full hover:bg-[#a079e8]  transition duration-300"
            >
              Sign-in
            </button>
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
          className="text-black md:hidden hamburger"
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

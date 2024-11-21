import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/me'); 
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="text-white py-3 shadow-lg flex justify-center">
      <div className="w-full flex justify-between items-center px-5">
        <h1 className="text-2xl font-bold">ChatMate</h1>

        <div className="hidden md:flex space-x-6 text-[20px] pr-6">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/features" className="hover:text-blue-400">Features</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>
        </div>

        {user && (
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-400">
            <img
              src={user.avatar || 'https://picsum.photos/200'}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}

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
        </div>
      )}
    </nav>
  );
};

export default Nav;

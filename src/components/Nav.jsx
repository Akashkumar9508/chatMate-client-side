import React, { useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import Logout from './Logout.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice.js';

const Nav = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); 
  const auth = useSelector((state) => state.auth); 
  const currentUser = auth.userData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="h-16 py-3 flex justify-between items-center px-4">
      <div className="logo flex justify-center items-center h-full cursor-pointer">
      {currentUser && currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            className="h-10 w-10 rounded-full object-cover"
            alt={`${currentUser.fullName}'s avatar`}
          />
        ) : (
          <>
          <img src="/logo.png" className="h-full" alt="ChatMate Logo" />
          <h1 className="text-2xl font-bold">ChatMate</h1>
          </>
        )}
      </div>
      <div className="hidden md:flex space-x-6 pr-6 font-semibold text-lg">
        <Link to="/" className="hover:text-[#8e52ff]">Home</Link>
        <Link to="/friends" className="hover:text-[#8e52ff]">Friend</Link>
        <Link to="/dashboard" className="hover:text-[#8e52ff]">Dashboard</Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex">
          <Logout />
        </div>
        <button
          onClick={handleToggleTheme} 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon />}
        </button>
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
          <div className="w-[90%] mobile-menu fixed inset-0 bg-[#4f4848] px-6 py-4 z-10">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={toggleMenu}
            >
              <FaTimes />
            </button>

            <Link to="/" className="block py-2 hover:text-blue-400 font-semibold text-lg">Home</Link>
            <Link to="/friends" className="block py-2 hover:text-blue-400 font-semibold text-lg">Friend</Link>
            <Link to="/dashboard" className="block py-2 hover:text-blue-400 font-semibold text-lg">Dashboard</Link>
            <Logout />
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;

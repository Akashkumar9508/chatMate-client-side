import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons
import heartImg from "./assets/heartImg.png";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`mainSection flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Nav />
      <header className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-8">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full transition duration-300 z-50"
          style={{
            backgroundColor: isDarkMode ? "#8e52ff" : "#f3f4f6",
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>

        <div className="landingPage flex flex-col md:flex-row items-center md:justify-between w-full h-full md:gap-8">
          {/* Text Section */}
          <div className="flex flex-col items-start text-center md:text-left md:w-1/2 gap-4 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              Connect, <span className="text-[#8e52ff]">Communicate</span>, and Collaborate{" "}
              <span className="text-[#8e52ff]">Seamlessly</span>!
            </h1>
            <p className="hidden sm:block text-gray-700 sm:text-lg md:text-xl lg:text-lg">
              Experience real-time messaging with speed, security, and simplicity. Stay
              connected with friends, family, or colleagues in a modern chat app designed
              to make every conversation meaningful.
            </p>
            <Link
              to="/signup"
              className="text-white bg-[#8e52ff] px-6 py-3 rounded-full hover:bg-[#a079e8] transition duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Image Section */}
          <div className="flex justify-center md:w-1/2">
            <img
              src={heartImg}
              alt="Hero"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:scale-75"
            />
            <div className="absolute bottom-[50px] w-[30%] h-6 bg-gradient-to-br from-purple-600 to-blue-600 opacity-50 blur-lg rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Why Choose Section */}
      <section
  className={`flex-grow py-5 ${
    isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
  }`}
>
  <h2 className="text-3xl font-semibold text-center mb-8">
    Why Choose ChatMate?
  </h2>
  <div className="flex flex-wrap justify-center gap-8">
    <div
      className={`shadow-lg p-6 rounded-lg text-center max-w-xs ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h3
        className={`text-2xl font-semibold mb-2 ${
          isDarkMode ? "text-blue-300" : "text-blue-500"
        }`}
      >
        Real-Time Messaging
      </h3>
      <p>Enjoy instant conversations without delays.</p>
    </div>
    <div
      className={`shadow-lg p-6 rounded-lg text-center max-w-xs ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h3
        className={`text-2xl font-semibold mb-2 ${
          isDarkMode ? "text-blue-300" : "text-blue-500"
        }`}
      >
        Offline User Indicator
      </h3>
      <p>View which users are offline or online at any time.</p>
    </div>
    <div
      className={`shadow-lg p-6 rounded-lg text-center max-w-xs ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h3
        className={`text-2xl font-semibold mb-2 ${
          isDarkMode ? "text-blue-300" : "text-blue-500"
        }`}
      >
        Secure and Private
      </h3>
      <p>Our app uses end-to-end encryption to keep your chats secure.</p>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
};

export default App;

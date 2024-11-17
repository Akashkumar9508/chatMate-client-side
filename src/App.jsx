import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav.jsx';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
      <Nav />
      <header className="bg-gray-800 text-white py-16 text-center px-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChatMate</h1>
        <p className="text-lg mb-2">Your go-to app for seamless and secure real-time messaging!</p>
        <p className="text-lg mb-6">Connect, chat, and stay in touch with friends and colleagues.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md text-lg font-medium transition-colors">
            Get Started
          </Link>
          <Link to="/login" className="bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-100 py-2 px-6 rounded-md text-lg font-medium transition-colors">
            Login
          </Link>
        </div>
      </header>

      <section className="flex-grow py-5 bg-gray-800">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">Why Choose ChatMate?</h2>
        <div className="flex flex-wrap justify-center gap-8 ">
          <div className="bg-gray-700 shadow-lg p-6 rounded-lg text-center max-w-xs">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">Real-Time Messaging</h3>
            <p className="text-gray-300">Enjoy instant conversations without delays.</p>
          </div>
          <div className="bg-gray-700 shadow-lg p-6 rounded-lg text-center max-w-xs">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">Offline User Indicator</h3>
            <p className="text-gray-300">View which users are offline or online at any time.</p>
          </div>
          <div className="bg-gray-700 shadow-lg p-6 rounded-lg text-center max-w-xs">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">Secure and Private</h3>
            <p className="text-gray-300">Our app uses end-to-end encryption to keep your chats secure.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;

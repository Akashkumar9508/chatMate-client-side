import React from "react";
import { Link } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import heroImg from "../public/assets/heroImg.png"

const App = () => {
  return (
    <div className=" mainSection flex flex-col min-h-screen  text-black">
      <Nav />
      <header className=" text-center relative  h-[100vh]">
        <div className="landingPage h-full flex flex-col justify-center  md:flex md:flex-row md:justify-evenly md:items-center">
          <div className="floatChat absolute bottom-[60%] right-5 w-[44%] md:bottom-[13%] md:right-9  flex md:h-[6%] h-[4%] md:w-[13%] rounded-md bg-transparent px-1 ">
            <div className="text h-full w-1/2 md:w-[40%] flex text-white justify-center items-center">
              <span className="h-[5px] w-[5px]  bg-green-500 rounded-full mr-1"></span>
              join Chat
            </div>
            <div className="img h-full flex justify-center items-center w-1/2 md:w-[60%] ">
              <img
                src="/logo.png"
                className="md:h-[35px] h-[25px] md:w-[35px] w-[25px] bg-cover bg-center bg-slate-100 rounded-full border border-green-400"
                alt=""
              />
              <img
                src="/logo.png"
                className="md:h-[35px] h-[25px] md:w-[35px] w-[25px] md:-ml-4 -ml-2 bg-cover bg-center bg-slate-100 rounded-full border border-green-400"
                alt=""
              />
              <img
                src="/logo.png"
                className="md:h-[35px] h-[25px] md:w-[35px] w-[25px] md:-ml-4 -ml-2 bg-cover bg-center bg-slate-200 rounded-full border border-green-400"
                alt=""
              />
              <span className="bg-slate-200 rounded-full md:h-[35px] h-[25px] text-[0.6rem] md:text-base md:w-[35px] w-[25px] md:-ml-4 -ml-2 grid items-center">
                +6
              </span>
            </div>
          </div>
          <div className="text pl-4 md:pl-0 h-[55%] md:w-[60%] md:h-1/2 flex flex-col items-start gap-3 ">
            <h1 className="text-3xl  sm:text-3xl md:text-4xl lg:text-7xl font-medium mb-4 sm:mb-6 md:mb-8 text-left leading-tight">
              Connect, <span className="text-[#8e52ff]" >Communicate</span>, and Collaborate Seamlessly <span className="text-[#8e52ff]">!</span>
            </h1>
            <h5 className="text-base hidden sm:block sm:text-lg md:text-xl lg:text-xl font-medium text-gray-700 text-left sm:text-left">
              Experience real-time messaging with speed, <br />
              security, and simplicity. Stay connected with friends, <br />{" "}
              family, or colleagues in a modern chat app designed <br />
              to make every conversation meaningful.
            </h5>
            <Link
              to="/signup"
              className="text-white bg-[#8e52ff]  px-6 py-2 rounded-full hover:bg-[#a079e8]  transition duration-300"
            >
              Get Started
            </Link>
          </div>
          <div className="relative  -mt-44 flex justify-center items-center">
            <img
              src={heroImg}
              alt="Hero Image"
              className="w-full max-w-md sm:max-w-lg lg:max-w-xl"
            />
            <div className="absolute bottom-[-10px] w-[80%] h-6 bg-gradient-to-br from-purple-600 to-blue-600 opacity-50 blur-lg rounded-full"></div>
          </div>
        </div>

        <p className="text-lg mb-2">
          Your go-to app for seamless and secure real-time messaging!
        </p>
        <p className="text-lg mb-6">
          Connect, chat, and stay in touch with friends and colleagues.
        </p>
        <div className="flex justify-center space-x-4"></div>
      </header>

      <section className="flex-grow py-5 ">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Why Choose ChatMate?
        </h2>
        <div className="flex flex-wrap justify-center gap-8 ">
          <div className="bg-gray-700 shadow-lg p-6 rounded-lg text-center max-w-xs">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">
              Real-Time Messaging
            </h3>
            <p className="text-gray-300">
              Enjoy instant conversations without delays.
            </p>
          </div>
          <div className="bg-gray-700 shadow-lg p-6 rounded-lg text-center max-w-xs">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">
              Offline User Indicator
            </h3>
            <p className="text-gray-300">
              View which users are offline or online at any time.
            </p>
          </div>
          <div className="bg-gray-700 shadow-lg p-6 rounded-lg text-center max-w-xs">
            <h3 className="text-2xl font-semibold text-blue-400 mb-2">
              Secure and Private
            </h3>
            <p className="text-gray-300">
              Our app uses end-to-end encryption to keep your chats secure.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;

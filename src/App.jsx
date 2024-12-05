import { Link } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Nav from "./components/Nav.jsx";
import heartImg from "./assets/heartImg.png";

const App = () => {
  return (
    <div className={"mainSection flex flex-col min-h-screen "} >
      <Nav />
        <div className="landingPage flex flex-col md:flex-row items-center md:justify-between w-full h-lvh">
          <div className="flex flex-col md:items-start text-center md:text-left md:w-1/2 gap-4 px-12 h-full md:justify-center ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">Connect, <span className="text-[#8e52ff]">Communicate</span>, and Collaborate{" "}<span className="text-[#8e52ff]">Seamlessly</span>!</h1>
            <p className="hidden sm:block text-gray-700 sm:text-lg md:text-xl lg:text-lg">Experience real-time messaging with speed, security, and simplicity. Stay connected with friends, family, or colleagues in a modern chat app designed to make every conversation meaningful.</p>
            <Link to="/signup" className="text-white bg-[#8e52ff] px-6 py-3 rounded-full hover:bg-[#a079e8] transition duration-300 mt-2">Get Started</Link>
          </div>
          <div className="relative w-1/2 h-full flex items-center justify-center">
            <img src={heartImg} alt="Hero" className="absolute md:scale-75 object-scale-down" />
            <img src={heartImg} alt="Hero" className="absolute bottom-[25px] right-[280px] md:scale-75 object-scale-down" />
            <img src={heartImg} alt="Hero" className="absolute top-[20px] left-[290px] md:scale-75 object-scale-down" />
          </div>
        </div>

      <section className={"flex-grow py-5 "}>
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose ChatMate?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className={"shadow-lg p-6 rounded-lg text-center max-w-xs "}>
            <h3 className={"text-2xl font-semibold mb-2 "}>Real-Time Messaging</h3>
            <p>Enjoy instant conversations without delays.</p>
          </div>
          <div className={"shadow-lg p-6 rounded-lg text-center max-w-xs"} >
            <h3 className={"text-2xl font-semibold mb-2 "}> Offline User Indicator </h3>
            <p>View which users are offline or online at any time.</p>
          </div>
          <div className={"shadow-lg p-6 rounded-lg text-center max-w-xs"} > <h3 className={"text-2xl font-semibold mb-2"} > Secure and Private </h3>
            <p>Our app uses end-to-end encryption to keep your chats secure.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;

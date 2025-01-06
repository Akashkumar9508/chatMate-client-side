import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "./features/authSlice";
import { useEffect } from "react";

const App = () => {

  const { status } = useSelector((state) => state.auth);
  const dispatch=useDispatch();

  useEffect(() => {
    if (!status) {
      dispatch(fetchUser())
    }
  }, []);

  return (
    <div className="mainSection flex flex-col min-h-screen   ">
      <div className="landingPage flex flex-col md:flex-row items-center md:justify-between w-full h-lvh md:pt-0 pt-20 ">
        <div className="flex flex-col md:mt-0 mt-3 md:items-start text-center md:text-left md:w-1/2 gap-4 px-12 md:h-full h-[30%] md:justify-center ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">Connect, <span className="text-[#8e52ff]">Communicate</span>, and Collaborate{" "}<span className="text-[#8e52ff]">Seamlessly</span>!</h1>
          <p className="hidden sm:block sm:text-lg md:text-xl lg:text-lg">Experience real-time messaging with speed, security, and simplicity. Stay connected with friends, family, or colleagues in a modern chat app designed to make every conversation meaningful.</p>
          <Link to="/signup" className={`btn btn-primary rounded-full ${status ? "hidden" : ""}`}> <span className="block md:hidden">Get me There !!</span> <span className="md:block hidden">Get Started</span></Link>
        </div>
        <div className=" md:h-full h-[50%] md:w-1/2 w-[90%] flex md:items-center justify-center md:translate-y-0 translate-y-20">
          <div className="md:w-[75%] md:h-[70%] rounded-lg border border-white flex justify-center items-center md:py-0 py-1 ">
            <div className="w-[95%] h-[95%] flex flex-wrap items-center justify-around border border-white rounded-lg p-2 ">
              {Array.from({ length: 12 }).map((_, index) => {
                const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                const emojis = ["😀", "😎", "🎉", "🚀", "🐱", "🌟", "🔥", "💡", "🎵", "🌈", "🍀", "⚡"];
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                const randomDelay = Math.floor(Math.random() * 3);
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: randomColor,
                      animationDelay: `${randomDelay}s`
                    }}
                    className="w-[30%] h-[22%] rounded-md animate-pulse m-1 flex items-center justify-center text-3xl"
                  >
                    {randomEmoji}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className={"flex-grow py-5 "}>
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose ChatMate?</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className={"shadow-lg p-6 rounded-lg text-center max-w-xs"}>
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
    </div>
  );
};

export default App;

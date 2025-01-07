import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const ChatMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const loggedInUserId = useSelector((state) => state.auth.userData?._id);
  const messages = useSelector(
    (state) => state.message.messages[selectedUser?.userName]
  );

  // Reference to scroll to the bottom
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]); // Scroll whenever messages change

  return (
    <div className="h-full w-full bg-base-100 p-5 flex flex-col justify-end rounded-lg border border-base-300 overflow-hidden shadow-inner shadow-slate-400">
      {" "}
      {/* DaisyUI bg and border */}
      {/* Scrollable message container */}
      <div className="flex-2 overflow-y-auto scrollbar-hide pr-2">
        {/* Map messages from the bottom to top */}
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`mb-1 ${
              msg.sender === loggedInUserId ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`relative inline-block p-1 mt-2 rounded-3xl max-w-[70%] ${
                msg.sender === loggedInUserId
                  ? "bg-primary text-primary-content ml-auto"
                  : "bg-neutral text-neutral-content mr-auto"
              }`}
            >
              {/* Message Content */}
              <p className="px-3 py-1 textarea-lg text-xl font-medium break-words">{msg.content}</p>

              {/* Message Timestamp */}
              <p className="text-sm text-right px-3 pb-1">
                {new Date(msg.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {/* Scroll to the latest message */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;

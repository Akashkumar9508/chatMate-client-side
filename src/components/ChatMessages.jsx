import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const ChatMessages = () => {
    const { selectedUser } = useSelector(state => state.user);
    const loggedInUserId = useSelector((state) => state.auth.userData?._id);
    const messages = useSelector((state) => state.message.messages[selectedUser?.userName]);

    // Reference to scroll to the bottom
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message whenever messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" , block: "end", inline: "nearest"});
        }
    }, [messages]); // Scroll whenever messages change

    return (
        <div className="h-full w-full bg-gray-400 p-5 flex flex-col justify-end rounded-lg border-gray-600 overflow-hidden">
            {/* Scrollable message container */}
            <div className="flex-2 overflow-y-auto scrollbar-hide pr-2">
                {/* Map messages from the bottom to top */}
                {messages?.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-1 ${msg.sender === loggedInUserId ? 'text-right' : 'text-left'}`}
                    >
                        <div
                            className={`inline-block rounded-lg min-w-[10%] max-w-[70%] ${msg.sender === loggedInUserId ? 'bg-gray-700' : 'bg-gray-700'
                                }`}
                        >
                            <p className="h-[60%] w-full text-start px-2 text-sm break-words pt-1">{msg.content}</p>
                            <p className="h-[60%] w-full text-end px-2 text-[10px]">{new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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

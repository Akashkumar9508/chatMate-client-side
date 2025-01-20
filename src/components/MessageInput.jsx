import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../features/messageSlice.js";
import messagesService from "../services/messageService.js";
import { useSocket } from "../context/SocketContext.jsx";

const emojis = ["😀", "😂", "🥰", "😎", "🤔", "🙃", "😱", "🎉", "🔥", "🌈", "✨", "👍", "🥳", "😇", "🤩"];

const MessageInput = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [popupEmoji, setPopupEmoji] = useState(null); 
    const selectedUser = useSelector((state) => state.user?.selectedUser);
    const userData = useSelector((state) => state.auth.userData);
    const { socket } = useSocket();

    const handleSendMessage = async () => {
        try {
            if (message.trim() === "") {
                return; 
            }

            if (selectedUser) {
                dispatch(
                    addMessage({
                        senderId: userData?._id,
                        content: message,
                        Date: Date.now(),
                        userName: selectedUser.userName,
                    })
                );
                socket.emit('message',{message,to:selectedUser.userName,by:userData});
                await messagesService.sendMessage({ targetUser: selectedUser._id, text: message });
            }
            setMessage(""); 
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    // Handle "Enter" key press to send message
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            handleSendMessage();
        }
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setMessage(value);
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        setPopupEmoji(randomEmoji);
        setTimeout(() => setPopupEmoji(null), 1000);
    };

    return (
        <div className="relative w-full">
            <div className="flex w-full items-center space-x-3 mt-1">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message"
                    className="w-full p-3 border outline-none border-gray-200 bg-base-100 rounded-lg resize-y overflow-x-hidden"
                    style={{ minHeight: "50px" }}
                />
                <button
                    onClick={handleSendMessage}
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2"
                >
                    Send
                </button>
            </div>
            {popupEmoji && (
                <div
                    className="absolute text-4xl"
                    style={{
                        top: "-30px",
                        left: "10px", 
                        animation: "popup 1s ease-out",
                    }}
                >
                    {popupEmoji}
                </div>
            )}
        </div>
    );
};

export default MessageInput;

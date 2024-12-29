import messageService from "../services/messageService.js";
import { useState } from "react";

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        try {
            if (message.trim() === "") {
                return; // Prevent sending empty messages
            }
            await messageService.sendMessage({ content: message });
            setMessage(""); // Clear the input field after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex items-center space-x-3 mt-auto">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;

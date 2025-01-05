import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../features/messageSlice.js";
import messagesService from "../services/messageService.js";
const MessageInput = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const selectedUser = useSelector(state => state.user?.selectedUser);
    const userData = useSelector(state => state.auth.userData);
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
                messagesService.sendMessage({ targetUser: selectedUser._id, text:message });
            }            
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex w-full items-center space-x-3 break-words mt-1">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="w-full p-3 border outline-none border-gray-400 bg-gray-400 rounded-lg focus:outline-none focus:ring-2  resize-y overflow-x-hidden"
                style={{ minHeight: '50px' }}
            />
            <button
                onClick={handleSendMessage}
                className="p-3 bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;

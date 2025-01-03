import { useSelector } from "react-redux";
import messageService from "../services/messageService.js";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../features/messageSlice.js";
const MessageInput = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const selectedUser= useSelector(state => state.user?.selectedUser);
    const messages = useSelector(state => state.message.messages[selectedUser?.userName]);
    const userData = useSelector(state => state.auth.userData);
    const handleSendMessage = async () => {
        console.log("selectedUser", selectedUser);
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
            }
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        return async () => {
                try {
                    console.log("Sending unsent messages:", messages);
                    await messageService.sendMessage({targetUser:selectedUser._id,texts:messages});
                    console.log("Unsent messages sent successfully");
                } catch (error) {
                    console.error("Error sending unsent messages:", error);
                }
        };
    },[]);

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

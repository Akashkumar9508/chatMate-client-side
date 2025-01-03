import { useSelector } from "react-redux";
import { useEffect } from "react";
const ChatMessages = () => {
    const {selectedUser}=useSelector(state=>state.user);
    const loggedInUserId = useSelector((state) => state.auth.userData?._id);
    const messages = useSelector((state) => state.message.messages[selectedUser?.userName]);

    
    return (
        <div className="h-[90%] overflow-y-auto bg-black p-4 rounded-lg border border-gray-600 mb-4">
            {messages?.map((msg, index) => (
                <div
                    key={index}
                    className={`mb-2 ${msg.sender === loggedInUserId ? 'text-right' : 'text-left'}`}
                >
                    <div
                        className={`inline-block p-3 rounded-lg ${msg.sender === loggedInUserId ? 'bg-blue-600' : 'bg-gray-700'
                            }`}
                    >
                        <p className="text-sm md:text-base">{msg.content}</p>
                        <small className="text-xs md:text-sm">
                            {new Date(msg.sentAt).toLocaleTimeString()}
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;

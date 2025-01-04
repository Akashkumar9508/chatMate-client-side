import { useSelector } from "react-redux";

const ChatMessages = () => {
    const { selectedUser } = useSelector(state => state.user);
    const loggedInUserId = useSelector((state) => state.auth.userData?._id);
    const messages = useSelector((state) => state.message.messages[selectedUser?.userName]);

    return (
        <div className="h-[87%] w-full bg-red-500 p-5 flex flex-col justify-end rounded-lg border-gray-600  overflow-y-auto scrollbar-hide">
            {messages?.map((msg, index) => (
                <div
                    key={index}
                    className={`mb-1 ${msg.sender === loggedInUserId ? 'text-right' : 'text-left'}`}
                >
                    <div
                        className={`inline-block rounded-lg min-w-[10%] max-w-[70%] ${msg.sender === loggedInUserId ? 'bg-blue-600' : 'bg-gray-700'
                            }`}
                    >
                        <p className="h-[60%] w-full text-start px-2 text-sm break-words pt-1">{msg.content}</p>
                        <p className="h-[60%] w-full text-end px-2 text-[10px]">{new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatMessages;

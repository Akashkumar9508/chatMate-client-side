const ChatMessages = ({ messages, loggedInUserId }) => (
    <div className="flex-1 overflow-y-auto bg-gray-900 p-4 rounded-lg border border-gray-600 mb-4">
        {messages.map((msg, index) => (
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

export default ChatMessages;
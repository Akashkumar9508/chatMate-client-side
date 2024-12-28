const MessageInput = ({ message, onChange, onSend }) => (
    <div className="flex items-center space-x-3 mt-auto">
        <input
            type="text"
            value={message}
            onChange={onChange}
            placeholder="Type a message"
            className="w-full p-3 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            onClick={onSend}
            className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Send
        </button>
    </div>
);

export default MessageInput;
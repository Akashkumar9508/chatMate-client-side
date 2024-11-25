import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import authService from '../services/authService.js';
import messagesService from '../services/messageService.js'

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState('');

    useEffect(() => {
        // Fetch the logged-in user and all users except logged-in user
        authService.getCurrentUser()
            .then((response) => {
                setLoggedInUserId(response._id);
            })
            .catch((error) => console.error('Error fetching logged-in user:', error));

        authService.getAllUsers()
            .then((response) => setUsers(response))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        console.log(`This is the selected user ${user.fullName} id & ${user._id}`)
        messagesService.getMessagesWithUser(user._id)
            .then((response) => setMessages(response))
            .catch((error) => console.error('Error fetching messages:', error));
    };

    const handleMessageSend = async () => {
        if (message.trim()) {
            const messageData = {
                targetUser: selectedUser._id,
                text: message,
            };
            console.log("Thuis is the messagedata", messageData);
            try {
                await messagesService.sendMessage(messageData);
                setMessages((prevMessages) => [...prevMessages, messageData]);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
            <Nav />
            <section className="flex-grow py-5 bg-gray-800">
                <div className="flex">
                    <div className="w-1/4 p-4 border-r border-gray-600">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Online Buddies</h2>
                        <ul>
                            {users.map((user) => (
                                <li
                                    key={user._id}
                                    onClick={() => handleUserSelect(user)}
                                    className="cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-600 mb-2 transition duration-300 flex items-center space-x-3"
                                >
                                    <div className="relative w-10 h-10 rounded-full ">
                                        <img
                                            src={user.avatar || 'https://via.placeholder.com/150'}
                                            alt={user.fullName}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                        <span
                                            className={`absolute z-50 bottom-0 right-0 w-3 h-3 rounded-full ${user.activeStatus ? 'bg-green-500' : 'bg-red-500'}`}
                                        />
                                    </div>
                                    <span>{user.fullName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 bg-gray-800 p-4 flex flex-col">
                        {selectedUser ? (
                            <div className="flex flex-col h-full">
                                <h2 className="text-2xl font-semibold text-white mb-4">Buddie: {selectedUser.fullName}</h2>
                                <div className="flex-1 overflow-y-auto bg-gray-900 p-4 rounded-lg border border-gray-600 mb-4">
                                    {messages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`mb-2 ${msg.sender === loggedInUserId ? 'text-right' : 'text-left'
                                                }`}
                                        >
                                            <div
                                                className={`inline-block p-3 rounded-lg ${msg.sender === loggedInUserId
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-700 text-gray-300'
                                                    }`}
                                            >
                                                <p>{msg.text}</p>
                                                <small className="text-gray-500 text-sm">
                                                    {new Date(msg.sentAt).toLocaleTimeString()}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center space-x-3 mt-auto">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message"
                                        className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleMessageSend}
                                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                Select a user to start chatting
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

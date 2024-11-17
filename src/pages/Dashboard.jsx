import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/auth/users')  
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users', error);
            });
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        axios.get(`http://localhost:4000/api/messages/${user._id}`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages', error);
            });
    };

    const handleMessageSend = () => {
        if (message.trim()) {
            axios.post('http://localhost:4000/api/messages', {
                to: selectedUser._id,
                text: message
            })
                .then(response => {
                    setMessages([...messages, response.data]); 
                    setMessage(''); 
                })
                .catch(error => {
                    console.error('Error sending message', error);
                });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
            <header className="bg-gray-800 text-white py-16 text-center px-6 shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Welcome to ChatMate</h1>
                <p className="text-lg mb-2">Your go-to app for seamless and secure real-time messaging!</p>
            </header>

            <section className="flex-grow py-5 bg-gray-800">
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-1/4 bg-gray-700 p-4 border-r border-gray-600">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Users</h2>
                        <ul>
                            {users.map(user => (
                                <li
                                    key={user._id}
                                    onClick={() => handleUserSelect(user)}
                                    className="cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-600 mb-2 transition duration-300"
                                >
                                    {user.fullName}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Chat Window */}
                    <div className="flex-1 bg-gray-800 p-4 flex flex-col">
                        {selectedUser ? (
                            <div>
                                <h2 className="text-2xl font-semibold text-white mb-4">Chat with {selectedUser.fullName}</h2>
                                <div className="flex-1 overflow-y-auto bg-gray-900 p-4 rounded-lg border border-gray-600 mb-4">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`mb-2 ${msg.from === 'me' ? 'text-right' : 'text-left'}`}>
                                            <div className={`inline-block p-3 rounded-lg ${msg.from === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                                                <p>{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center space-x-3">
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

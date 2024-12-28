import React, { useState, useEffect } from 'react';
import authService from '../services/authService.js';
import { useSelector } from 'react-redux';
import { ChatHeader, ChatMessages, MessageInput, Sidebar } from '../components/allComponents.js';


const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userId = useSelector((state) => state.auth.userData?._id);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await authService.getAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setIsSidebarOpen(false);
        // Fetch messages logic here
    };


    return (
        <div className="flex flex-col h-lvh">
            <div className="flex-grow flex flex-col md:flex-row h-full ">
                <Sidebar
                    users={users}
                    onSelectUser={handleUserSelect}
                    isSidebarOpen={isSidebarOpen}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
                <div className="flex-1 p-4 flex flex-col pt-20">
                    {selectedUser ? (
                        <>
                            <ChatHeader
                                selectedUser={selectedUser}
                                openSidebar={() => setIsSidebarOpen(true)}
                            />
                            <ChatMessages messages={messages} loggedInUserId={userId} />
                            <MessageInput
                                message={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            No users to Chat !!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

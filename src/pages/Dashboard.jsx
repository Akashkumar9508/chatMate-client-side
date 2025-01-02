import React, { useState} from 'react';
import { ChatHeader, ChatMessages, MessageInput, Sidebar } from '../components/allComponents.js';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);    
    const selectedUser = useSelector((state) => state?.user?.selectedUser);
    return (
        <div className="flex flex-col h-screen w-full pb-[4%]">
            <div className="flex-grow flex flex-col md:flex-row h-full ">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
                <div className="flex-1 p-4 flex flex-col pt-20">
                    <ChatHeader openSidebar={() => setIsSidebarOpen(true)}/>
                    {selectedUser ? (
                        <div className="h-[95%] flex flex-col">
                            <ChatMessages />
                            <MessageInput />
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <h2 className="text-2xl text-gray-400">
                                Select a user to start chat
                            </h2>
                        </div>
                    )} 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

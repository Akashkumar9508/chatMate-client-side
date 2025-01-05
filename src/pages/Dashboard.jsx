import React, { useState } from 'react';
import { ChatHeader, ChatMessages, MessageInput, Sidebar } from '../components/allComponents.js';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const selectedUser = useSelector(state => state.user?.selectedUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex w-full overflow-hidden">
      {/* Sidebar (visible on desktop and toggled on mobile) */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col  h-[600px]">
          <ChatHeader openSidebar={() => setIsSidebarOpen(true)} />
        {/* Chat Header (handles sidebar toggle on mobile) */}

        <div className=" overflow-auto px-5 pt-3 flex flex-col h-full">
          {selectedUser ? (
            // Chat Area when a user is selected
            <div className="flex relative flex-col h-[100%] justify-between w-full">
              <div className="fixed flex flex-col justify-start md:w-[77%] h-[84%] w-[89%]    md:h-[78%] gap-1">
                <ChatMessages />
                <MessageInput />
              </div>
            </div>
          ) : (
            // Display message when no user is selected
            <div className="flex-1 flex items-center justify-center">
              <h2 className="text-2xl text-gray-400">Select a user to start chat</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

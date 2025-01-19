import React, { useState , useEffect } from 'react';
import { ChatHeader, ChatMessages, MessageInput, Sidebar } from '../components/allComponents.js';
import { fetchAllUsers, fetchFriendRequests, fetchFriends } from "../features/userSlice.js";
import { useDispatch , useSelector } from "react-redux";
import { fetchFriendsData } from '../features/friendSlice.js';
import { fetchAllGroups, fetchGroupCreatedByUser } from '../features/groupSlice.js';

const Dashboard = () => {
  const selectedUser = useSelector(state => state.user?.selectedUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {status} = useSelector(state => state.auth);
  const {allUsers, friends} = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() =>{
    if(status && allUsers.length === 0){
        dispatch(fetchAllUsers());
        dispatch(fetchFriends());
        dispatch(fetchFriendRequests());
        dispatch(fetchAllGroups());
        dispatch(fetchGroupCreatedByUser());
    }
    if(friends.length > 0){
        dispatch(fetchFriendsData(friends));
    }
    
},[allUsers, status,friends]);

  return (
    <div className="flex w-full overflow-hidden h-lvh  ">
     
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col  h-[600px]">
          <ChatHeader openSidebar={() => setIsSidebarOpen(true)} />
        

        <div className=" overflow-auto px-5 pt-3 flex flex-col h-full">
          {selectedUser ? (
            
            <div className="flex relative flex-col h-[100%] justify-between w-full">
              <div className="fixed flex flex-col justify-start md:w-[77%] h-[84%] w-[89%]    md:h-[78%] gap-1">
                <ChatMessages />
                <MessageInput />
              </div>
            </div>
          ) : (
            
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

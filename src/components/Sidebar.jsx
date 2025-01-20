import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../features/userSlice.js';
import messagesService from '../services/messageService.js';
import { initialiseMessages, setChattingWithUser } from '../features/messageSlice.js';
import { fetchFriendsData } from '../features/friendSlice.js';
import { selectGroup } from '../features/groupSlice.js';

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    const friendIds = useSelector(state => state.user?.friends);
    const selectedUser = useSelector(state => state.user?.selectedUser);
    const { userGroups } = useSelector(state => state.group)
    const { allFriends } = useSelector(state => state.friend);
    const { onlineUsers } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchUsers() {
            if (selectedUser) {
                await messagesService.getMessagesWithUser(selectedUser?.userName)
                    .then((response) => dispatch(initialiseMessages({
                        userName: selectedUser.userName,
                        messages: response
                    })));
            }
        }
        fetchUsers();
    }, [selectedUser]);

    useEffect(() => {
        if (friendIds.length > 0 && allFriends.length === 0) {
            dispatch(fetchFriendsData(friendIds));
        }
    }, [allFriends]);

    return (
        <div
            className={`fixed h-[90%] backdrop-blur-lg translate-y-5 md:static top-0 left-0 w-full md:w-1/5 px-4 border-b md:border-b-0 md:border-r z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
            <button
                onClick={closeSidebar}
                className="md:hidden absolute top-4 right-4 font-bold"
            >
                <FaTimes />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Chats</h2>

            <h3 className="text-lg font-semibold mb-2 text-gray-600">Users</h3>
            <ul className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                {allFriends.map((user) => (
                    <li
                        key={user._id}
                        onClick={() => {
                            dispatch(setSelectedUser(user));
                            dispatch(setChattingWithUser(true));
                            closeSidebar();
                        }}
                        className={`cursor-pointer py-2 px-4 rounded-lg flex items-center space-x-3 transition duration-300 ${user.userName === selectedUser?.userName ? "bg-orange-800" : "hover:bg-blue-600"
                            }`}
                    >
                        <div className="relative w-10 h-10 rounded-full">
                            <img
                                src={user.avatar || 'https://via.placeholder.com/150'}
                                alt={user.fullName}
                                className="w-full h-full object-cover rounded-full"
                            />
                            <span
                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${onlineUsers.includes(user.userName) ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            />
                        </div>
                        <span className="text-sm md:text-base font-semibold">
                            {user.fullName}
                        </span>
                    </li>
                ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-600">Groups</h3>
            <ul className="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                {userGroups.map((group) => (
                    <li
                        key={group._id}
                        onClick={() => {
                            dispatch(selectGroup(group));
                            dispatch(setChattingWithUser(false));
                            closeSidebar();
                        }}
                        className={`cursor-pointer py-2 px-4 rounded-lg flex items-center space-x-3 transition duration-300 hover:bg-blue-600`}
                    >
                        <div className="relative w-10 h-10 rounded-full">
                            <img
                                src={group.avatar}
                                alt={group.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <span className="text-sm md:text-base font-semibold">
                            {group.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

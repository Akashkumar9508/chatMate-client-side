import { FaTimes } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../features/userSlice.js';
import messagesService from '../services/messageService.js';
import { initialiseMessages } from '../features/messageSlice.js';

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
    const users = useSelector(state => state.user?.allUsers);
    const selectedUser = useSelector(state => state.user?.selectedUser);

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

    return (
        <div
            className={`fixed h-[90%] backdrop-blur-lg translate-y-5 md:static top-0 left-0 w-full md:w-1/5 px-4 border-b md:border-b-0 md:border-r z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
            {/* Close Button for Mobile */}
            <button
                onClick={closeSidebar}
                className="md:hidden absolute top-4 right-4 font-bold"
            >
                <FaTimes />
            </button>

            {/* Sidebar Header */}
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Online Buddies</h2>

            {/* Scrollable User List */}
            <ul className="space-y-2 h-full max-h-[80vh] overflow-y-auto pr-2">
                {users.map((user) => (
                    <li
                        key={user._id}
                        onClick={() => {
                            dispatch(setSelectedUser(user));
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
                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${user.activeStatus ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                            />
                        </div>
                        <span className="text-sm md:text-base font-semibold">
                            {user.fullName}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

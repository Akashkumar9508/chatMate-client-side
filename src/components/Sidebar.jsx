import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ users, onSelectUser, isSidebarOpen, closeSidebar }) => (
    <div
        className={`fixed md:static top-0 pt-20 left-0 w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
        <button
            onClick={closeSidebar}
            className="md:hidden absolute top-4 right-4 font-bold"
        >
            <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Online Buddies</h2>
        <ul className="space-y-2">
            {users.map((user) => (
                <li
                    key={user._id}
                    onClick={() => onSelectUser(user)}
                    className="cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center space-x-3 transition duration-300"
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
                    <span className="text-sm md:text-base font-semibold">{user.fullName}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default Sidebar;
import { HiMenu } from "react-icons/hi";

const ChatHeader = ({ selectedUser, openSidebar }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">
                Buddie: {selectedUser.fullName}
            </h2>
            <button
                onClick={openSidebar}
                className="md:hidden text-blue-500 hover:text-blue-700"
            >
                <HiMenu className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ChatHeader;

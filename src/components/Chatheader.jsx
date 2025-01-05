import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
const ChatHeader = ({ openSidebar }) => {
    const selctedUser = useSelector((state) => state?.user?.selectedUser);
    return (
        <div className="flex items-center justify-between mt-4 5 ml-4 text-center " >
            <h2 className="text-xl md:text-2xl font-semibold">
                Buddie: {selctedUser?selctedUser.fullName:'N/A'} 
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

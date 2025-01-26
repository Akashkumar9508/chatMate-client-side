import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const ChatHeader = ({ openSidebar }) => {
    const {selectedUser} = useSelector((state) => state.user);
    const {selectedGroup}=useSelector(state=>state.group);
    const {chattingWithUser} = useSelector((state) => state.message);
    return (
        <div className="flex items-center justify-between mt-4 5 px-4 text-center " >
            <div>
                <div className="flex items-center px-2 gap-3">
                    <img src={chattingWithUser?selectedUser?.avatar:selectedGroup?.avatar} className={`h-12 w-12 rounded-full ${selectedUser || selectedGroup ? "" : "hidden"}`} />
                    <h2 className="text-xl md:text-1xl font-semibold">{selectedUser || selectedGroup ? chattingWithUser?selectedUser.fullName:selectedGroup.name : 'N/A'}</h2>
                </div>
            </div>
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

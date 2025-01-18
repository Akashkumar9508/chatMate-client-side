import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const ChatHeader = ({ openSidebar }) => {
    const selctedUser = useSelector((state) => state.user?.selectedUser);
    return (
        <div className="flex items-center justify-between mt-4 5 px-4 text-center " >
            <div>
                <NavLink className="flex items-center px-2 gap-3 cursor-pointer" to={`/user/${selctedUser?.userName}`}>
                    <img src={selctedUser?.avatar} className={`h-12 w-12 ${selctedUser ? "" : "hidden"}`} />
                    <h2 className="text-xl md:text-1xl font-semibold">{selctedUser ? selctedUser.fullName : 'N/A'}</h2>
                </NavLink>
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

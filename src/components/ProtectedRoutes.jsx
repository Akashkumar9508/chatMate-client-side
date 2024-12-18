import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import authService from "../services/authService";
import { login } from "../features/authSlice";
import { setAllUsers, setFriendRequests, setFriends } from "../features/userSlice";
import friendService from '../services/friendService';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status: isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await authService.getCurrentUser().then((user) => dispatch(login(user)));
                await authService.getAllUsers().then((users) => dispatch(setAllUsers(users)));
                const friendsId = await friendService.getFriendList();
                const allFriends = await Promise.all(
                    friendsId.map((id) => authService.getUserById(id))
                );
                dispatch(setFriends(allFriends));
                const requestsId = await friendService.getFriendRequests();
                const allRequests = await Promise.all(
                    requestsId.map((id) => authService.getUserById(id))
                );
                dispatch(setFriendRequests(allRequests));
            } catch (error) {
                toast.error("Login to access this!");
                navigate("/login");
            }
        };

        if (!isAuthenticated) {
            fetchCurrentUser();
        }
    }, [dispatch, navigate, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="bg-slate-950 w-full h-screen flex items-center justify-center text-[4rem]">
                Loading...
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;

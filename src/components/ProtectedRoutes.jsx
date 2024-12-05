import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import authService from "../services/authService";
import { login } from "../features/authSlice";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status: isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await authService.getCurrentUser();
                dispatch(login(response));
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

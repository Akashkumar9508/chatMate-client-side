import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import authService from "../services/authService";
import { login } from "../features/authSlice.js";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hasShownToast = useRef(false);
    const [isUserChecked, setIsUserChecked] = useState(false);

    const { status: isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await authService.getCurrentUser();
                dispatch(login(response));
            } catch (error) {
                console.error("Login error:", error);
                navigate("/login");
            } finally {
                setIsUserChecked(true);
            }
        };

        fetchCurrentUser();
    }, [dispatch, navigate]);

    useEffect(() => {
        if (isUserChecked && !isAuthenticated && !hasShownToast.current) {
            toast.error("Login to access this!");
            hasShownToast.current = true;
        }
    }, [isUserChecked, isAuthenticated]);

    if (!isUserChecked) {
        return (
            <div className="bg-slate-950 w-full h-screen flex items-center justify-center text-[4rem] text-white">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

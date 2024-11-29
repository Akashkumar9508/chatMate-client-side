import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children }) => {
    const { status: isAuthenticated } = useSelector((state) => state.auth);
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (!isAuthenticated && !hasShownToast.current) {
            toast.error("Login to access this!");
            hasShownToast.current = true;
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
        return (
            <div className="bg-slate-950 w-full h-lvh flex items-center justify-center text-[4rem] text-white">
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

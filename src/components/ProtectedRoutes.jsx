import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
                console.error("Error checking authentication:", error);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="bg-slate-950 w-full h-lvh flex items-center justify-center text-[4rem] text-white">
                Loading...
            </div>
        );
    }

    if (isAuthenticated === false) {
        toast.error("Login to acces this !");
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;

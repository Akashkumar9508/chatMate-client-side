import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { fetchUser } from "../features/authSlice";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, userData } = useSelector((state) => state.auth);


    useEffect(() => {
        if (!status) {
            dispatch(fetchUser())
        .catch((error) => {
          toast.error("You need to be logged in to access this page!");
          navigate("/login");
        });
        }
    }, [dispatch, navigate, status]);

    if (!status) {
        return (
            <div className="bg-slate-950 w-full h-screen flex items-center justify-center text-[4rem]">
                Loading...
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;

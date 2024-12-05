import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice.js';
import authService from '../services/authService.js';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!status) {
        }
    }, [status]); 

    const handleLogout = async () => {
        try {
            const response = await authService.logout();
            console.log("this is the message from logout click",response);
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <div>
            {status ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-red-500 transition duration-300"
                >
                    <span className='hidden md:block'><MdLogout size={24} /></span>
                    <span className='md:hidden block'>Logout</span>
                </button>
            ) : (
                <Link
                    to="/login"
                    className="flex items-center space-x-2 text-white hover:text-blue-500 transition duration-300"
                >
                    <span>Login</span>
                </Link>
            )}
        </div>
    );
};

export default Logout;

import React, { useState, useEffect } from 'react';
import { fetchUser, handleLogout } from '../services/callPoints.js'
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md'; 

const Logout = () => {
    const [User, setUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser({setUser});
    }, []);

    handleLogout({setUser, navigate});
    return (
        <div>
            {User ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-red-500 transition duration-300">
                    <MdLogout size={24} />
                </button>
            ) : (
                <Link to="/login" className="flex items-center space-x-2 text-white hover:text-blue-500 transition duration-300">
                    <span>Login</span>
                </Link>
            )}
        </div>
    );
};

export default Logout;

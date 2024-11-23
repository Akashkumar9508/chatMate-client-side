import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import authService from '../services/authService';

const Logout = () => {
    const [User, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                setUser(user);
            } catch (error) {
                setUser(false);
                console.error('Error fetching user data', error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await authService.logout();
            console.log(response.message);
            setUser(false);
            navigate('/');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    return (
        <div>
            {User ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-red-500 transition duration-300"
                >
                    <MdLogout size={24} />
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

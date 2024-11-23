import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md'; 

const Logout = () => {
    const [User, setUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/auth/me', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                setUser(false);
                console.error('Error fetching user data', error);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async ({setUser,navigate}) => {
        try {
            const response = await axios.post('http://localhost:4000/api/auth/logout', {},{ withCredentials: true });
            console.log(response.data.message);
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

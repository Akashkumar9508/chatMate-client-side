import axios from 'axios';

const fetchUser = async ({setUser}) => {
    try {
        const response = await axios.get('http://localhost:4000/api/auth/me', { withCredentials: true });
        setUser(response.data);
    } catch (error) {
        setUser(false);
        console.error('Error fetching user data', error);
    }
};

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

export{
    fetchUser,
    handleLogout
}
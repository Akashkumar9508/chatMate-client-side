import React, { useEffect, useState } from "react";
import Nav from "../components/Nav.jsx";
import { FaSearch, FaUserFriends } from "react-icons/fa";
import authService from "../services/authService.js";

const Friend = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        authService
            .getAllUsers()
            .then((response) => {
                console.log("Fetched users:", response);
                setUsers(response);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Users state updated:", users);
    }, [users]);

    const displayedUsers = users.filter((user) =>
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="friends-page h-lvh w-full px-6 py-4 bg-gray-900 text-white">
            <Nav/>
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaUserFriends /> Friends Page
            </h1>

            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full text-black"
                />
                <button className="ml-2 bg-blue-500 px-4 py-2 rounded-md flex items-center gap-2">
                    <FaSearch />
                    Search
                </button>
            </div>

            <div className="w-full h-[80%] flex">
                <div className="users-list mb-8 w-1/2 h-full">
                    <h2 className="text-xl font-semibold mb-2">All Users</h2>
                    {displayedUsers.length > 0 ? (
                        displayedUsers.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center justify-between border-b border-gray-200 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avatar || "https://via.placeholder.com/40"}
                                        alt={user.fullName || "User Avatar"}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span>{user.userName}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
                <div className="w-1/2 h-full flex justify-center">
                    <h1 className="text-xl font-semibold mb-2">Friend Requests</h1>
                </div>
            </div>
        </div>
    );
};

export default Friend;

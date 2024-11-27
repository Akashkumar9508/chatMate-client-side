import React, { useEffect, useState } from "react";
import Nav from "../components/Nav.jsx";
import { FaSearch, FaUserFriends, FaUserPlus } from "react-icons/fa";
import authService from "../services/authService.js";
import friendService from "../services/friendService.js";
import { toast } from "react-hot-toast"; // Import toast

const Friend = () => {
    const [users, setUsers] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sentRequests, setSentRequests] = useState([]);

    useEffect(() => {
        // Fetch all users
        authService
            .getAllUsers()
            .then((response) => {
                console.log("Fetched users:", response);
                setUsers(response);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                toast.error("Error fetching users!");
            });

        // Fetch friend requests
        friendService
            .getFriendRequests()
            .then(async (response) => {
                const friendRequestIds = response.friendRequests;
                const requests = await Promise.all(
                    friendRequestIds.map((id) =>
                        authService.getUserById(id)
                    )
                );
                setFriendRequests(requests);
            })
            .catch((error) => {
                console.error("Error fetching friend requests:", error);
                toast.error("Error fetching friend requests!");
            });
    }, []);

    const sendFriendRequest = (userId) => {
        friendService
            .sendFriendRequest(userId)
            .then((response) => {
                console.log("Friend request sent:", response);
                setSentRequests((prev) => [...prev, userId]);
                toast.success("Friend request sent!"); 
            })
            .catch((error) => {
                console.error("Error sending friend request:", error);
                toast.error("Error sending friend request!");
            });
    };

    const handleAcceptRequest = (requestId) => {
        friendService
            .acceptFriendRequest(requestId)
            .then(() => {
                console.log("Friend request accepted");
                toast.success("Friend request accepted!");
                setFriendRequests((prev) =>
                    prev.filter((request) => request._id !== requestId)
                );
            })
            .catch((error) => {
                console.error("Error accepting friend request:", error);
                toast.error("Error accepting friend request!"); 
            });
    };

    const handleDeclineRequest = (requestId) => {
        friendService
            .declineFriendRequest(requestId)
            .then(() => {
                console.log("Friend request declined");
                toast.success("Friend request declined!");
                setFriendRequests((prev) =>
                    prev.filter((request) => request._id !== requestId)
                );
            })
            .catch((error) => {
                console.error("Error declining friend request:", error);
                toast.error("Error declining friend request!");
            });
    };

    const displayedUsers = users.filter((user) =>
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="friends-page h-lvh w-full px-6 py-4 bg-gray-900 text-white">
            <Nav />
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaUserFriends /> Friends Page
            </h1>
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full text-black outline-none"
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
                                <button
                                    className={`${
                                        sentRequests.includes(user._id)
                                            ? "bg-red-500"
                                            : "bg-green-500"
                                    } text-white px-3 py-2 rounded-md flex items-center gap-2`}
                                    onClick={() => sendFriendRequest(user._id)}
                                    disabled={sentRequests.includes(user._id)}
                                >
                                    <FaUserPlus />
                                    {sentRequests.includes(user._id) ? "Pending" : "Add Friend"}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>

                <div className="friend-requests w-1/2 h-full">
                    <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
                    {friendRequests.length > 0 ? (
                        friendRequests.map((request) => (
                            <div
                                key={request._id}
                                className="flex items-center justify-between border-b border-gray-200 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={request.avatar || "https://via.placeholder.com/40"}
                                        alt={request.fullName || "Sender Avatar"}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span>{request.userName}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-2 rounded-md"
                                        onClick={() => handleAcceptRequest(request._id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-2 rounded-md"
                                        onClick={() => handleDeclineRequest(request._id)}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No friend requests.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Friend;

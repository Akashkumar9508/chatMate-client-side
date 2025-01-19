import React, { useEffect, useState } from "react";
import { FaSearch, FaUserFriends, FaUserPlus, FaClock } from "react-icons/fa";
import friendService from "../services/friendService.js";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/userSlice.js";
import { fetchFriendsRequestData } from "../features/friendSlice.js";
import Group from "../components/Group.jsx";

const Explore = () => {
  const {unFriends} = useSelector((state) => state.user);
  const { allFriendRequests } = useSelector((state) => state.friend);
  const [searchTerm, setSearchTerm] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    if (allUsers.length === 0) {
      dispatch(fetchAllUsers());
      dispatch(fetchFriendsRequestData());
    }
  }, [allUsers.length, dispatch]);

  const handleAcceptRequest = (requestId) => {
    friendService
      .acceptFriendRequest(requestId)
      .then(() => {
        toast.success("Friend request accepted!");
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
        toast.success("Friend request declined!");
      })
      .catch((error) => {
        console.error("Error declining friend request:", error);
        toast.error("Error declining friend request!");
      });
  };

  const displayedUsers = unFriends.filter((user) =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="friends-page w-full px-4 pt-5">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-3 desui-text-base-800">
          <FaUserFriends className="desui-text-blue-500" /> Friends Page
        </h1>

        <div className="flex items-center justify-start mb-6 flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md px-4 py-2 sm:w-64 outline-none border border-desui-gray-300 desui-focus:ring-2 desui-focus:ring-blue-500 md:w-[85%] desui-text-base-200"
          />
          <button className="desui-bg-blue-500 px-5 py-2 rounded-md flex items-center gap-2 h-10 text-white hover:desui-bg-blue-600 desui-transition">
            <FaSearch />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="users-list flex-1 max-h-[70vh] overflow-y-auto desui-scrollbar-hide pr-2">
            <h2 className="desui-text-xl font-semibold mb-4 border-b pb-2 desui-text-base-800">All Users</h2>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between border-b border-desui-gray-200 py-3 px-2 rounded-sm hover:desui-bg-gray-100 desui-transition desui-text-base-200"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar || "https://via.placeholder.com/40"}
                      alt={user.fullName || "User Avatar"}
                      className="w-12 h-12 rounded-full border desui-border-gray-300"
                    />
                    <span className="desui-font-medium desui-text-base-800">{user.userName}</span>
                  </div>
                  <button
                    className={`${
                      sentRequests.includes(user._id)
                        ? "desui-bg-red-500"
                        : "desui-bg-green-500"
                    } px-3 py-2 rounded-md flex items-center gap-2 desui-text-white hover:desui-opacity-90 desui-transition`}
                    onClick={() => {
                      friendService.sendFriendRequest(user._id).then(() => {
                        toast.success("Friend request sent!");
                      });
                    }}
                    disabled={sentRequests.includes(user._id)}
                  >
                    <span className="block sm:hidden">
                      {sentRequests.includes(user._id) ? (
                        <FaClock className="desui-animate-spin" />
                      ) : (
                        <FaUserPlus />
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {sentRequests.includes(user._id) ? "Pending" : "Add Friend"}
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <p className="desui-text-gray-500">No users found.</p>
            )}
          </div>

          <div className="friend-requests flex-1 overflow-y-auto desui-scrollbar-hide pr-2">
            <h2 className="desui-text-xl font-semibold mb-4 border-b pb-2 desui-text-base-800">Friend Requests</h2>
            {allFriendRequests.length > 0 ? (
              allFriendRequests.map((request) => (
                <div
                  key={`${request._id}+1`}
                  className="flex items-center justify-between border-b desui-border-gray-200 py-3 hover:desui-bg-gray-100 desui-transition desui-text-base-200"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={request.avatar || "https://via.placeholder.com/40"}
                      alt={request.fullName || "Sender Avatar"}
                      className="w-12 h-12 rounded-full desui-border-gray-300"
                    />
                    <span className="desui-font-medium desui-text-gray-700">{request.userName}</span>
                  </div>
                  <div className="flex gap-3">
                    {request.status === "pending" && (
                      <FaClock className="desui-text-yellow-500" />
                    )}
                    <button
                      className="desui-bg-blue-500 px-4 py-2 rounded-md desui-text-white hover:desui-bg-blue-600 desui-transition"
                      onClick={() => handleAcceptRequest(request._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="desui-bg-red-500 px-4 py-2 rounded-md desui-text-white hover:desui-bg-red-600 desui-transition"
                      onClick={() => handleDeclineRequest(request._id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="desui-text-gray-500">No friend requests found.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center mt-8 desui-text-base-200">
        </div>
      </div>
      <Group />
    </>
  );
};

export default Explore;
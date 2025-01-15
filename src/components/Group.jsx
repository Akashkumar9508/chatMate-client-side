import React, { useState } from "react";
import { FaSearch, FaUsers, FaPlus, FaClock } from "react-icons/fa";

const Group = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const [groups, setGroups] = useState([
    { id: 1, name: "React Developers", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "JavaScript Enthusiasts", avatar: "https://via.placeholder.com/40" },
    { id: 3, name: "Node.js Community", avatar: "https://via.placeholder.com/40" },
    // Add more sample groups here
  ]);

  const displayedGroups = groups.filter((group) =>
    group.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="groups-section w-full">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUsers /> Groups
      </h2>

      {/* Group Search Bar */}
      <div className="flex items-center justify-start mb-6 flex-wrap gap-2 w-full md:w-[50vw]">
        <input
          type="text"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md px-4 py-2 sm:w-64 outline-none md:w-[85%]"
        />
        <button className="bg-blue-500 px-5 py-2 rounded-md flex items-center gap-2 h-10">
          <FaSearch />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="groups-list mb-8 flex-1 max-h-[70vh] overflow-y-auto scrollbar-hide pr-2">
          <h2 className="text-xl font-semibold mb-2">All Groups</h2>
          {displayedGroups.length > 0 ? (
            displayedGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between border-b border-gray-200 py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={group.avatar}
                    alt={group.name || "Group Avatar"}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{group.name}</span>
                </div>
                <button
                  className={`${
                    sentRequests.includes(group.id)
                      ? "bg-red-500"
                      : "bg-green-500"
                  } px-3 py-2 rounded-md flex items-center gap-2`}
                  onClick={() => {
                    setSentRequests([...sentRequests, group.id]);
                  }}
                  disabled={sentRequests.includes(group.id)}
                >
                  <span className="block sm:hidden">
                    {sentRequests.includes(group.id) ? (
                      <FaClock className="animate-spin" />
                    ) : (
                      <FaPlus />
                    )}
                  </span>
                  <span className="hidden sm:inline">
                    {sentRequests.includes(group.id) ? "Request Sent" : "Join Group"}
                  </span>
                </button>
              </div>
            ))
          ) : (
            <p>No groups found.</p>
          )}
        </div>
        <div className="create-group flex-1 max-h-[70vh] overflow-y-auto scrollbar-hide pr-2">
          <h2 className="text-xl font-semibold mb-4">Create a Group</h2>
          <button
            className="bg-blue-500 px-6 py-3 rounded-md text-white font-semibold flex items-center gap-2"
            onClick={() => alert("Create Group Functionality")}
          >
            <FaPlus />
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default Group;

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function GroupProfile() {
  const { allGroups } = useSelector((state) => state.group);

  const { groupId } = useParams();
  const group = allGroups.find((group) => group._id === groupId);

  // Fallbacks in case data is missing
  const groupDescription = group?.description || "No description provided.";
  const groupMembers = group?.members || []; 

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="group-profile max-w-5xl w-full bg-black rounded-xl shadow-xl p-6 border border-gray-300 shadow-cyan-400">
        {/* Profile Header */}
        <div className="profile-header flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <img
            src={group.avatar}
            alt="Group Avatar"
            className="h-28 w-28 rounded-full object-cover border-4 border-red-500 hover:scale-110 transition-transform"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-white">{group?.name}</h1>
            <p className="text-gray-300 mt-2 text-lg ">
              <span className="font-semibold text-indigo-600">Created By:</span> {group?.createdBy || "Unknown"}
            </p>
            <p className="text-gray-300 mt-1 text-lg">
              <span className="font-semibold text-indigo-600">Description:</span> {groupDescription}
            </p>
          </div>
        </div>

        {/* Members Section */}
        <div className="members-section">
          <h2 className="text-2xl font-bold text-white mb-6">Members:</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupMembers.length > 0 ? (
              groupMembers.map((member, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg hover:scale-110 transition-transform"
                >
                  <img
                    src={member.avatar || "https://via.placeholder.com/150"}
                    alt={member.name || "Member"}
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200 hover:scale-110 transition-transform shadow-lg shadow-rose-950"
                  />
                  <span className="mt-3 text-gray-800 text-center font-bold">{member.name || "Anonymous"}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No members found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GroupProfile;

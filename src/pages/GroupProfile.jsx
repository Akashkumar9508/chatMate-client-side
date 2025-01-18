import React from 'react';

function GroupProfile() {
  const groupName = "The Coding Ninjas";
  const groupMembers = [
    { name: "John Doe", avatar: "https://example.com/john.jpg" },
    { name: "Jane Smith", avatar: "https://example.com/jane.jpg" },
    { name: "David Lee", avatar: "https://example.com/david.jpg" },
  ];
  const createdBy = "John Doe";
  const groupDescription = "A group for coding enthusiasts to learn and share.";

  return (
    <div className="group-profile max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="profile-header flex items-center gap-4 mb-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxz1zRNl-yf4oWutkanlAnw88gT2wOAcEpQ&s"
          alt="Group Avatar"
          className="h-24 w-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
        />
        <h1 className="text-3xl font-extrabold text-gray-800">{groupName}</h1>
      </div>

      <div className="profile-info text-gray-600 mb-6">
        <p className="mb-2">
          <span className="font-semibold text-indigo-600">Created By:</span> {createdBy}
        </p>
        <p>
          <span className="font-semibold text-indigo-600">Description:</span> {groupDescription}
        </p>
      </div>

      <div className="members-section">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Members:</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {groupMembers.map((member, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
              />
              <span className="text-gray-800 font-medium">{member.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GroupProfile;

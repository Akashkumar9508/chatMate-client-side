import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux'
const GroupForm = ({ isOpen, onClose, onCreate, users }) => {
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDesc, setNewGroupDesc] = useState("");
    const [newGroupMembers, setNewGroupMembers] = useState([]);
    const { allUsers } = useSelector(state => state.user);
    const handleAddMember = (user) => {
        if (!newGroupMembers.includes(user)) {
            setNewGroupMembers([...newGroupMembers, user]);
        }
    };

    const handleCreateGroup = () => {
        if (newGroupName && newGroupDesc) {
            const newGroup = {
                id: Date.now(),
                name: newGroupName,
                description: newGroupDesc,
                members: newGroupMembers,
            };
            onCreate(newGroup);
            setNewGroupName("");
            setNewGroupDesc("");
            setNewGroupMembers([]);
        } else {
            alert("Please fill in all fields.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-black p-6 rounded-md w-[600px]">
                <h2 className="text-xl font-semibold mb-4">Create a Group</h2>

                <input
                    type="text"
                    placeholder="Group Name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full p-3 mb-3 border rounded-md"
                />

                <textarea
                    placeholder="Group Description"
                    value={newGroupDesc}
                    onChange={(e) => setNewGroupDesc(e.target.value)}
                    className="w-full p-3 mb-3 border rounded-md"
                ></textarea>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Add Members</h3>
                    <div className="space-y-2">
                        {allUsers.map((user) => (
                            <div key={user._id} className="flex justify-between items-center p-2 border-b border-gray-300">
                                {/* User Avatar */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm">{user.userName}</span>
                                </div>

                                {/* Add Button */}
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                    onClick={() => handleAddMember(user)}
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Members Selected */}
                <div className="mt-4">
                    <span className="font-semibold">Members: </span>
                    <ul>
                        {newGroupMembers.map((member, index) => (
                            <li key={index}>{member.name}</li>
                        ))}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        className="bg-gray-500 px-6 py-3 rounded-md text-white"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 px-6 py-3 rounded-md text-white"
                        onClick={handleCreateGroup}
                    > Create 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupForm;

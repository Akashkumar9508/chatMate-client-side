import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from "../features/groupSlice";

const GroupForm = ({ isOpen, onClose, onCreate }) => {
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDesc, setNewGroupDesc] = useState("");
    const [newGroupMembers, setNewGroupMembers] = useState([]);
    const { allFriends } = useSelector(state => state.friend);
    const dispatch=useDispatch();

    const handleAddMember = (user) => {
        if (!newGroupMembers.includes(user._id)) {
            setNewGroupMembers([...newGroupMembers, user._id]);
        }
    };

    const handleCreateGroup = () => {
        if (newGroupName && newGroupDesc) {
            dispatch(createGroup({newGroupName,newGroupMembers,newGroupDesc}));
            setNewGroupName("");
            setNewGroupDesc("");
            setNewGroupMembers([]);
        } else {
            alert("Please fill in all fields.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-base-100 p-6 rounded-md w-[90%] max-w-[600px] shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-primary">Create a Group</h2>

                {/* Group Name Input */}
                <input
                    type="text"
                    placeholder="Group Name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="input input-bordered input-primary w-full mb-3"
                />

                {/* Group Description Textarea */}
                <textarea
                    placeholder="Group Description"
                    value={newGroupDesc}
                    onChange={(e) => setNewGroupDesc(e.target.value)}
                    className="textarea textarea-bordered textarea-primary w-full mb-3"
                ></textarea>

                {/* Add Members Section */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2 text-primary">Add Members</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {allFriends.map((user) => (
                            <div key={user._id} className="flex justify-between items-center p-2 border-b border-gray-300 hover:bg-base-200">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm">{user.userName}</span>
                                </div>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleAddMember(user)}
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <span className="font-semibold text-primary">Members:</span>
                    {newGroupMembers.length > 0 ? (
                        <ul className="list-disc pl-5 mt-2">
                            {newGroupMembers.map((member, index) => (
                                <li key={index}>{member.userName}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No members added yet.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-4">
                    <button
                        className="btn btn-outline btn-error"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleCreateGroup}
                    >
                        Create Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupForm;

import React, { useState } from "react";
import { FaSearch, FaUsers, FaPlus, FaClock } from "react-icons/fa";
import GroupForm from "../components/GroupForm";  // Import the modal component
import { useSelector } from "react-redux";
import { NavLink} from 'react-router-dom';

const Group = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allGroups } = useSelector(state => state.group);

  const displayedGroups = allGroups.filter((group) =>
    group.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = (newGroup) => {
    setIsModalOpen(false);
    alert("Group Created!");
  };

  return (
    <div className="groups-section w-full bg-base-100 p-4 md:p-8 mt-5 ">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-primary">
        <FaUsers /> Groups
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="groups-list mb-8 flex-1 max-h-[70vh] overflow-y-auto pr-2">
          {displayedGroups.length > 0 ? (
            displayedGroups.map((group) => (
              <NavLink to={`/group/${group._id}`} key={group._id}>
                <div
                  className="flex items-center justify-between border-b  border-gray-200 py-3 hover:bg-base-200 transition-colors duration-200 ease-in-out"

                >
                  <div className="flex items-center gap-3">
                    <img
                      src={group.avatar}
                      alt={group.name || "Group Avatar"}
                      className="w-12 h-12 rounded-full shadow-md"
                    />
                    <span className="text-lg font-medium">{group.name}</span>
                  </div>
                  <button
                    className={`btn ${sentRequests.includes(group.id)
                        ? "btn-error"
                        : "btn-success"
                      } btn-sm flex items-center gap-2`}
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
              </NavLink>
            ))
          ) : (
            <p className="text-gray-500">No groups found.</p>
          )}
        </div>

        <div className="create-group flex-1 max-h-[70vh] overflow-y-auto pr-2">
          <h2 className="text-xl font-semibold mb-4 text-primary">Create a Group</h2>
          <button
            className="btn btn-primary btn-lg w-full sm:w-auto flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus />
            Create Group
          </button>
        </div>
      </div>

      <GroupForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
};

export default Group;

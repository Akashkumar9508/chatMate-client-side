import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import authService from '../services/authService.js';
import { MdModeEdit } from "react-icons/md";

function UserProfile() {
  const auth = useSelector((state) => state.auth);
  const user = auth?.userData;
  const { userName } = useParams();
  const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await authService.updateAvatar(formData);
      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data.fileUrl);
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    async function fetchFriendsDetails() {
      try {
        if (user?.friends?.length) {
          await Promise.all(user.friends.map((friendId) => authService.getUserById(friendId)));
        }
      } catch (error) {
        console.error("Error fetching friends details:", error);
      }
    }
    fetchFriendsDetails();
  }, [user]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-8 px-4 sm:px-8">
      <div className=" bg-slate-900 rounded-lg shadow-lg w-full max-w-4xl flex flex-col items-center p-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative">
          <div
            className="h-40 w-40 sm:h-48 sm:w-48 rounded-full border-4 border-blue-500 bg-cover bg-center mb-4 sm:mb-0"
            style={{ backgroundImage: `url(${user?.avatar || "https://via.placeholder.com/150"})` }}
          ></div>
          <label htmlFor="FileForLabel" className="cursor-pointer absolute bottom-2 right-2 sm:bottom-1 sm:right-4 bg-blue-500 p-2 rounded-full shadow-md hover:bg-blue-600 transition">
          <MdModeEdit size={30}/>
          </label>
          <input
            className="hidden"
            type="file"
            id="FileForLabel"
            onChange={handleFileChange}
          />
          {file && (
            <button
              type="button"
              onClick={handleUpload}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Upload
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p className="text-2xl font-semibold ">{user?.fullName || "Full Name"}</p>
            <p>@{userName}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className=" text-sm font-medium">Bio</label>
            <p className="w-full bg-purple-900 rounded-lg px-4 py-2">{user?.bio || "Hey there, I'm using ChatMate"}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className=" text-sm font-medium">Email</label>
            <p className="w-full bg-purple-900 rounded-lg px-4 py-2">{user?.email || "N/A"}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className=" text-sm font-medium">Date of Birth</label>
            <p className="w-full bg-purple-900 rounded-lg px-4 py-2">{user?.dob || "DD/MM/YYYY"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

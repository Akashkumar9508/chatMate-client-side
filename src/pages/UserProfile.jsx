import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import authService from "../services/authService";

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
      const response = await authService.updateAvtar(formData);
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
    <div className="h-screen w-full flex flex-col items-center p-5">
      <div className="h-40 w-40 rounded-full border-2 bg-cover border-black mb-4" style={{ backgroundImage: `url(${user?.avatar})` }}>
        <form>
          <label htmlFor="FileForLabel" className="cursor-pointer">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCusGV4ilsSb14amngVyEQ14HajeMcC5nogg&s"
              className="h-10 w-10 rounded-full absolute bottom-0 right-0"
              alt="Upload"
            />
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
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Upload
            </button>
          )}
        </form>
      </div>

      <p className="text-2xl font-semibold">{user?.fullName}</p>
      <p className="text-sm text-gray-500">@{userName}</p>

      <form className="mt-6 w-full max-w-md">
        <label className="block text-lg">Bio</label>
        <input
          className="w-full bg-transparent border-b border-gray-300 mb-4"
          value="Hey there, I'm using ChatMate"
          disabled
        />
        <label className="block text-lg">Email</label>
        <input
          className="w-full bg-transparent border-b border-gray-300 mb-4"
          value={user?.email || "N/A"}
          disabled
        />
        <label className="block text-lg">DOB</label>
        <input
          className="w-full bg-transparent border-b border-gray-300"
          value="DD/MM/YYYY"
          disabled
        />
      </form>
    </div>
  );
}

export default UserProfile;

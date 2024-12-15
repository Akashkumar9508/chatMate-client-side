import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import authService from "../services/authService";

function UserProfile() {

  const [isEditible,setIsEditible]=useState(false);
  const auth=useSelector((state)=>state.auth);
  const user=auth?.userData;
  const {userName}=useParams();
  const [friendsDetails, setFriendsDetails]=useState([]);
  const [requestDetails, setRequestDetails]=useState([]);
  const [allUsers, setAllUser]=useState([]);

  useEffect(()=>{
    async function getFriendsDetails(){
      try{
        const friends=await Promise.all(
          user?.friends.map((friendId)=>authService.getUserById(friendId))
        );
        const request=await Promise.all(
          user?.friendRequests.map((requestId)=>authService.getUserById(requestId))
        );
        const users=await authService.getAllUsers();
        setAllUser(users);
        console.log(allUsers);
        setRequestDetails(request);
        setFriendsDetails(friends);
      }catch(error){
        console.error("Error fetching friends details:",error);
      }
    }
    getFriendsDetails();
  },[]);

  return (
    <>
      <div className='h-screen w-full flex flex-col md:flex-row' >
        <div className='md:h-full min-h-1/2 h-auto w-full md:w-2/3 md:shadow-slate-400 flex flex-col items-center p-5'>
          <div 
            style={{backgroundImage:`url(${user.avatar})`}}
            className="h-40 w-40 rounded-full border-2 bg-cover border-black dark:border-white mb-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCusGV4ilsSb14amngVyEQ14HajeMcC5nogg&s" 
              className="h-10 w-10 rounded-full cursor-pointer relative top-28 left-28"/>
          </div>
          <p className="text-4xl font-serif" >{user.fullName}</p>
          <p >~{userName}</p>
          <form className="h-auto w-2/3 mt-10">
            <label className="text-2xl block">Bio</label>
            <input className="h-10 w-full bg-transparent" value={"Hey there, I'm using ChatMate"} disabled={true}/>
            <label className="text-2xl block mt-5">Email</label>
            <input className="h-10 w-full bg-transparent" value={user.email} disabled={true}/>
            <label className="text-2xl block mt-5">DOB</label>
            <input className="h-10 w-full bg-transparent" value={"DD/MM/YYYY"} disabled={true}/>
          </form>
        </div>
        <div className='md:h-full min-h-1/2 h-auto w-full md:w-1/3 shadow-sm md:shadow-slate-400 hidden md:block overflow-x-scroll px-10 py-1'>
          <div className={`${user?.friends.length?"":"hidden"} shadow-sm shadow-black dark:shadow-white mb-10 mt-3`}>
            <p className="text-2xl mb-5">Friends</p>
            {
              friendsDetails.map((friend)=>(
                <div key={friend._id} className="h-20 w-5/6 p-2 m-2 flex justify-start items-center gap-5">
                  <img src={friend.avatar} className="h-10 w-10" />
                  <p>{friend.fullName}</p>
                </div>
              ))
            }
          </div>
          <div className={`${user?.friendRequests.length?"":"hidden"} shadow-sm shadow-black dark:shadow-white mb-10`}>
            <p className="text-2xl mb-5">Requests</p>
            {
              requestDetails.map((user)=>(
                <div key={user._id} className="h-20 w-5/6 p-2 m-2 flex justify-start items-center gap-5">
                  <img src={user.avatar} className="h-10 w-10" />
                  <p>{user.fullName}</p>
                </div>
              ))
            }
          </div>
          <div className='shadow-sm shadow-black dark:shadow-white mt-10'>
            <p className="text-2xl mb-5">Explore</p>
            {
              allUsers.map((user)=>(
                <div key={user._id} className="h-20 w-5/6 p-2 m-2 flex justify-start items-center gap-5">
                  <img src={user.avatar} className="h-10 w-10" />
                  <p>{user.fullName}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
import { createSlice } from "@reduxjs/toolkit";

const initialState={
  allUsers:[],
  friends:[],
  friendRequests:[],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers:(state,action)=>{
      state.allUsers = action.payload;
    },
    setFriends:(state,action)=>{
      state.friends = action.payload;
    },
    setFriendRequests:(state,action)=>{
      state.friendRequests = action.payload;
    },
    addFriend:(state,action)=>{
      state.friends.push(action.payload);
    },
    removeFriend:(state,action)=>{
      const index = state.friends.indexOf(action.payload);
      if(index !== -1){
        state.friends.splice(index, 1);
      }
    },
    acceptFriendRequest:(state,action)=>{
      const index = state.friendRequests.indexOf(action.payload);
      if(index!== -1){
        state.friendRequests.splice(index, 1);
      }
    },
  }
}); 

export const { setAllUsers, setFriends, setFriendRequests, addFriend, removeFriend, acceptFriendRequest } = userSlice.actions;

export default userSlice.reducer;
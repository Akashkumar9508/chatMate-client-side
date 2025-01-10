import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import friendsService from "../services/friendService";

const initialState={
  allUsers:[],
  friends:[],
  unFriends:[],
  friendRequests:[],
  selectedUser:null, //curent chatting user
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  const response=await authService.getAllUsers();
  return response;
});

export const fetchFriends = createAsyncThunk("fetchFriends", async () => {
  const response=await friendsService.getFriendList();
  return response;
});

export const fetchFriendRequests = createAsyncThunk("fetchFriendRequests", async () => {
  const response=await friendsService.getFriendRequests();
  return response;
});

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
    setSelectedUser:(state,action)=>{
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    })
    .addCase(fetchFriends.fulfilled, (state, action) => {
      state.friends = action.payload;
      state.unFriends = state.allUsers.filter(user =>!state.friends.includes(user._id));
    })
    .addCase(fetchFriendRequests.fulfilled, (state, action) => {
      state.friendRequests = action.payload;
    });
  }
}); 

export const { setAllUsers, setFriends, setFriendRequests, addFriend, removeFriend, acceptFriendRequest, setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
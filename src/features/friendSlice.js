import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
  allFriends: [],
  allFriendRequests: [],
};

export const fetchFriendsData = createAsyncThunk(
  'friends/fetchFriendsData',
  async (friendIds) => {
    try {
      const friendDataPromises = friendIds.map((id) => authService.getUserById(id)); 
      const friends = await Promise.all(friendDataPromises);
      return friends;
    } catch (error) {
      console.error('Error fetching friends data:', error);
      throw error; 
    }
  }
);

export const fetchFriendsRequestData = createAsyncThunk('friends/fetchFriendsRequestData', async (friendRequestIds) => {
  try {
    const friendRequestDataPromises = friendRequestIds.map((id) => authService.getUserById(id));
    const friendRequests = await Promise.all(friendRequestDataPromises);
    return friendRequests;
  } catch (error) {
    console.error('Error fetching friend request data:', error);
    throw error;
  }
});

const friendSlice = createSlice({
  name: "friend",
  initialState,
  extraReducers:(builder)=>{
    builder
      .addCase(fetchFriendsData.fulfilled, (state, action) => {
        state.allFriends = action.payload;
      })
      .addCase(fetchFriendsData.rejected, (state, action) => {
        console.error('Error fetching friends data:', action.error);
      })
      .addCase(fetchFriendsRequestData.fulfilled, (state, action) => {
        state.allFriendRequests = action.payload;
      })
  },
});

export default friendSlice.reducer;

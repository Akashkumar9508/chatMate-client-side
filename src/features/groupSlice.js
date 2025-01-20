import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import groupsService from "../services/groupService";

const initialState = {
  allGroups: [],
  userGroups: [],
  groupCreatedByUser:[],
  selectedGroup: null,
};

export const fetchUserGroups =createAsyncThunk('userGroups',async ()=>{
  const response = await groupsService.getUserGroups();
  return response;
});


export const fetchAllGroups = createAsyncThunk('fetchAllGroups', async()=>{
  const response = await groupsService.getAllGroups();
  
  return response;
});

export const fetchGroupCreatedByUser = createAsyncThunk('fetchGroupCreatedByUser', async () => {
  const response = await groupsService.getGroupsCreatedByUser();
  return response;
});

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.allGroups.push(action.payload);
    },
    selectGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.allGroups = action.payload;
      })
     .addCase(fetchAllGroups.rejected, (state, action) => {
        console.error('Error fetching all groups:', action.error);
      })
     .addCase(fetchGroupCreatedByUser.fulfilled, (state, action) => {
        state.groupCreatedByUser = action.payload;
      })
     .addCase(fetchGroupCreatedByUser.rejected, (state, action) => {
        console.error('Error fetching groups created by user:', action.error);
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        state.userGroups = action.payload;
      })
  },
});

export const { addGroup, selectGroup } = groupSlice.actions;

export default groupSlice.reducer;
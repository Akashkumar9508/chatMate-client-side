import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authService from '../services/authService';

const initialState={
  status:false,
  userData:null,
}

export const fetchUser=createAsyncThunk("fetchUser",async()=>{
  const response=await authService.getCurrentUser();  
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchUser.fulfilled,(state,action)=>{
      state.status=true;
      state.userData=action.payload;
    });
    builder.addCase(fetchUser.rejected,(state)=>{
      state.status=false;
      state.userData=null;
    });
  }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authSlice.js'
import userReducer from '../features/userSlice.js'

const store =configureStore({
  reducer: {
    auth:authReducer,
    user: userReducer,
  },
});

export default store;
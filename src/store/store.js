import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authSlice.js'
import userReducer from '../features/userSlice.js'
import messageReducer from '../features/messageSlice.js'

const store =configureStore({
  reducer: {
    auth:authReducer,
    user: userReducer,
    message: messageReducer,
  },
});

export default store;
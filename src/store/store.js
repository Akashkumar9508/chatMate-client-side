import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/authSlice.js'
import themeReducer from '../features/themeSlice.js'
import userReducer from '../features/userSlice.js'

const store =configureStore({
  reducer: {
    auth:authReducer,
    theme:themeReducer,
    user: userReducer,
  },
});

export default store;
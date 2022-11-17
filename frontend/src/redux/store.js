import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.js'
import { postReducer } from './slices/posts'

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer
  }
})

export default store

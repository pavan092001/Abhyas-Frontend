import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import questionSlice from '../slices/questionSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    questions:questionSlice,
},
})
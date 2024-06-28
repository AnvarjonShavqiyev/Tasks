import { configureStore } from '@reduxjs/toolkit'
import UsersSlice from '../features/UsersSlice'
import AuthSlice from '../features/AuthSlice'

export const store = configureStore({
  reducer: {
    users: UsersSlice,
    auth: AuthSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
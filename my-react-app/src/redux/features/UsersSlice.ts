import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'

export interface CounterState {
  users: User[]
}

const initialState: CounterState = {
  users: []
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},

})

export const { } = counterSlice.actions

export default counterSlice.reducer
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { AxiosResponse } from 'axios';
import instance from '../../service/api/axios';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem('users') ?? '[]')
};

interface UpdateUserPayload {
  id: string;
  newData: Partial<User>;
}

interface DeleteUserPayload {
  id: string;  
}

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'user/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response: AxiosResponse<User[]> = await instance.get("/users");
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return thunkAPI.rejectWithValue('Failed to fetch users');
    }
  }
);

export const updateUser = createAsyncThunk<User, UpdateUserPayload, { rejectValue: string }>(
  'user/updateUser',
  async ({ id, newData }, thunkAPI) => {
    try {
      const response: AxiosResponse<User> = await instance.put(`/users/${id}`, newData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      return thunkAPI.rejectWithValue('Failed to update user');
    }
  }
);

export const deleteUser = createAsyncThunk<User, DeleteUserPayload, { rejectValue: string }>(
  'user/deleteUser',
  async ({ id }, thunkAPI) => {
    try {
      const response: AxiosResponse<User> = await instance.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      return thunkAPI.rejectWithValue('Failed to delete user');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      localStorage.setItem('users', JSON.stringify(action.payload));
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    });
    builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.users = state.users.filter(user => user.id != action.payload.id);
      console.log(action.payload.id)
      localStorage.setItem('users', JSON.stringify(state.users));
    });
  },
});

export default userSlice.reducer;

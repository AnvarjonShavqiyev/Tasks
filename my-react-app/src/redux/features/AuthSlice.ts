import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { AxiosResponse } from 'axios';
import instance from '../../service/api/axios';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") ?? 'null') || null,
};

export const createUser = createAsyncThunk<User, { newUser: any }, { rejectValue: string }>(
  'auth/createUser',
  async ({ newUser }, thunkAPI) => {
    try {
      const response: AxiosResponse<User> = await instance.post("/users", newUser);
      return response.data;
    } catch (error: any) {
      console.log('Error creating user:', error);
      return thunkAPI.rejectWithValue('Failed to create user');
    }
});

export const signInUser = createAsyncThunk<User, { email: any }, { rejectValue: string }>(
  'auth/signInUser',
  async ({ email }, thunkAPI) => {
    try {
      const response: AxiosResponse<User> = await instance.get(`/users/getByEmail/${email}`);
      return response.data;
    } catch (error: any) {
      console.log('Error signing in user:', error);
      return thunkAPI.rejectWithValue('Failed to sign in user');
    }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state: UserState) => {
      state.user = null;
      localStorage.removeItem("user");
      window.location.href = `${window.location.origin}/`;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
      if (action.payload.id) {
        window.location.href = `${window.location.origin}/signIn`;
      }
    });
    builder.addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
      if (action.payload.id) {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        window.location.href = `${window.location.origin}/`;
      }
    });
  },
});

export const { logOut } = authSlice.actions; 

export default authSlice.reducer;

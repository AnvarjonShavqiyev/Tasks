import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginResponse, User } from '../../types';
import { AxiosResponse } from 'axios';
import instance from '@service/api/axios';

export interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') ?? 'null') || null,
  token: localStorage.getItem('token') || null,
};


interface newUser {
  email: string;
  name: string;
  password: string;
}

export const createUser = createAsyncThunk<
  User,
  { newUser: newUser },
  { rejectValue: string }
>('auth/createUser', async ({ newUser }, thunkAPI) => {
  try {
    const response: AxiosResponse<User> = await instance.post(
      '/auth/signup',
      newUser
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to create user');
  }
});

export const signUpUser = createAsyncThunk<
  loginResponse,
  { email: string; password: string },
  { rejectValue: string }
>('auth/signUp', async ({ email, password }, thunkAPI) => {
  try {
    const response: AxiosResponse<loginResponse> = await instance.post(
      `/auth/login`,
      { email, password }
    );
    return response.data;
  } catch (error) {
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
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = `${window.location.origin}/`;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        if (action.payload.id) {
          window.location.href = `${window.location.origin}/signIn`;
        }
      }
    );
    builder.addCase(
      signUpUser.fulfilled,
      (state, action: PayloadAction<loginResponse>) => {
        if (action.payload) {
          state.user = action.payload.thisUser;
          localStorage.setItem('user', JSON.stringify(action.payload.thisUser));
          localStorage.setItem('token', action.payload.access_token);
          window.location.href = `${window.location.origin}/`;
        }
      }
    );
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;

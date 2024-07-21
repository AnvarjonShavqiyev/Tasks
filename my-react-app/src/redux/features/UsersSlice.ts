import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ChangeUserPhotoPayload,
  ChangeUserPhotoResponse,
  FetchUsersParams,
  SearchUserPayload,
  UpdateUserPayload,
  User,
  UserActivity,
  UserPayload,
  Users,
  UserState,
} from '../../types';
import { AxiosResponse } from 'axios';
import instance from '@service/api/axios';

const initialState: UserState = {
  users: JSON.parse(localStorage.getItem('users') ?? '[]'),
  thisUser: JSON.parse(localStorage.getItem('thisUser') ?? 'null'),
  loading: false,
  userActivities: JSON.parse(localStorage.getItem('activity') ?? '[]'),
  paginatedUsers: JSON.parse(localStorage.getItem('paginatedUsers') ?? 'null'),
};

export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('user/getAllUsers', async (_, thunkAPI) => {
  try {
    const response: AxiosResponse<User[]> = await instance.get('/users');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch users');
  }
});

export const updateUser = createAsyncThunk<
  User,
  UpdateUserPayload,
  { rejectValue: string }
>('user/updateUser', async ({ id, newData }, thunkAPI) => {
  try {
    const response: AxiosResponse<User> = await instance.put(
      `/users/${id}`,
      newData
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to update user');
  }
});

export const deleteUser = createAsyncThunk<
  User,
  UserPayload,
  { rejectValue: string }
>('user/deleteUser', async ({ id }, thunkAPI) => {
  try {
    const response: AxiosResponse<User> = await instance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    return thunkAPI.rejectWithValue('Failed to delete user');
  }
});

export const searchUser = createAsyncThunk<
  User[],
  SearchUserPayload,
  { rejectValue: string }
>('user/searchUser', async ({ search }, thunkAPI) => {
  try {
    const response: AxiosResponse<User[]> = await instance.get(
      `/users/search?q=${search}`
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch users');
  }
});

export const getById = createAsyncThunk<
  User,
  UserPayload,
  { rejectValue: string }
>('user/getById', async ({ id }, thunkAPI) => {
  try {
    const response: AxiosResponse<User> = await instance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to get user');
  }
});

export const getUserActivity = createAsyncThunk<
  UserActivity[],
  UserPayload,
  { rejectValue: string }
>('user/getUserActivity', async ({ id }, thunkAPI) => {
  try {
    const response: AxiosResponse<UserActivity[]> = await instance.get(
      `/activity-log/${id}`
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to get user');
  }
});

export const updateUserPhoto = createAsyncThunk<
  ChangeUserPhotoResponse,
  ChangeUserPhotoPayload,
  { rejectValue: string }
>('user/updateUserPhoto', async ({ id, file }, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    const response: AxiosResponse<ChangeUserPhotoResponse> =
      await instance.post(`/users/${id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to update user');
  }
});

export const getLimitedUsers = createAsyncThunk<
  Users,
  FetchUsersParams,
  { rejectValue: string }
>('user/getLimitedUsers', async ({ page, limit }, thunkAPI) => {
  try {
    const response: AxiosResponse<Users> = await instance.get(
      `/users?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch users');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        localStorage.setItem('users', JSON.stringify(action.payload));
        state.loading = false;
      }
    );
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
          localStorage.setItem('users', JSON.stringify(state.users));
        }
        state.loading = false;
      }
    );
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.users = state.users.filter(
          (user) => user.id != action.payload.id
        );
        localStorage.setItem('users', JSON.stringify(state.users));
        state.loading = false;
      }
    );
    builder.addCase(
      searchUser.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        localStorage.setItem('users', JSON.stringify(action.payload));
        state.loading = false;
      }
    );
    builder.addCase(getById.fulfilled, (state, action: PayloadAction<User>) => {
      state.thisUser = action.payload;
      localStorage.setItem('thisUser', JSON.stringify(action.payload));
      state.loading = false;
    });
    builder.addCase(updateUserPhoto.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUserPhoto.fulfilled,
      (state, action: PayloadAction<ChangeUserPhotoResponse>) => {
        state.thisUser = action.payload.thisUser;
        localStorage.setItem(
          'thisUser',
          JSON.stringify(action.payload.thisUser)
        );
        state.loading = false;
      }
    );
    builder.addCase(
      getUserActivity.fulfilled,
      (state, action: PayloadAction<UserActivity[]>) => {
        state.userActivities = action.payload;
        localStorage.setItem('activity', JSON.stringify(action.payload));
        state.loading = false;
      }
    );
    builder.addCase(
      getLimitedUsers.fulfilled,
      (state, action: PayloadAction<Users>) => {
        state.paginatedUsers = action.payload;
        localStorage.setItem('paginatedUsers', JSON.stringify(action.payload));
        state.loading = false;
      }
    );
  },
});

export default userSlice.reducer;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  role: string;
}

export interface loginResponse {
  thisUser: User;
  access_token: string;
}

export interface UpdateUserPayload {
  id: string;
  newData: Partial<User>;
}

export interface UserPayload {
  id: string | undefined;
}

export interface SearchUserPayload {
  search: string;
}

export interface ChangeUserPhotoPayload {
  id: number;
  file: File;
}

export interface ChangeUserPhotoResponse {
  thisUser: User;
}

export interface UserActivity {
  id: number;
  activityType: string;
  description: string;
  time: string;
  user: User;
}

export interface Users {
  users: User[];
  total: number;
  pageCount: number;
}

export interface FetchUsersParams {
  page: number;
  limit: number;
}

export interface UserState {
  users: User[];
  thisUser: User | null;
  loading: boolean;
  userActivities: UserActivity[];
  paginatedUsers: Users | null;
}

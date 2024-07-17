export interface User {
    id: string;
    name: string,
    email: string,
    password: string,
    imageUrl: string,
    role: string
}

export interface loginResponse {
    thisUser: User,
    access_token: string
}

export interface UpdateUserPayload {
    id: string;
    newData: Partial<User>;
}
  
export interface UserPayload {
    id: any;  
}

export interface SearchUserPayload {
    search: string
}

export interface ChangeUserPhotoPayload {
    id: any,
    file: any
}
export interface ChangeUserPhotoResponse {
    thisUser:User
}


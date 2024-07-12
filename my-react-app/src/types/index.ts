export interface User {
    id: any;
    name: string,
    email: string,
    password: string
}
export interface loginResponse {
    thisUser: User,
    access_token: string
}
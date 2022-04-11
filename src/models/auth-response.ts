import { TUser } from './user';
export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: TUser
}
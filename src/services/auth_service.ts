import { AuthResponse } from './../models/auth-response';
import { AxiosResponse } from 'axios';
import $api from '../http';

export default class AuthService {
    static async login(email: any, password: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password })
    }
    static async registration(email: any, password: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { email, password })
    }
    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
}

import { AuthResponse } from './../models/auth-response';
import { AxiosResponse } from 'axios';
import $api from '../http';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', { email, password })
    };
    static async registration(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', { name, email, password })
    };
    static async registrationAdmin(name: string, email: string, password: string, secret: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration/admin', { name, email, password, secret })
    };
    static async logout(): Promise<void> {
        return $api.get('/auth/logout')
    };
    static async checkAuth(): Promise<void> {
        return $api.get('/auth/refresh')
    };
}

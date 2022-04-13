import { AuthResponse } from './../models/auth-response';
import { AxiosResponse } from 'axios';
import $api from '../http';

export default class AuthService {
    static async login(email: any, password: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', { email, password })
    }
    static async registration(name: any, email: any, password: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', { name, email, password })
    }
    static async registrationAdmin(name: any, email: any, password: any, secret: any): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration/admin', { name, email, password, secret })
    }
    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }
    static async checkAuth(): Promise<void> {
        return $api.get('/auth/refresh')
    }
}

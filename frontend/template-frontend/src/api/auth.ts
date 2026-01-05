import type { User } from '@/types/auth';
import api from './axios';

export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const authService = {
    async register(data: RegisterDto): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    async login(data: LoginDto): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    async getProfile(): Promise<User> {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

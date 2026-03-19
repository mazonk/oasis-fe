import api from '../api';
import type { User } from '../types';

export interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: any): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
  async register(data: any): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register', data);
    return response.data;
  },
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

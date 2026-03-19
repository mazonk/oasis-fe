import api from '../api';
import type { User } from '../types';

export interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('Auth/login', {email, password });
      return response.data;
    } catch (error: any) {
      console.log('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  async register(fname: string, lname: string, email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('Auth/register', { fname, lname, email, password });
      return response.data;
    } catch (error: any) {
      console.log('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  async logout(): Promise<void> {
    await api.post('Auth/logout');
  },
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('Auth/me');
    return response.data;
  },
};

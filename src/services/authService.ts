import type { User } from '../interfaces/User';
import instance from '../services/httpClient';
import { mapToUser} from '../utils/mapper';
import type { IAuthResponse } from '../interfaces/IAuthResponse';

export const AuthService = {
  async login(email: String, password: String) {
    try {
      const response = await instance.post('Auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

   async register(fname: string, lname: string, email: string, password: string): Promise<IAuthResponse> {
    try {
      const response = await instance.post('Auth/register', { fname, lname, email, password });
      return response.data;
    } catch (error) {
      console.error('Error during register:', error);
      throw error;
    }
  },

  async getMemberById(userId: string) {
    try {
      const response = await instance.get(`user/${userId}`);
      return mapToUser(response.data);
    } catch (error) {
      console.error('Error fetching user by id:', error);
      throw error;
    }
  }
}
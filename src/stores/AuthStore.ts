import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';
import { authService } from '../services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));
  const isAuthenticated = computed(() => !!user.value);

  async function login(credentials: any) {
    const response = await authService.login(credentials);
    user.value = response.user;
    token.value = response.token;
    localStorage.setItem('token', response.token);
  }

  async function register(data: any) {
    const response = await authService.register(data);
    user.value = response.user;
    token.value = response.token;
    localStorage.setItem('token', response.token);
  }

  async function logout() {
    await authService.logout();
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  }

  async function fetchCurrentUser() {
    if (token.value) {
      try {
        user.value = await authService.getCurrentUser();
      } catch (error) {
        logout();
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    fetchCurrentUser,
  };
});

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types";
import { authService } from "../services/authService";
import type { IJwtPayload } from "../interfaces/IJwtPayload";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token: string): boolean {
   try {
      const decoded = jwtDecode<IJwtPayload>(token);
      if (!decoded.exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
   } catch (err) {
      return true;
   }
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const isAuthenticated = computed(() => !!user.value);

  async function login(email: string, password: string): Promise<void> {
    const response = await authService.login({ username, password });
    try {
      const token = await this.service.login(username, password);

      if (isTokenExpired(token)) {
        throw new Error("Token is expired");
      }

      this.token = token;
      sessionStorage.setItem("jwtToken", token);

      this.account = jwtDecode<IJwtPayload>(token);

      this.showVolunteerModal = true;
    } catch (error: any) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  async function register(data: any) {
    const response = await authService.register(data);
    user.value = response.user;
    token.value = response.token;
    localStorage.setItem("token", response.token);
  }

  async function logout() {
    await authService.logout();
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
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

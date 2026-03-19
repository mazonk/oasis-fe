import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types";
import { authService } from "../services/authService";
import type { IJwtPayload } from "../interfaces/IJwtPayload";
import { jwtDecode } from "jwt-decode";

// function isTokenExpired(token: string): boolean {
//    try {
//       const decoded = jwtDecode<IJwtPayload>(token);
//       if (!decoded.) return true;

//       const now = Math.floor(Date.now() / 1000);
//       return decoded.exp < now;
//    } catch (err) {
//       return true;
//    }
// }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem("jwtToken") || (null as string | null),
    user: null as User | null,
    isAuthenticated: !!sessionStorage.getItem("jwtToken"),
  }),
  actions: {

  async login(email: string, password: string): Promise<void> {
    const response = await authService.login({ email, password });
    try {
      const token = await this.service.login(email, password);

      // if (isTokenExpired(token)) {
      //   throw new Error("Token is expired");
      // }

      this.token = token;
      sessionStorage.setItem("jwtToken", token);

      this.account = jwtDecode<IJwtPayload>(token);

      this.showVolunteerModal = true;
    } catch (error: any) {
      throw error;
    } finally {
      this.loading = false;
    }
  },

  async register( fname: string, lname: string, email: string, password: string): Promise<void> {
    const response = await authService.register(fname, lname, email, password);
    this.user = response.user;
    this.token = response.token;
    localStorage.setItem("token", response.token);
  },

  async logout() {
    await authService.logout();
    this.user = null;
    this.token = null;
    localStorage.removeItem("token");
  },

  async fetchCurrentUser() {
    if (this.token) {
      try {
        this.user = await authService.getCurrentUser();
      } catch (error) {
        this.logout();
      }
    }
  }
  }
});

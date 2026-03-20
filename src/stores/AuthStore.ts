import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types";
import router from '../router';
import type { IAuthResponse } from "../interfaces/IAuthResponse";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "../services/authService.ts"

// function isTokenExpired(token: string): boolean {
//    try {
//       const decoded = jwtDecode<IAuthResponse>(this.token);
//       if (!decoded.) return true;

//       const now = Math.floor(Date.now() / 1000);
//       return decoded.exp < now;
//    } catch (err) {
//       return true;
//    }
// }

export const useAuthStore = defineStore('AuthStore', {
  state: () => ({
    token: sessionStorage.getItem("jwtToken") || (null as string | null),
    memberId: sessionStorage.getItem("memberId") || (null as string | null),
    isAuthenticated: false,
    service: AuthService as AuthService
  }),
  actions: {
    async initAuth() {
      if (!this.token) return;

      try {
        const decoded = jwtDecode<IAuthResponse>(this.token);
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to restore session:', error);
        this.clearAuthData();
      }
    },

  async login(email: string, password: string): Promise<void> {
    console.log("Login attempt started");
    try { 
      const response = await this.service.login(email, password);
      console.log(response)
      this.token = response.token;
      sessionStorage.setItem("jwtToken", response.token);
      console.log(email, password)

      router.push('/');
      this.justLoggedIn = true;

      await this.fetchCurrentUser();

      // if (isTokenExpired(token)) {
      //   throw new Error("Token is expired");
      // }

      this.account = jwtDecode<IAuthResponse>(response.token);

    } catch (error: any) {
      throw error;
    } finally {
      this.loading = false;
    }
  },

  async register( fname: string, lname: string, email: string, password: string): Promise<void> {
    try {
      const response = await this.service.register(fname, lname, email, password);
      this.memberId = response.memberId;
      this.token = response.token;
      sessionStorage.setItem("jwtToken", response.token);
    } catch (e) {
      console.log(e)
      throw e;
    }
  },

  async logout() {
    try {
      this.user = null;
      this.token = null;
    } catch (e) {
      throw e;
    } finally {
        router.push('/auth');
    }
  },

  async fetchCurrentUser() {
    if (this.token) {
      try {
        this.user = await this.service.getCurrentUser();
      } catch (error) {
        this.logout();
      }
    }
  }
  }
});

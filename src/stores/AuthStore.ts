import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types";
import router from '../router';
import type { IAuthResponse } from "../interfaces/IAuthResponse";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "../services/authService.ts"
import { memberService } from "../services/memberService.ts";
import { Member } from "../interfaces/Member.ts";

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
    loggedInMember: null as Member | null,
    isAuthenticated: sessionStorage.getItem("jwtToken") ? true : false,
    service: AuthService as typeof AuthService
  }),
  actions: {
    async initAuth() {
      if (!this.token) return;

      try {
        const decoded = jwtDecode<IAuthResponse>(this.token);
        this.loggedInMember = await memberService.getById(this.memberId);
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
        this.token = response.token;
        this.memberId = response.memberId;
        this.loggedInMember = await memberService.getById(this.memberId);
        sessionStorage.setItem("memberId", response.memberId);
        sessionStorage.setItem("jwtToken", response.token);

        router.push('/');
        this.justLoggedIn = true;

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

    async register(fname: string, lname: string, email: string, password: string): Promise<void> {
      try {
        const response = await this.service.register(fname, lname, email, password);
        this.memberId = response.memberId;
        this.token = response.token;
        this.loggedInMember = await memberService.getById(this.memberId);
        sessionStorage.setItem("memberId", response.memberId);
        sessionStorage.setItem("jwtToken", response.token);

        router.push('/');
      } catch (e) {
        console.log(e)
        throw e;
      }
    },

    async logout() {
      try {
        console.log("Logout attempt started");

        this.user = null;
        this.token = null;
        sessionStorage.removeItem("jwtToken");
        localStorage.setItem('activeTab', 'home');
      } catch (e) {
        throw e;
      } finally {
        window.location.reload();
      }
    },

    clearAuthData() {
      this.token = null;
      this.memberId = null;
      this.isAuthenticated = false;
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("memberId");
    }
  }
});

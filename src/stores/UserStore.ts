import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { User } from "../interfaces/User";

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!currentUser.value);
  const userRole = computed(() => currentUser.value?.role || 'guest');
  const memberProfile = computed(() => currentUser.value?.member || null);

  function setUser(user: User | null) {
    currentUser.value = user;
  }

  function clearUser() {
    currentUser.value = null;
    error.value = null;
  }

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated,
    userRole,
    setUser,
    clearUser
  };
});

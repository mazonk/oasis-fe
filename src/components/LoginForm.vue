<script setup lang="ts">
import { ref } from 'vue';
import { Mail, Lock, LogIn, Github } from 'lucide-vue-next';
import { useAuthStore } from '../stores/authStore';

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'success'): void;
}>();

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref<string | null>(null);

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await authStore.login(email.value, password.value );
    emit('success');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to sign in. Please check your credentials.';
  } finally {
    isLoading.value = false;
  }
};

const handleGithubLogin = () => {
  // In a real app, this would redirect to OAuth
  console.log('Github login initiated');
};
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
      <p class="text-gray-500">Enter your details to access your dashboard.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
        {{ error }}
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-700 ml-1">Email Address</label>
        <div class="relative">
          <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            v-model="email"
            type="email" 
            placeholder="name@company.com"
            class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-oasis-lime transition-all font-medium"
            required
            :disabled="isLoading"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-700 ml-1">Password</label>
        <div class="relative">
          <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            v-model="password"
            type="password" 
            placeholder="••••••••"
            class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-oasis-lime transition-all font-medium"
            required
            :disabled="isLoading"
          />
        </div>
      </div>

      <button 
        type="submit"
        class="w-full bg-oasis-moss text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-oasis-lime transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isLoading"
      >
        <LogIn v-if="!isLoading" class="w-5 h-5" />
        <span v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>

    <div class="relative py-4">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-100"></div>
      </div>
      <div class="relative flex justify-center text-xs uppercase tracking-widest font-bold text-gray-400">
        <span class="bg-white px-4">Or continue with</span>
      </div>
    </div>

    <button 
      @click="handleGithubLogin"
      class="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98]"
      :disabled="isLoading"
    >
      <Github class="w-5 h-5" />
      Github
    </button>

    <p class="text-center text-gray-500 font-medium">
      Don't have an account? 
      <button @click="emit('toggle')" class="text-oasis-lime font-bold hover:underline ml-1">Create one</button>
    </p>
  </div>
</template>

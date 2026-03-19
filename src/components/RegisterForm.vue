<script setup lang="ts">
import { ref } from 'vue';
import { Mail, Lock, UserPlus, Github, ArrowRight } from 'lucide-vue-next';
import { useAuthStore } from '../stores/authStore';

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'success'): void;
}>();

const authStore = useAuthStore();
const fname = ref('');
const lname = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref<string | null>(null);

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    await authStore.register( 
      fname.value, 
      lname.value,
      email.value, 
      password.value 
    );
    emit('success');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to create account. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const handleGithubLogin = () => {
  console.log('Github registration initiated');
};
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h2 class="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
      <p class="text-gray-500">Join our community and start your journey.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div v-if="error" class="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
        {{ error }}
      </div>
<div class ="space-y-2 grid grid-cols-2">
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-700 ml-1">First name</label>
        <div class="relative group">
          <UserPlus class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-oasis-lime" />
          <input 
            v-model="fname"
            type="text" 
            placeholder="John Doe"
            class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-oasis-lime transition-all font-medium"
            required
            :disabled="isLoading"
          />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-700 ml-1">Last Name</label>
        <div class="relative group">
          <UserPlus class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-oasis-lime" />
          <input 
            v-model="lname"
            type="text" 
            placeholder="John Doe"
            class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-oasis-lime transition-all font-medium"
            required
            :disabled="isLoading"
          />
        </div>
      </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-bold text-gray-700 ml-1">Email Address</label>
        <div class="relative group">
          <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-oasis-lime" />
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
        <div class="relative group">
          <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-oasis-lime" />
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
        class="w-full bg-oasis-moss text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-oasis-lime transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-oasis-sky/20 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isLoading"
      >
        <ArrowRight v-if="!isLoading" class="w-5 h-5" />
        <span v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        {{ isLoading ? 'Creating account...' : 'Get Started' }}
      </button>
    </form>

    <div class="relative py-4">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-100"></div>
      </div>
      <div class="relative flex justify-center text-xs uppercase tracking-widest font-bold text-gray-400">
        <span class="bg-white px-4">Or sign up with</span>
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
      Already have an account? 
      <button @click="emit('toggle')" class="text-oasis-lime font-bold hover:underline ml-1">Sign in</button>
    </p>
  </div>
</template>

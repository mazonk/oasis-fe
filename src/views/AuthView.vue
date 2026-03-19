<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { 
  Mail, 
  Lock, 
  Github, 
  ArrowRight, 
  UserPlus, 
  LogIn,
  CheckCircle2
} from 'lucide-vue-next';
import Mascot from '../components/Mascot.vue';

const emit = defineEmits<{
  (e: 'login'): void;
}>();

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const name = ref('');

const toggleAuth = () => {
  gsap.to('.auth-card', {
    rotateY: isLogin.value ? 180 : 0,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      isLogin.value = !isLogin.value;
    }
  });
};

onMounted(() => {
  gsap.from('.auth-container', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.auth-illustration', {
    opacity: 0,
    x: -50,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.2
  });
});

const handleSubmit = () => {
  // Simulate auth
  gsap.to('.auth-container', {
    scale: 0.95,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      emit('login');
    }
  });
};

const handleGithubLogin = () => {
  // Simulate Github OAuth
  console.log('Github login initiated');
  handleSubmit();
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-[#FAFAFA]">
    <div class="auth-container max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      <!-- Illustration Side -->
      <div class="auth-illustration hidden lg:block space-y-8 relative">
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 animate-pulse" style="animation-delay: 1s" />
        
        <div class="space-y-4 relative z-10">
          <div class="flex items-center gap-6 mb-8">
            <Mascot size="100px" color="#4F46E5" />
          </div>
          <h1 class="text-5xl font-black text-gray-900 leading-tight">
            Your mental <br/>
            <span class="text-indigo-600">well-being</span> <br/>
            starts here.
          </h1>
          <p class="text-xl text-gray-500 max-w-md leading-relaxed">
            Join thousands of teams using Blobs to stay connected, mindful, and productive.
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="(feature, i) in ['Daily mood check-ins', 'Team activities & XP', 'Personal growth roadmap']" 
               :key="i"
               class="flex items-center gap-4 text-gray-700 font-medium"
          >
            <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 class="w-4 h-4" />
            </div>
            {{ feature }}
          </div>
        </div>
      </div>

      <!-- Form Side -->
      <div class="relative perspective-1000">
        <div class="auth-card bg-white rounded-[40px] p-10 shadow-2xl shadow-indigo-100/50 border border-gray-50 relative">
          
          <div v-if="isLogin" class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
              <p class="text-gray-500">Enter your details to access your dashboard.</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div class="relative">
                  <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    v-model="email"
                    type="email" 
                    placeholder="name@company.com"
                    class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    required
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
                    class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-100"
              >
                <LogIn class="w-5 h-5" />
                Sign In
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
            >
              <Github class="w-5 h-5" />
              Github
            </button>

            <p class="text-center text-gray-500 font-medium">
              Don't have an account? 
              <button @click="toggleAuth" class="text-indigo-600 font-bold hover:underline ml-1">Create one</button>
            </p>
          </div>

          <div v-else class="space-y-8">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold text-gray-900">Create account</h2>
              <p class="text-gray-500">Start your journey to better mental health.</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <div class="relative">
                  <UserPlus class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    v-model="name"
                    type="text" 
                    placeholder="John Doe"
                    class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <div class="relative">
                  <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    v-model="email"
                    type="email" 
                    placeholder="name@company.com"
                    class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    required
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
                    class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-100"
              >
                <ArrowRight class="w-5 h-5" />
                Get Started
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
            >
              <Github class="w-5 h-5" />
              Github
            </button>

            <p class="text-center text-gray-500 font-medium">
              Already have an account? 
              <button @click="toggleAuth" class="text-indigo-600 font-bold hover:underline ml-1">Sign in</button>
            </p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>

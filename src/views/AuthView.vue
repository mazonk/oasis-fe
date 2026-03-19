<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { CheckCircle2 } from 'lucide-vue-next';
import Mascot from '../components/Mascot.vue';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';

const emit = defineEmits<{
  (e: 'login'): void;
}>();

const isLogin = ref(true);

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

const handleSuccess = () => {
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
            <div class="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100">
              <div class="w-8 h-8 bg-white rounded-full animate-pulse" />
            </div>
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
        <div class="auth-card bg-white rounded-[40px] p-10 shadow-2xl shadow-indigo-100/50 border border-gray-50 relative preserve-3d transition-transform duration-500">
          
          <!-- Login Form -->
          <div class="backface-hidden" :class="{ 'pointer-events-none opacity-0': !isLogin }">
            <LoginForm 
              v-if="isLogin"
              @toggle="toggleAuth"
              @success="handleSuccess"
            />
          </div>

          <!-- Register Form -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 p-10" :class="{ 'pointer-events-none opacity-0': isLogin }">
            <RegisterForm 
              v-if="!isLogin"
              @toggle="toggleAuth"
              @success="handleSuccess"
            />
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

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
